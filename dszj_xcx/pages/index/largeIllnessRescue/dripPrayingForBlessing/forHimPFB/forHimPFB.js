// pages/index/largeIllnessRescue/dripPrayingForBlessing/forHimPFB/forHimPFB.js
var app=getApp();

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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})