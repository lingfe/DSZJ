// updatePhone.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: 60,       //60秒
    selected: false,  //隐藏/显示
    selected1: true,//隐藏/显示
    bg:null,
    phone:null,
    yzm:null
  },

  //电话号码
  inputTypingPhone: function (e) {
    var that = this
    that.setData({ phone: e.detail.value });
    if (!app.checkInput(that.data.phone) && !app.checkInput(that.data.yzm)) {
      that.setData({
        bg: "bg"
      });
    }
  },

  //验证码，
  inputTypingYZM: function (e) {
    var that=this;
    that.setData({ yzm: e.detail.value });
    
    if (!app.checkInput(that.data.phone) && !app.checkInput(that.data.yzm)){
      that.setData({
        bg:"bg"
      });
    }
  },

  //加载
  onLoad: function () {
    var that = this;
    var user = wx.getStorageSync('user');
    that.setData({
      user: user
    });
  },

  //修改电话号码
  bindtapUpdatePhone: function (e) {
    var that = this;
    //验证电话号码
    if (app.checkInput(that.data.phone)) {
      wx.showToast({ title: "请输入电话号码!", icon: 'none', duration: 2000 });
      return;
    }
    //验证验证码
    if (app.checkInput(that.data.yzm)) {
      wx.showToast({ title: "请输入验证码!", icon: 'none', duration: 2000 });
      return;
    }

    //修改电话号码
    var url = app.config.basePath_sys + "api/plug/save";
    //请求头
    var header = {
      cookie: wx.getStorageSync('cookie') + ";" + that.data.user_verify_sys,
      "Content-Type": "application/x-www-form-urlencoded"
    };
    //参数
    var data = {
      timeStamp: wx.getStorageSync('time'),
      token: wx.getStorageSync('token'),
      reqJson: JSON.stringify({
        nameSpace: 'sys_userinfo',       //个人信息表
        scriptName: 'com.echsoft.common.plugin.impl.BindPhone4UserPlugin',
        nameSpaceMap: {
          rows: [{
            mobile: that.data.phone,
            verifyCode: that.data.yzm,
            id: wx.getStorageSync('personalId')   //个人资料id
          }],
        }
      })
    };

    //发送请求
    app.request.reqPost(url, header, data, function (res) {
      console.log(res);
      wx.showToast({
        title: res.data.message,
        icon: 'Ok',
        duration: 1000,
        success: function (res) {
          wx.switchTab({
            url: '/pages/personal/personal',
          });
        }
      });
    });
  },

  //获取验证码
  getphone: function (e) {
    var that = this;
    if (app.checkInput(that.data.phone)) {
      wx.showToast({ title: "请输入电话号码!", icon: 'none', duration: 2000 });
      return;
    }
    that.setData({
      selected: true,
      selected1: false,
    });
    //冷冻
    countdown(that);

    //获取验证码
    var url = app.config.basePath_sys + "api/exe/sendVerificationCode";
    //请求头
    var header = {
      cookie: wx.getStorageSync('cookie'),
      "Content-Type": "application/x-www-form-urlencoded"
    };
    //参数
    var data = {
      timeStamp: wx.getStorageSync('time'),
      token: wx.getStorageSync('token'),
      reqJson: that.data.phone,
    };

    //发送请求
    app.request.reqPost(url, header, data, function (res) {
      console.log(res);
      var cookie = res.header["Set-Cookie"].split(",")[0].split(";")[0];
      that.setData({
        user_verify_sys: cookie
      });
    });
  },
});

//验证码
function countdown(that) {
  var second = that.data.second;
  if (second == 0) {
    that.setData({
      selected: false,
      selected1: true,
      second: 60,
    });
    return;
  }
  var time = setTimeout(function () {
    that.setData({
      second: second - 1
    });
    countdown(that);
  }, 1000)
}
