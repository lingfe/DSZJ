// pages/dripLove/dripMutualAidDetails/immediatelyJoin/nextContinue/verifyPhone/verifyPhone.js

var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //订单
    order:null,

    second: 60,       //60秒
    selected: false,  //隐藏/显示
    selected1: true,//隐藏/显示
    bg: null,
    phone: null,
    yzm: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var order=JSON.parse(options.order);
    that.setData({order:order});
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
    var that = this;
    that.setData({ yzm: e.detail.value });

    if (!app.checkInput(that.data.phone) && !app.checkInput(that.data.yzm)) {
      that.setData({
        bg: "bg"
      });
    }
  },

  //验证手机号后充值
  bindtapUpdatePhone: function (e) {
    var that = this;
    var form=that.data.order;
    //验证电话号码
    if (app.checkInput(e.detail.value.mobile)) {
      wx.showToast({ title: "请输入电话号码!", icon: 'none', duration: 2000 });
      return;
    }
    //验证验证码
    if (app.checkInput(e.detail.value.code)) {
      wx.showToast({ title: "请输入验证码!", icon: 'none', duration: 2000 });
      return;
    }else{
      //赋值
      form.mobile=e.detail.value.mobile;
      form.code=e.detail.value.code;
    }

    //下单
    wx.request({
      url: app.config.dszjPath_web + "api/UserPlan/order",
      header: {
        Token: wx.getStorageSync('token')
      },
      data: form,
      method: "POST",
      success: function (res1) {
        console.log(res1);
        //获取微信支付参数
        wx.request({
          url: app.config.dszjPath_web + "api/WxPay/getParamters",
          header: {
            Token: wx.getStorageSync('token')
          },
          data: {
            isApp: 0,//	是否是APP下单。
            tradeNo: res1.data.data,//	订单号。
            amount: 9.00,//订单金额。
          },
          method: "GET",
          success:function(res2){    
            //下单成功，调起支付充值
            wx.requestPayment({
              timeStamp: '',
              nonceStr: '',
              package: '',
              signType: '',
              paySign: '',
              success: function (res) {
                wx.showModal({
                  title: '支付成功',
                  content: '',
                });
              },
              fail:function(res){
                
              },
            });
          }
        });
      }
    })
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

    //向手机号发送验证码
    wx.request({
      url: app.config.dszjPath_web + "api/User/sendMobileCode",
      data: {
        mobile: that.data.phone,
      },
      header: {
        Token: wx.getStorageSync('token'),
      },
      method: "POST",
      success: function (res2) {
        console.log(res2);
      }
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
