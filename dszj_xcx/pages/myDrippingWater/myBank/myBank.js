// pages/myDrippingWater/myBank/myBank.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    bankArr:app.dahuoData.bank_list,
    bankInfo:null,//银行卡信息
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

  //保存银行卡信息
  bankForm:function(e){
    var that=this;
    var form = {};

    //验证非空
    if(app.checkInput(e.detail.value.card_name)){
      app.showToast("持卡人不能为空!","none");
      return;
    }
    if (app.checkInput(e.detail.value.sfz)){
      app.showToast("身份证不能为空!","none");
      return;
    }
    if (app.checkInput(e.detail.value.card_no)){
      app.showToast("银行卡号不能为空!","none");
      return;
    }else{
      //赋值
      form.card_name=e.detail.value.card_name;
      form.sfz=e.detail.value.sfz;
      form.bank=e.detail.value.bank;
      form.card_address = e.detail.value.card_address;
      form.card_no = e.detail.value.card_no;
    }

    //请求
    wx.request({
      url: app.config.dszjPath_web +'api/User/editBank',
      method:"POST",
      header:{
        Token:wx.getStorageSync("token")
      },
      data:form,
      success:function(res){
        app.showModal(res.data.msg);
        //得到银行卡信息
        that.getBankInfo(that);
      }
    })
  },

  //得到银行卡信息
  getBankInfo:function(that){
    wx.request({
      url: app.config.dszjPath_web + 'api/User/bankInfo',
      method: "GET",
      header: {
        Token: wx.getStorageSync("token")
      },
      success: function (res) {
        that.setData({
          bankInfo: res.data.data
        });
      }
    })
  },

  //选择银行卡
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
})