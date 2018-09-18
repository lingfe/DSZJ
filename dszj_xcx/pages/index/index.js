/**
 * page 首页
 * athon lingfe
 */

//获取应用实例
var app = getApp()

Page({
  data: {
    //轮播数据
    indexData:app.dahuoData.indexData,
    //登记电话号码
    mobile:null,
  },

  //拨打客服电话号码
  bodaPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: '4006063400',
    });
  },

  //输入电话号码
  bindinputPhone:function(e){
    this.setData({
      mobile: e.detail.value
    });
  },

  //立即登记
  bindtapLijie:function(e){
    var that=this;
    //url
    var url =app.config.dszjPath_web+"api/HelpIntent/Add";
    //参数
    var data={
      mobile: that.data.mobile
    };
    //请求头
    var header = { 
      "token":wx.getStorageSync("token"),
    };
    //发送请求
    app.request.reqPost(url,header,data,function(res){
      console.log(res);
      that.setData({
        mobile:null
      });
      app.showToast("登记成功!","success");
    },function(res){
      console.log(res);
    });
  },
  
  //快速发起筹款
  bindtapBounceInLeft:function(){
    wx.navigateTo({
      url: '/pages/index/largeIllnessRescue/largeIllnessRescue',
    })
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
})
