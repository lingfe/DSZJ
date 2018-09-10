
/**
 * 客服服务
 */
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,//1(客服问答), 2(感谢信)
    list:[],//数据
    top_list:[],//置顶数据

    domain: app.config.domain,

    //分页参数
    pageSize: 10,
    pageIndex: 1
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var that=this;

    //获取文章分页列表
    that.getPaging(that);
  },

  //获取文章分页列表
  getPaging:function(that){
    wx.request({
      url: app.config.dszjPath_web +'api/Post/paging',
      method:"GET",
      header:{
        Token:wx.getStorageSync("token")
      },
      data:{
        type:that.data.type,
        pageSize: that.data.pageSize,
        pageIndex: that.data.pageIndex
      },
      success:function(res){
        console.log(res);
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

  //用户下拉动作
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      pageIndex: 1,         //所在页页码，从1开始
      list:[],   
    });
    //获取文章分页列表
    that.getPaging(that);

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

    //获取文章分页列表
    that.getPaging(that);
    //提示
    wx.showToast({
      title: '正在加载..',
      icon: 'loading',
      duration: 2000,
    });
  },

  //跳转到发布问题页面
  bindtab_releaseProblem:function(){
    wx.navigateTo({
      url: '/pages/dripWaterRescue/customerService/releaseProblem/releaseProblem',
    })
  },

  //跳转到感谢亲们页面
  bindtab_gxqm: function () {
    wx.navigateTo({
      url: '/pages/dripLove/thankGuys/thankGuys',
    })
  },

  //跳转到详情
  bindtap_Info:function(e){
    wx.navigateTo({
      url: '/pages/dripWaterRescue/customerService/customerServiceDetails/customerServiceDetails?id=' + e.currentTarget.id,
    })
  },

})