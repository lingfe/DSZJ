// pages/myDrippingWater/myDrippingWater.js
/**
 * 我的滴水
 */
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  //获取爱心统计信息
  gethelpInfo:function(that){
    //url
    var url = app.config.dszjPath_web + "api/User/helpInfo";
    //请求头
    var header = {
      Token: wx.getStorageSync("token"),
    };
    //参数
    var data = {};

    //发送请求
    app.request.reqPost(url, header, data, function (res) {
      console.log(res);
      if (res.data.code =="401"){
        //验证状态
        app.btnLogin(res.data.code);
        return;
      }
      //设置数据，提示框
      that.setData({
        helpInfo: res.data.data
      });
    }, function (res) {
      console.log(res);
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    //获取爱心统计信息
    that.gethelpInfo(that);
  },
})