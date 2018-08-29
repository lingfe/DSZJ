// pages/dripLove/rescueDetails/myAlsoComeProve/myAlsoComeProve.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myACP:["请选择与受助人关系","亲人","朋友","邻居","病友","同事","老师","同学","自愿者","参与者","其他"],
    myACP_index:0,

    //表单
    form:{
      id:null,            //	Int项目Id。
      relation:null,      //	String	与受助人关系。
      name:null,          //String	姓名。
      identityCard:null,  //	String身份证号。
      description:null,   //	String	证实内容。
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({ id: options.id, });
  },

  //新增证实记录
  setAddVerify:function(e){
    var that = this;

    //验证是否为空
    if (e.detail.value.relation == '请选择与受助人关系') {
      app.showToast("请选择与受助人的关系!", "none");
      return;
    }
    if (app.checkInput(e.detail.value.name)) {
      app.showToast("姓名不能为空!", "none");
      return;
    }
    if (app.checkInput(e.detail.value.identityCard)) {
      app.showToast("身份证号码不能为空!", "none");
      return;
    }
    if (app.checkInput(e.detail.value.description)) {
      app.showToast("证实内容不能为空！", "none");
      return;
    }

    //赋值
    that.data.form = {
      id: that.data.id,
      relation: e.detail.value.relation,      //	String	与受助人关系。
      name: e.detail.value.name,          //String	姓名。
      identityCard: e.detail.value.identityCard,  //	String身份证号。
      description: e.detail.value.description,   //	String	证实内容。
    }

    //提示
    app.showToast("感谢您的证实!", "success");

    //发送请求
    that.reqSetData(that);
  },

  //发s请求
  reqSetData: function (that) {
    var that = this;
    //url
    var url = app.config.dszjPath_web + "api/UserSeriousIllness/addVerify";
    //请求头
    var header = {
      Token: wx.getStorageSync("token")
    }
    //参数
    var data = that.data.form;

    //发送请求
    app.request.reqPost(url, header, data, function (res) {
      console.log(res);
      if(res.data.code == 0){
        that.setData({
          myACP_index: 0,
          form: {}
        });

        //返回上一页
        //得到打开的页面
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];  //当前页面
        var prevPage = pages[pages.length - 2]; //上一个页面
        //返回上一页
        wx.navigateBack();
      }else{
        //验证回话
        app.btnLogin(res.data.code);
      }
    }, function (res) {
      console.log(res);
    })
  },

  //与受助人关系
  bind_myACP:function(e){
    this.setData({
      myACP_index:e.detail.value
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