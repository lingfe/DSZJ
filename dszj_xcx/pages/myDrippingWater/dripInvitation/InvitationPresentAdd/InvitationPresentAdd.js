// pages/myDrippingWater/dripInvitation/InvitationPresentAdd/InvitationPresentAdd.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_id:[],
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //获取用户礼单分页列表
    that.getUserInvitationPresentPaging(that);
  },

  //获取用户礼单分页列表
  getUserInvitationPresentPaging: function (that) {
    wx.request({
      url: app.config.dszjPath_web + 'api/UserInvitation/paging',
      method: "GET",
      header: {
        Token: wx.getStorageSync("token")
      },
      data: {
        "pageSize": 1000,
        "pageIndex": 1
      },
      success: function (res) {
        var pageList = that.data.list;
        //得到数据
        var list = res.data.data.Records;
        var list_id =[];
        //循环遍历操作
        for (var i = 0, lenI = list.length; i < lenI; ++i) {
          //添加到当前数组
          pageList.push(list[i].title);
          list_id.push(list[i].id);
        }

        that.setData({
          list: pageList,
          list_id: list_id,
        });
      }
    })
  },

  //添加线下礼单
  bindtapSubmit:function(e){
    var that=this;
    //验证非空
    if (app.checkInput(e.detail.value.name)){
      app.showToast("请输入对方姓名!","none");
      return;
    }
    if (app.checkInput(e.detail.value.money)){
      app.showToast("请输入礼金金额!","none");
      return;
    }
    if(app.checkInput(e.detail.value.id)){
      app.showToast("请选择对应的请柬!","none");
      return;
    }
    //请求
    wx.request({
      url: app.config.dszjPath_web +'api/UserInvitationPresent/add',
      method:"POST",
      header:{
        Token:wx.getStorageSync('token')
      },
      data:{
        type: 1,//0(线上礼单)，1(线下礼单)
        name:e.detail.value.name,
        money:e.detail.value.money,
        id:e.detail.value.id,
        content: e.detail.value.content,
        give_date:e.detail.value.give_date
      },
      success:function(res){
        console.log(res);
        app.showToast(res.data.msg,"none");
        wx.navigateBack();
      }
    })

  },

  //选择对应的请柬
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //选择日期
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
})