// pages/myDrippingWater/dripInvitation/dripInvitationDetail/encloseCashGift/encloseCashGift.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jingE_list: app.dahuoData.jingE_list,
    jingE: 0,         //金额

    //支付表单
    pay_form: {
      type: 0,	//Int 支付类型。 默認值: 0 Allowed values: 0(大病救助), 1(项目祈福), 2(个人祈福), 3(请柬)
      payway: 0,//	Int支付方式。默認值: 0 Allowed values: 0(微信支付), 1(支付宝支付), 2(银联支付)
      id: null,//	Int 主ID（项目ID/请柬ID）。
      amount: 0,//	Int支付金额。
      content: null,// 選項	String	支付内容。
      isAnonymous: 0, //選項	Int	是否匿名。默認值: 0  Allowed values: 0, 1
    },
    order_id: null,//订单号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //支付订单
  setUserPayOrder: function (e) {

    //页面跳转
    wx.navigateTo({
      url: '/pages/dripLove/rescueDetails/heplTaFundraising/paymentSuccess/paymentSuccess?',
    })

    var that = this;
    //验证非空
    if (app.checkInput(that.data.jingE)) {
      app.showToast("请选择或输入金额", "none");
      return;
    }
    if (app.checkInput(that.data.textarea)) {
      app.showToast("请输入祝福语", "none");
      return;
    }
    //赋值
    var pay_form = that.data.pay_form;
    if (that.data.checkbox) {
      pay_form.isAnonymous = 1;
    }
    pay_form.amount = that.data.jingE;
    pay_form.content = that.data.textarea;
    pay_form.id = that.data.detailsData.id;

    //保存订单
    wx.request({
      url: app.config.dszjPath_web + 'api/UserPay/order',
      method: "POST",
      header: {
        Token: wx.getStorageSync("token")
      },
      data: pay_form,
      success: function (res) {
        console.log(res);
        if (res.data.code == 401) {
          app.btnLogin(res.data.code);
          return;
        } else {
          //得到支付参数
          wx.request({
            url: app.config.dszjPath_web + 'api/WxPay/getParamters',
            method: 'GET',
            header: {
              Token: wx.getStorageSync("token")
            },
            data: {
              isApp: 0,      //是否app
              tradeNo: res.data.data, //订单号
              amount: pay_form.amount, //金额
            },
            success: function (resPay) {
              console.log(resPay);

              //页面跳转
              wx.navigateTo({
                url: '/pages/dripLove/rescueDetails/heplTaFundraising/paymentSuccess/paymentSuccess?code=' + resPay.data.code,
              })
            }
          })

        }
      }
    })

  },

  //选择的金额
  bindtapAmount: function (e) {
    var amount = 0;
    if (app.checkInput(e.detail.value)) {
      amount = e.currentTarget.dataset.amount;
    } else {
      amount = e.detail.value;
    }

    //设置值
    this.setData({
      jingE: amount
    });
  },
})