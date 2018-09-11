// pages/dripLove/rescueDetails/rescueDetails.js

var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,          //救助项目id
    detailsData:null, //救助项目信息
    imgPass: app.config.domain,

    pageSize: 10,            //每页显示的记录数量。
    pageIndex: 1,            //所在页页码，从1开始。
    list_hepl: [],           //ta的所以帮助信息  

    isGzhu:false,

    zjlxsm_isDiaplay:false,  //是否显示资金流向说明

    info:null,             //我也来证明
    infoContent:null,       //内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({ id: options.id,});
    //获取救助项目详情
    that.getSeriousIllnessDetails(that);
    //获取救助项目爱心排行榜列表
    that.getLoveRanking(that);
    //分页获取他的帮助
    that.getTaHepl(that);
    //获取救助项目的关注数和当前用户的关注状态
    that.getCollectInfo(that);
  },

  //关注/取消关注救助项目
  setUserSeriousIllness:function(e){
    var that=this;
    //请求
    wx.request({
      url: app.config.dszjPath_web +'api/UserSeriousIllness/collect',
      header: {
        Token: wx.getStorageSync("token")
      },
      method:"POST",
      data:{
        id:that.data.id,
      },
      success:function(res){
        if (that.data.status == 0){
          app.showToast("关注成功","none");
          that.setData({isGzhu:true});
        } else if (that.data.status == 1){
          app.showToast("取消关注成功", "none");
          that.setData({ isGzhu: false });
        }

        //获取救助项目的关注数和当前用户的关注状态
        that.getCollectInfo(that);
      }
    })
  },

  //分享
  onShareAppMessage: function (e) {
    return {
      title: '滴水救助',
      desc: this.data.detailsData.title,
      path: '/pages/dripLove/rescueDetails/rescueDetails?id=' + this.data.detailsData.id
    }
  },

  //帮助ta
  bindtapPay:function(e){
    var detailsData = this.data.detailsData;
    wx.navigateTo({
      url: "/pages/dripLove/rescueDetails/heplTaFundraising/heplTaFundraising?detailsData=" + JSON.stringify(detailsData),
    })
  },

  //图片预览
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: e.currentTarget.dataset.imgarr // 需要预览的图片http链接列表
    })
  },

  //资金流向说明
  zjlxsm_isDiaplay_Btn:function(e){
    this.setData({
      zjlxsm_isDiaplay: this.data.zjlxsm_isDiaplay==true?false:true
    });
  },

  //获取救助项目的关注数和当前用户的关注状态
  getCollectInfo:function(that){
    //请求地址
    var url = app.config.dszjPath_web + "api/SeriousIllness/collectInfo";
    //参数
    var data = {
      id: that.data.id,
    }
    //请求头
    var header = {
      Token: wx.getStorageSync("token")
    }

    //发送请求
    app.request.request(url, "get", header, data,
      function (res) {
        //验证非空
        if (!app.checkInput(res.data.data)) {
          that.setData({
            count: res.data.data.count,
            status: res.data.data.status
          });
        }

        console.log(res);
      }, function (res) {
        console.log(res);
      }, function (res) {
        console.log(res);
      });
  },

  //获取救助项目爱心排行榜列表
  getLoveRanking: function (that) {
    //请求地址
    var url = app.config.dszjPath_web + "api/SeriousIllness/loveRanking";
    //参数
    var data = {
      id: that.data.id,
      isOnlyThree: 1,//显示前3
    }
    //请求头
    var header = {
      Token: wx.getStorageSync("token")
    }

    //发送请求
    app.request.request(url, "get", header, data,
      function (res) {
        //验证非空
        if (!app.checkInput(res.data.data)) {
          that.setData({
            dataList: res.data.data
          });
        }

        console.log(res);
      }, function (res) {
        console.log(res);
      }, function (res) {
        console.log(res);
      });
  },

  //是否显示小箭头-我也来证明
  imgInfo:function(e){
    this.setData({
      info: "info" + e.currentTarget.id,
      infoContent: e.currentTarget.dataset.info
    });
  },

  //分页获取他的帮助
  getTaHepl: function (that) {
    //请求地址
    var url = app.config.dszjPath_web + "api/SeriousIllness/raiseFundsPaging";
    //参数
    var data = {
      id: that.data.id,
      "pageSize": that.data.pageSize,
      "pageIndex": that.data.pageIndex
    }
    //请求头
    var header = {
      Token: wx.getStorageSync("token")
    }

    //发送请求
    app.request.request(url, "get", header, data, function (res) {
      var pageList = that.data.list_hepl;
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

        if (!app.checkInput(list[i].avatar)) {
          //匹配是否包含http://
          if (list[i].avatar.indexOf("http://") == -1) {
            list[i].avatar = app.config.domain + list[i].avatar;
          }
        }
        //验证是否显示
        if (list[i].is_show == 1) {
          //添加到当前数组
          pageList.push(list[i]);
        }
      }
      //设置数据，提示框
      that.setData({
        list_hepl: pageList,
        RecordCount: res.data.data.RecordCount
      });
    }, function (res) {

    }, function (res) {

    });
  },


  //获取救助项目详情
  getSeriousIllnessDetails:function(that){
    //请求地址
    var url = app.config.dszjPath_web +"api/SeriousIllness/detail";
    //参数
    var data={
      id:that.data.id,
    }
    //请求头
    var header={
      Token:wx.getStorageSync("token")
    }

    //发送请求
    app.request.request(url, "get", header, data, 
    function(res){
      that.setData({
        detailsData:res.data.data
      });
      //放入缓存中
      wx.setStorageSync("detailsData", res.data.data);
      console.log(res);
    },function(res){
      console.log(res);
    },function(res){
      console.log(res);
    });
  },

})