// pages/dripLove/dripLove.js
/**
 * 滴水爱心
 */
var app= getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["滴水救助", "滴水祈福", "滴水互助","+发起"],   //tab菜单列
    activeIndex: 0,         //tab切换下标
    sliderOffset: 0,        //坐标x
    sliderLeft: 0,          //坐标y

    pageSize: 10,            //每页显示的记录数量。
    pageIndex:1,              //所在页页码，从1开始。
    dsqz_list:[],               //滴水求助数据    
  },

  //跳转到救助详情页面
  bindtap_rescueDetails:function(e){
    wx.navigateTo({
      url: '/pages/dripLove/rescueDetails/rescueDetails?id=' + e.currentTarget.id,
    })
  },

  //申请志愿者
  applicationVolunteer: function (e) {
    wx.navigateTo({
      url: '/pages/dripWaterRescue/applicationVolunteer/applicationVolunteer',
    });
  },

  //推荐说明
  tuijingshouming: function (e) {
    wx.navigateTo({
      url: '/pages/dripWaterRescue/recommendation/recommendation',
    });
  },

  //跳转到客服服务页面
  bindTab_Service: function () {
    wx.navigateTo({
      url: '/pages/dripWaterRescue/customerService/customerService',
    })
  },

  //跳转到感谢亲们页面
  bindtab_gxqm:function(){
    wx.navigateTo({
      url: '/pages/dripLove/thankGuys/thankGuys',
    })
  },

  /**
   * 请求获取滴水求助数据，
   * 
   * that: 当前page
   */
  getQiuzhuInfo:function(that){
    //url
    var url = app.config.dszjPath_web + "api/SeriousIllness/Paging";
    //参数
    var data={
      "pageSize": that.data.pageSize,
      "pageIndex": that.data.pageIndex
    }
    //发送请求
    app.request.reqGet(url,data,function(res){
      console.log(res);
      var pageList = that.data.dsqz_list;
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
        if (!app.checkInput(list[i].cover)) 
          list[i].cover = app.config.domain + list[i].cover.split(',')[0];
        if (!app.checkInput(list[i].avatar)){
          //匹配是否包含http://
          if(list[i].avatar.indexOf("http://") == -1){
            list[i].avatar = app.config.domain + list[i].avatar;
          }
        }
        
        //添加到当前数组
        pageList.push(list[i]);
      }
      //设置数据，提示框
      that.setData({
        dsqz_list: pageList
      });
    },function(res){
      console.log(res);
    });
  },

  //用户下拉动作
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      pageIndex: 1,         //所在页页码，从1开始。
      dsqz_list: []        //滴水求助数据       
    });
    //请求获取滴水求助数据，
    that.getQiuzhuInfo(that);
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
    //请求获取滴水求助数据，
    that.getQiuzhuInfo(that);

    //提示
    wx.showToast({
      title: '正在加载..',
      icon: 'loading',
      duration: 2000,
    });
  },

  //tab点击切换
  tabClick: function (e) {
    //当前
    var that = this;
    var name = e.currentTarget.dataset.name;
    if (name == "+发起") {
      //跳转到+发起页面
      wx.navigateTo({
        url: '/pages/index/largeIllnessRescue/largeIllnessRescue',
      })
      return;
    } 

    //设置
    that.setData({
      list: null,
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  //页面加载
  onLoad: function (options) {
    var that = this;
    //请求获取滴水求助数据，
    that.getQiuzhuInfo(that);

    //设置tab
    var sliderWidth = 50;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

})