import config from './config/config'
import request from './assets/plugins/request'
import md5 from './utils/md5.js'
import service from './utils/server.js'
import dahuoData from './helpers/dahuoData.js'

App({
  config, //配置信息
  request,//请求
  md5,    //md5加密
  service,//位置服务
  dahuoData, //筛选数据
  //验证非空
  checkInput: function (data) {
    if (data == null || data == undefined || data == "" || data == 'null') {
      return true;
    }
    if (typeof data == "string") {
      var result = data.replace(/(^\s*)|(\s*$)/g, "");
      return result.length == 0 ? true : false;
    } else {
      return false;
    }
  },

  //当前时间
  getDateTime: function () {
    var dateTime = new Date().toLocaleString();
    return dateTime;
  },

  //提示框，有按钮
  showModal: function (msg) {
    wx.showModal({
      title: msg,
      showCancel: false,
    });
  },

  //提示，无按钮
  showToast: function (msg, icon) {
    wx.showToast({
      title: msg,
      icon: icon,
      duration: 2000
    })
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  //用户数据
  globalData: {
    userInfo: null,                 //用户数据
    openid: null,                   //微信用户id
    appid: 'wx466570f91d21af20',                    //小程序id
    secret: '317c7dd4e5985c1e884d552c8b2cf1c7',     //小程序的 app secret
    token: null,      //请求唯一标识
  },
})