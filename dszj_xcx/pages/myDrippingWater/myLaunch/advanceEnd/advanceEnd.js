// pages/myDrippingWater/myLaunch/advanceEnd/advanceEnd.js

var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,//救助项目id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var  that=this;
    that.setData({
      id:options.id,
      zt:options.zt,
      type:options.type,
    });
  },

  //提前结束发送请求
  reqSetData: function (e) {
    var that = this;
    var url = app.config.dszjPath_web + 'api/UserSeriousIllness/over';
    //验证项目状态
    if(that.data.zt==0){
      app.showToast("该项目未认证","none");
      return;
    }
    if(that.data.type=="qj"){
      url = app.config.dszjPath_web + 'api/UserInvitation/over';
    }
    //验证内容非空
    if (app.checkInput(e.detail.value.description)){
      app.showToast("提前结束理由不能为空!","none");
      return;
    }

    //请求
    wx.request({
      url: url,
      header: {
        Token: wx.getStorageSync('token')
      },
      data: {
        id:that.data.id,
        description: e.detail.value.description
      },
      method: "GET",
      success: function (res) {
        console.log(res);
        //跳转到详情
        // if (that.data.info_type == 0) {
        //   //救助详情
        //   wx.navigateTo({
        //     url: '/pages/dripLove/rescueDetails/rescueDetails?id=' + that.data.id,
        //   })
        // } else {
        //   //祈福详情
        //   wx.navigateTo({
        //     url: '/pages/index/largeIllnessRescue/dripPrayingForBlessing/dripPrayingForBlessing?id=' + that.data.id,
        //   })
        // }
      }
    });
  },

})