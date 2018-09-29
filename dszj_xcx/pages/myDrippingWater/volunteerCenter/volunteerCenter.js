// pages/myDrippingWater/volunteerCenter/volunteerCenter.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.getVolunteer(that);

  },

  //获取当前用户志愿者信息
  getVolunteer:function(that){
    wx.request({
      url: app.config.dszjPath_web +'api/Volunteer/getSelf',
      method:"get",
      header:{
        Token:wx.getStorageSync("token")
      },
      success:function(res){
        //验证是否是志愿者
        if (res.data.msg == '您不是志愿者！'){
          //跳转到申请志愿者
          wx.navigateTo({
            url: '/pages/dripWaterRescue/applicationVolunteer/applicationVolunteer',
          })
          return;
        }else{
          //保存
          that.setData({
            teer: res.data.data
          });
        }        
      }
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

})