// pages/myDrippingWater/myPublication/myPublication.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["客服问答", "感谢信"],   //tab菜单列
    activeIndex: 0,         //tab切换下标
    sliderOffset: 0,        //坐标x
    sliderLeft: 0,          //坐标y

    list: [],               //文章数据
    imgPath: app.config.domain,//图片路径,本地
    type:1,//默认获取客服问答文章

    //分页参数
    pageSize: 10,
    pageIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //判断type是否为空
    if(!app.checkInput(options.type)){
      that.data.type=options.type;
    }

    //获取用户文章
    that.getUserPost(that);

    //设置tab
    var sliderWidth = 50;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          id: options.user_id,
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  //跳转到详情
  bindtap_Info:function(e){
    if(this.data.type == 1){
      //客服问答详情
      wx.navigateTo({
        url: '/pages/dripWaterRescue/customerService/customerServiceDetails/customerServiceDetails?id=' + e.currentTarget.id,
      })
    }else{
      //感谢信详情
      wx.navigateTo({
        url: '/pages/dripLove/thankGuys/thankGuysIn/thankGuyslnDetails/thankGuyslnDetails?id=' + e.currentTarget.id,
      })
    }
  },
 
  //获取用户文章
  getUserPost:function(that){
    wx.request({
      url: app.config.dszjPath_web+'api/UserPost/paging',
      method:"GET",
      header:{
        Token:wx.getStorageSync('token')
      },
      data:{
        type:that.data.type,
        pageSize: that.data.pageSize,
        pageIndex: that.data.pageIndex
      },
      success:function(res){
        var pageList = that.data.list;
        //得到数据
        var list = res.data.data.Records;
        if (list == null || list.length == 0) {
          //提示
          wx.showToast({
            title: '没有更多了!',
            icon: 'loading',
            duration: 1000,
          });
          return;
        }

        //循环遍历操作
        for (var i = 0, lenI = list.length; i < lenI; ++i) {
          //添加到当前数组
          pageList.push(list[i]);
        }

        //保存
        that.setData({
          list: pageList,
        });
      }
    })
  },

  //tab点击切换
  tabClick: function (e) {
    //当前
    var that = this;
    that.data.pageSize = 10;
    that.data.pageIndex = 1;
    var name = e.currentTarget.dataset.name;

    //判断tab
    if (name == "客服问答") {
      that.data.type=1;
    } else if (name == "感谢信") {
      that.data.type = 2;
    }

    //获取用户文章
    that.getUserPost(that);

    //设置
    that.setData({
      list: [],               //文章数据
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    });
  },

  //用户下拉动作
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      pageIndex: 1,         //所在页页码，从1开始
      list: [],
    });
    //获取用户文章
    that.getUserPost(that);
    //下拉完成后执行回退
    wx.stopPullDownRefresh();
  },

  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    var that = this;
    var num = that.data.pageIndex;
    num++;
    that.setData({
      pageIndex: num,
    });

    //获取用户文章
    that.getUserPost(that);
    //提示
    wx.showToast({
      title: '正在加载..',
      icon: 'loading',
      duration: 2000,
    });
  },

})