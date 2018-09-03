// pages/dripLove/childrensHealthMutualAidProgram/childrensHealthMutualAidProgram.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    mutualServer_list: app.dahuoData.mutualServer_list,
    goyue_list: app.dahuoData.goyue_list,
    commonProblem_List: app.dahuoData.commonProblem_List,
    isTuou_List: app.dahuoData.isTuou_List,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
    });
    //获取最新加入互助计划用户,加入互助计划总人数
    that.getlatestUserCount(that);
  },

  //获取加入互助计划总人数,加入互助计划总人数
  getlatestUserCount: function (that) {
    //url
    var url = app.config.dszjPath_web + "api/Plan/count";
    //参数
    var data = {
      id: that.data.id,
    }
    //发送请求
    app.request.reqGet(url, data, function (res) {
      console.log(res);
      //设置数据，提示框
      that.setData({
        latestUserCount: res.data.data.count,
        threeday_count: res.data.data.threeday_count,
      });
    }, function (res) {
      console.log(res);
    });
  },

  //tab 展开操作
  bind_isTuou: function (e) {
    var that = this;
    
    if (that.data.isTuou == e.currentTarget.id) {
      this.setData({
        isTuou: '',
      });
    } else {
      this.setData({
        isTuou: e.currentTarget.id
      });
    }
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