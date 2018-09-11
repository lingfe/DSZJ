// pages/dripLove/rescueDetails/loveContributionList/loveContributionList.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({ id: options.id, });

    //获取救助项目爱心排行榜列表
    that.getLoveRanking(that);
  },

  //帮助ta
  bindtapPay: function (e) {
    var detailsData = wx.getStorageSync("detailsData");
    wx.navigateTo({
      url: "/pages/dripLove/rescueDetails/heplTaFundraising/heplTaFundraising?detailsData=" + JSON.stringify(detailsData),
    })
  },

  //获取救助项目爱心排行榜列表
  getLoveRanking:function(that){
    //请求地址
    var url = app.config.dszjPath_web + "api/SeriousIllness/loveRanking";
    //参数
    var data = {
      id: that.data.id,
      isOnlyThree:0,//显示前十
    }
    //请求头
    var header = {
      Token: wx.getStorageSync("token")
    }

    //发送请求
    app.request.request(url, "get", header, data,
      function (res) {
        //验证非空
        if (!app.checkInput(res.data.data)){
          var list = res.data.data;

          //循环遍历操作
          for (var i = 0, lenI = list.Records.length; i < lenI; ++i) {
            if (!app.checkInput(list.Records[i].project_total)) {
              //将小数转为整数
              list.Records[i].project_total = parseInt(list.Records[i].project_total);
            }
          }
          
          that.setData({
            info_0: res.data.data.Records[0],
            info_1: res.data.data.Records[1],
            info_2: res.data.data.Records[2],
            dataList: list
          });
        }
        
        console.log(res);
      }, function (res) {
        console.log(res);
      }, function (res) {
        console.log(res);
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