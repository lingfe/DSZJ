// pages/myDrippingWater/myFollow/myFollow.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize: 10,            //每页显示的记录数量。
    pageIndex: 1,              //所在页页码，从1开始。
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({ id: options.user_id});

    //根据id得到关注内容
    that.getWhereUserID(that);
  },

  //根据id得到关注内容
  getWhereUserID:function(that){
    wx.request({
      url: app.config.dszjPath_web +'api/UserSeriousIllness/collectPaging',
      method:"GET",
      header:{
        Token:wx.getStorageSync("token")
      },
      data:{
        id:that.data.id,
        pageSize: that.data.pageSize,            //每页显示的记录数量。
        pageIndex: that.data.pageIndex,              //所在页页码，从1开始。
      },
      success:function(res){
        console.log(res);
        //保存
        that.setData({
          list:res.data.data
        });
      }
    })
  },

  //用户下拉动作
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      pageIndex: 1,         //所在页页码，从1开始。
      dsqz_list: [],        //滴水求助数据  
      mutuaAid_list: [],         //滴水互助数据     
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