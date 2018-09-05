// pages/myDrippingWater/myLaunch/myLaunch.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["救助项目", "祈福项目"],   //tab菜单列
    activeIndex: 0,         //tab切换下标
    sliderOffset: 0,        //坐标x
    sliderLeft: 0,          //坐标y

    dsqz_list:[],//救助项目
    qf_list:[],//祈福项目

    imgPath: app.config.domain,//图片路径,本地

    //分页参数
    pageSize:10,
    pageIndex:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //请求获取我的滴水救助编辑数据，
    that.getQiuzhuInfo(that);


    //设置tab
    var sliderWidth = 50;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  //获取祈福分页列表
  getQF_PrayPaging: function (that) {
    wx.request({
      url: app.config.dszjPath_web + 'api/UserPray/paging',
      method: "GET",
      header: {
        Token: wx.getStorageSync("token")
      },
      data: {
        "pageSize": that.data.pageSize,
        "pageIndex": that.data.pageIndex
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == "401") {
          //验证状态
          app.btnLogin(res.data.code);
          return;
        }else{
          var pageList = that.data.qf_list;
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
              if (list[i].avatar.indexOf("http") == -1) {
                list[i].avatar = app.config.domain + list[i].avatar;
              }
            }
            //添加到当前数组
            pageList.push(list[i]);
          }

          //设置数据，提示框
          that.setData({
            qf_list: pageList
          });
        }
      }
    })
  },

  //请求获取我的滴水救助编辑数据，
  getQiuzhuInfo: function (that) {
    //url
    var url = app.config.dszjPath_web + "api/UserSeriousIllness/paging";
    //参数
    var data = {
      "pageSize": that.data.pageSize,
      "pageIndex": that.data.pageIndex
    }
    //请求头
    var header={
      Token:wx.getStorageSync("token")
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

  //tab点击切换
  tabClick: function (e) {
    //当前
    var that = this;
    that.data.pageSize = 10;
    that.data.pageIndex = 1;
    var name = e.currentTarget.dataset.name;
    //判断tab
    if (name == "救助项目") {
      //请求获取滴水救助数据，
      that.getQiuzhuInfo(that);
    } else if (name == "祈福项目") {
      //获取祈福分页列表
      that.getQF_PrayPaging(that);
    }

    //设置
    that.setData({
      dsqz_list: [],               //滴水救助数据
      qf_list: [],                 //滴水祈福  
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    });
  },

})