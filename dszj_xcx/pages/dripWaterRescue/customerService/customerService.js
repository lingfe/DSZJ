
/**
 * 客服服务
 */

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  //跳转到发布问题页面
  bindtab_releaseProblem:function(){
    wx.navigateTo({
      url: '/pages/dripWaterRescue/customerService/releaseProblem/releaseProblem',
    })
  },

  //跳转到感谢亲们页面
  bindtab_gxqm: function () {
    wx.navigateTo({
      url: '/pages/dripLove/thankGuys/thankGuys',
    })
  },

  //跳转到详情
  bindtap_Info:function(){
    wx.navigateTo({
      url: '/pages/dripWaterRescue/customerService/customerServiceDetails/customerServiceDetails',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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