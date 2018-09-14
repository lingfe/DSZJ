// pages/myDrippingWater/volunteerCenter/accountRegistration/accountRegistration.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: null,//	String	18285116111 手机号。
    mobile_confirm: null,//	String 18285116111 确认手机号。
  },

  //志愿者注册用户发起项目
  setRegisterUser: function (e) {
    var that=this;
    //验证非空
    if(app.checkInput(e.detail.value.mobile)){
      app.showToast("手机号码不能为空!","none");
      return;
    }
    if(e.detail.value.mobile_confirm != e.detail.value.mobile ){
      app.showToast("两次输入不一致!","none");
      return;
    }

    //请求
    wx.request({
      url: app.config.dszjPath_web + 'api/Volunteer/registerUser',
      method: "POST",
      header: {
        Token: wx.getStorageSync("token")
      },
      data:{
        mobile:e.detail.value.mobile,//	String	18285116111 手机号。
        mobile_confirm:e.detail.value.mobile_confirm,//	String 18285116111 确认手机号。
      },
      success: function (res) {
        app.showToast(res.data.msg,"none");        
      }
    })
  },
})