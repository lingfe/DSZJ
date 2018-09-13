// pages/dripLove/dripMutualAidDetails/immediatelyJoin/nextContinue/nextContinue.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //下单
    form:{
      id:null,//	Int互助计划ID。
      name:null,//	String真实姓名。
      sfz:null,//	String身份证号。
      mobile:null,//	String手机号。
      code:null,//	String手机验证码。
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({id:options.id});
  },

  //保存下单参数
  setParamPay:function(e){
    var that=this;
    var form=that.data.form;
    //验证非空
    if(app.checkInput(e.detail.value.name)){
      app.showToast("真实姓名不能为空!","none");
      return;
    }
    if(app.checkInput(e.detail.value.sfz)){
      app.showToast("身份证不能为空!","none");
      return;
    }else{
      //赋值
      form.id=that.data.id;
      form.name=e.detail.value.name;
      form.sfz=e.detail.value.sfz;
    }

    //跳转到验证电话号码页面
    var paramStr=JSON.stringify(form);
    wx.navigateTo({
      url: '/pages/dripLove/dripMutualAidDetails/immediatelyJoin/nextContinue/verifyPhone/verifyPhone?order='+paramStr,
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