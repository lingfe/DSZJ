// pages/myDrippingWater/volunteerCenter/myRecommend/myRecommend.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPath: app.config.domain,//图片路径,本地
    dsqz_list: [],//数据
    //分页参数
    pageSize: 10,
    pageIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //请求获取我的推荐数据，
    that.getQiuzhuInfo(that);
  },

  //请求获取我的推荐数据，
  getQiuzhuInfo: function (that) {
    //url
    var url = app.config.dszjPath_web + "api/UserSeriousIllness/paging";
    //参数
    var data = {
      "pageSize": that.data.pageSize,
      "pageIndex": that.data.pageIndex
    }
    //请求头
    var header = {
      Token: wx.getStorageSync("token")
    };
    //发送请求
    app.request.reqPost(url, header, data, function (res) {
      console.log(res);
      if (res.data.code == "401") {
        //验证状态
        app.btnLogin(res.data.code);
        return;
      } else {

        var pageList = that.data.dsqz_list;
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
          if (!app.checkInput(list[i].cover))
            list[i].cover = app.config.domain + list[i].cover.split(',')[0];
          if (!app.checkInput(list[i].avatar)) {
            //匹配是否包含http://
            if (list[i].avatar.indexOf("http") == -1) {
              list[i].avatar = app.config.domain + list[i].avatar;
            }
          }

          //添加到当前数组
          pageList.push(list[i]);
        }
        //设置数据，提示框
        that.setData({
          dsqz_list: pageList
        });
      }
    }, function (res) {
      console.log(res);
    });
  },

})