// pages/dripWaterRescue/applicationVolunteer/applicationVolunteer.js
/**
 * 申请志愿者
 */
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_display:true,
    name:null,
    mobile:null,
  },

  //申请志愿者
  formSbmit:function(e){
    var that=this;
    //验证非空
    if(app.checkInput(e.detail.value.name)){
      app.showToast("真实姓名不能为空!","none");
      return;
    }
    if(app.checkInput(e.detail.value.mobile)){
      app.showToast("电话号码不能为空!","none");
      return;
    }else{
      that.data.name=e.detail.value.name;
      that.data.mobile = e.detail.value.mobile;
    }

    //请求
    wx.request({
      url: app.config.dszjPath_web +'api/Volunteer/apply',
      method:"POST",
      header:{
        Token:wx.getStorageSync('token')
      },
      data:{
        name:that.data.name,
        mobile:that.data.mobile,
      },
      success:function(res){
        app.showToast(res.data.msg,"none");

        if(res.data.code == 1){
          //返回上一页
          wx.navigateBack();
        }
      }
    })
  },


  //取消或显示
  bindtapis_display: function (e) {
    this.setData({
      is_display: this.data.is_display == false ? true : false,
    })
  },
})