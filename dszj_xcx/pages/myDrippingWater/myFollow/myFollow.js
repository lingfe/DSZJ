// pages/myDrippingWater/myFollow/myFollow.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],//数据
    pageSize: 10,            //每页显示的记录数量。
    pageIndex: 1,              //所在页页码，从1开始。
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;

    //根据id得到关注内容
    that.getWhereUserID(that);
  },

  //验证状态跳转
  bindtapNato:function(e){
    if (e.currentTarget.dataset.ifstop == 0){
      wx.navigateTo({
        url: '/pages/dripLove/rescueDetails/rescueDetails?id=' + e.currentTarget.id,
      })
    }
  },

  //得到关注内容
  getWhereUserID:function(that){
    wx.request({
      url: app.config.dszjPath_web +'api/UserSeriousIllness/collectPaging',
      method:"GET",
      header:{
        Token:wx.getStorageSync("token")
      },
      data:{
        pageSize: that.data.pageSize,            //每页显示的记录数量。
        pageIndex: that.data.pageIndex,              //所在页页码，从1开始。
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
          if(!app.checkInput(list[i].cover)){
            list[i].cover = app.config.domain+list[i].cover;
          }
          //添加到当前数组
          pageList.push(list[i]);
        }
        //保存
        that.setData({
          list: pageList
        });
      }
    })
  },

  //用户下拉动作
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      pageIndex: 1,         //所在页页码，从1开始。
      list: [],        //数据       
    });
    //根据id得到关注内容
    that.getWhereUserID(that);

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
    //根据id得到关注内容
    that.getWhereUserID(that);

    //提示
    app.showToast("正在加载..","loading");
  },
})