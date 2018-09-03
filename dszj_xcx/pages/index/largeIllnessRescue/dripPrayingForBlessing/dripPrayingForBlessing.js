// pages/index/largeIllnessRescue/dripPrayingForBlessing/dripPrayingForBlessing.js

var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPath: app.config.domain
  },

  //跳转到感谢亲们页面
  bindTab_GXQM: function () {
    wx.navigateTo({
      url: '/pages/dripWaterRescue/customerService/customerService',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({id:options.id});

    //获取个人祈福详情
    that.getUserPrayDetail(that);
    //获取祈福记录分页列表
    that.getRrecordPaging(that);
  },

  //获取救助项目详情
  getSeriousIllnessDetails: function (that) {
    //请求地址
    var url = app.config.dszjPath_web + "api/SeriousIllness/detail";
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
        that.setData({
          detailsData: res.data.data
        });
        console.log(res);
      }, function (res) {
        console.log(res);
      }, function (res) {
        console.log(res);
      });
  },

  //获取祈福记录分页列表
  getRrecordPaging:function(that){
    wx.request({
      url: app.config.dszjPath_web +'api/Pray/recordPaging',
      method:"POST",
      header:{
        Token:wx.getStorageSync("token")
      },
      data:{
        id:that.data.id,
        pageIndex:1,
        pageSize:10,
      },
      success:function(res){
        console.log(res);
        that.setData({
          paging_list: res.data.Records
        });
      }
    })
  },

  //获取个人祈福详情
  getUserPrayDetail:function(that){
    //url
    var url = app.config.dszjPath_web +"api/Pray/detail";
    //请求头
    var header={
      Token:wx.getStorageSync("token")
    }
    //参数
    var data={
      id:that.data.id
    }

    //发起请求
    wx.request({
      url: url,
      header:header,
      data:data,
      method:"GET",
      success:function(res){
        console.log(res);
        that.setData({
          info:res.data.data
        });
      }
    })
  },

  //分享
  onShareAppMessage: function (e) {
    return {
      title: '滴水祈福',
      desc: this.data.info.title,
      path: '/pages/index/largeIllnessRescue/dripPrayingForBlessing/dripPrayingForBlessing?id='+this.data.info.id
    }
  },
})