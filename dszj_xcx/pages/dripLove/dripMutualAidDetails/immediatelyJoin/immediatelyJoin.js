// pages/dripLove/dripMutualAidDetails/immediatelyJoin/immediatelyJoin.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    immediatelyJoin_list: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data=null;
    if(options.type=="zhohe"){
      data = app.dahuoData.immediatelyJoin_list.zhohe;
    }else if(options.type=="youth"){
      data = app.dahuoData.immediatelyJoin_list.youth;
    }else if(options.type=="lao"){
      data = app.dahuoData.immediatelyJoin_list.lao;
    }else if(options.type == "shao"){
      data=app.dahuoData.immediatelyJoin_list.shao;
    }
    this.setData({
      immediatelyJoin_list: data,
      id:options.id
    });
  },

  //部分不符合
  noExit:function(e){
    wx.showModal({
      title: '提示',
      content: '很抱歉，由于健康情况不符合加入条件，被互助人不能参与该互助计划。如所患疾病轻微（阑尾炎等），不确定是否可以加入，    请咨询客服：400-6063-400',
      cancelText:"重新确认",
      confirmText:'其他计划',
      confirmColor:"#0099ff",
      success:function(res){
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/dripLove/dripLove?activeIndex=3',
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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