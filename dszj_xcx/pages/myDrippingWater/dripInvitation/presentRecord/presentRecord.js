// pages/myDrippingWater/dripInvitation/presentRecord/presentRecord.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex:1,
    pageSize:10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({id:options.id,type:options.type});
    
    if(options.type == 1){
      //获取请柬提现记录分页列表
      that.getrecordPaging(that);
    }else if(options.type == 2){
      //获取救助项目提现记录分页列表
      that.getUserWithdraw(that);
    }
  
  },

  //获取救助项目提现记录分页列表
  getUserWithdraw:function(that){
    wx.request({
      url: app.config.dszjPath_web + 'api/UserWithdraw/recordPaging',
      method: "get",
      header: {
        Token: wx.getStorageSync("token")
      },
      data: {
        id: that.data.id,
        "pageIndex": that.data.pageIndex,
        "pageSize": that.data.pageSize
      },
      success: function (res) {
        console.log(res);
        that.setData({
          list: res.data.data
        });
      }
    })
  },

  //获取请柬提现记录分页列表
  getrecordPaging: function (that){
    wx.request({
      url: app.config.dszjPath_web +'api/UserInvitationWithdraw/recordPaging',
      method:"get",
      header:{
        Token:wx.getStorageSync("token")
      },
      data:{
        id:that.data.id,
        "pageIndex": that.data.pageIndex,
        "pageSize": that.data.pageSize
      },
      success:function(res){
        console.log(res);
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
      pageIndex: 1,         //所在页页码，从1开始
      list: [],
    });

    //验证模块
    if (that.data.type == 1) {
      //获取请柬提现记录分页列表
      that.getrecordPaging(that);
    }
    else if (that.data.type == 2) {

    }


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

    //验证模块
    if (that.data.type == 1) {
      //获取请柬提现记录分页列表
      that.getrecordPaging(that);
    }
    else if (that.data.type == 2) {

    }

    //提示
    wx.showToast({
      title: '正在加载..',
      icon: 'loading',
      duration: 2000,
    });
  },


})