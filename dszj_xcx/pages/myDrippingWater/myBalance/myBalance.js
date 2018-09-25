// pages/myDrippingWater/myBalance/myBalance.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],//数据

    //分页参数
    pageSize: 10,
    pageIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;

    wx.showModal({
      title: '提现必读',
      showCancel:false,
      content: '1.请正确填写银行卡信息，务必认真核对，否则影响打款。\n2.提现审核需要进行项目验证（大病求助需要相关医疗证明）和身份验证，请务必保证资料齐全无误，否则影响提现进度。\n3.筹款7-30天内可申请1次50%以内的紧急提现，30天后可申请剩余金额100%提现，为保障资金安全，请尽量自行申请提现。\n4.提现审核通过后，3个工作日打款(周六、周末、节假日除外)，\n如有疑问请咨询400-6063-400',
    });

    //获取救助项目提现分页列表
    that.getUserWithdraw(that);
  },

  //申请提现
  setApplicationForPresentation: function (e) {
    var that = this;

    //验证非空
    if (app.checkInput(e.detail.value.card_name)) {
      app.showToast("姓名不能为空!", "none");
      return;
    }
    if (app.checkInput(e.detail.value.sfz)) {
      app.showToast("身份证不能为空!", "none");
      return;
    }
    if (app.checkInput(e.detail.value.bank)) {
      app.showToast("请输入开户银行!", "none");
      return;
    }
    if (app.checkInput(e.detail.value.card_no)) {
      app.showToast("银行卡号不能为空!", "none");
      return;
    }
    if (app.checkInput(e.detail.value.money)) {
      app.showToast("金额不能为空!", none);
      return;
    }

    //发送请求
    wx.request({
      url: app.config.dszjPath_web + 'api/UserInvitationWithdraw/apply',
      method: "POST",
      header: {
        Token: wx.getStorageSync("token")
      },
      data: {
        id: e.detail.value.id,//请柬id
        days: e.detail.value.days,//提现还需等待N天。
        card_name: e.detail.value.card_name,//姓名
        sfz: e.detail.value.sfz,//身份证
        mobile: e.detail.value.mobile,//电话号码
        bank: e.detail.value.bank,//开户银行
        other_bank: e.detail.value.other_bank,//其他银行
        bank_address: e.detail.value.bank_address,//开户行地址
        card_no: e.detail.value.card_no,//卡号
        money: e.detail.value.money,//金额
      },
      success: function (res) {
        console.log(res);
        app.showModal(res.data.msg);
      }
    })
  },

  //获取救助项目提现分页列表
  getUserWithdraw:function(that){
    wx.request({
      url: app.config.dszjPath_web + 'api/UserWithdraw/paging',
      method: "GET",
      header: {
        Token: wx.getStorageSync("token")
      },
      data: {
        pageSize: that.data.pageSize,
        pageIndex: that.data.pageIndex
      },
      success:function(res){
        var pageList = that.data.list;
        //得到数据
        var list = res.data.data.Records;
        if (list == null || list.length == 0) {
          //提示
          wx.showToast({
            title: '没有更多了!',
            icon: 'loading',
            duration: 1000,
          });
          return;
        }

        //循环遍历操作
        for (var i = 0, lenI = list.length; i < lenI; ++i) {
          //添加到当前数组
          pageList.push(list[i]);
        }

        //保存
        that.setData({
          list: pageList,
          RecordCount: res.data.data.RecordCount
        });
      }
    })
  },
})