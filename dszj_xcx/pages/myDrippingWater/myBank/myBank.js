// pages/myDrippingWater/myBank/myBank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    bankArr:[
      "贵阳银行","农业银行",
      "其他银行"
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      id:options.id
    });

    wx.showModal({
      title: '提现必读',
      showCancel: false,
      content: '1.请正确填写银行卡信息，务必认真核对，否则影响打款。\n2.提现审核通过后，3个工作日打款(周六、周末、节假日除外)，\n如有疑问请咨询400-6063-400',
    })

    //得到银行卡信息
    that.getBankInfo(that);
  },

  //得到银行卡信息
  getBankInfo:function(that){

  },

  //选择银行卡
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
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