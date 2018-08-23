// pages/index/largeIllnessRescue/patientInformation/receivablesInformation/receivablesInformation.js

var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Account_opening_bank:["请选择","建设银行","招商银行","贵阳银行"],
    index:0,
  },

  //下一步
  formSubmit: function (e) {
    var that = this;
    //验证是否为空  
    if (app.checkInput(e.detail.value.card_name)) {
      app.showToast("收款人不能为空!","none");
      return;
    } else if (app.checkInput(e.detail.value.bank) || "请选择" == e.detail.value.bank) {
      app.showToast("请选择开户银行!", "none");
      return;
    }else if (app.checkInput(e.detail.value.cardNo)) {
      app.showToast("银行卡号不能为空!", "none");
      return;
    } else if (app.checkInput(e.detail.value.sfz)) {
      app.showToast("身份证号不能为空!", "none");
      return;
    } else if (app.checkInput(e.detail.value.mobile)) {
      app.showToast("收款人手机号不能为空!", "none");
      return;
    }else{
        that.data.form={
          step: 3,          //	Int请求步骤。
          id: wx.getStorageSync("id"),             //	Int	项目id。
          bank: e.detail.value.bank,           //Double	银行名称
          card_name: e.detail.value.card_name,   //	String	银行卡姓名
          cardNo: e.detail.value.cardNo,      //	String	银行卡号
          mobile: e.detail.value.mobile,      //	Array	手机号
          otherbank: e.detail.value.otherbank,   // 選項	String	其他银行
          sfz: e.detail.value.sfz,         //	String	身份证号
        };

      //提示
      app.showToast("请求中，请稍等..", "loading");

      //调用请求发布
      that.reqSetData(that);
    }
    
  },

  //调用请求发布
  reqSetData: function (that) {
    //请求地址url
    var url = app.config.dszjPath_web + "api/UserSeriousIllness/add";
    //请求头
    var header = {
      Token: wx.getStorageSync("token")
    }
    //参数
    var data = that.data.form;

    //发起请求
    app.request.reqPost(url, header, data, function (res) {
      console.log(res);
      //将id保存到缓存
      wx.setStorageSync("id", res.data);
    }, function (res) {
      console.log(res);
    })

    //跳转到详情
    wx.navigateTo({
      url: '/pages/index/largeIllnessRescue/patientInformation/receivablesInformation/receivablesInformation',
    })
  },

  //开户银行
  bindPickerChange:function(e){
    this.setData({
      index: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      "form.id": wx.getStorageSync("id"),
    });
  },
})