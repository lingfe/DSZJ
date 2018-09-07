// pages/myDrippingWater/dripInvitation/dripInvitation.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["滴水请柬", "线上礼单", "线下礼单", "礼金提现"],   //tab菜单列
    activeIndex: 0,         //tab切换下标
    sliderOffset: 0,        //坐标x
    sliderLeft: 0,          //坐标y
    imgPath: app.config.domain,//图片地址

    pageSize: 10,            //每页显示的记录数量。
    pageIndex: 1,              //所在页页码，从1开始。

    qf_list:[],

    index: 0,
    bankArr: [
      "贵阳银行", "农业银行",
      "其他银行"
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取祈福分页列表
    that.getQF_PrayPaging(that);

    //验证非空
    if (!app.checkInput(options.activeIndex)) {
      that.data.activeIndex = options.activeIndex;
    }
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

  //选择银行卡
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
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
        } else {
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


  //tab点击切换
  tabClick: function (e) {
    //当前
    var that = this;
    that.data.pageSize = 10;
    that.data.pageIndex = 1;
    var name = e.currentTarget.dataset.name;
    //判断tab
    if (name == "滴水请柬") {
      that.getQF_PrayPaging(that);
    } else if( name == "礼金提现"){
      //提示
      wx.showModal({
        title: '提现须知',
        
        content: '1.请正确填写银行卡信息，务必认真核对，否则影响打款。\n2.提现审核需要进行身份验证，请务必保证资料齐全无误，否则影响提现进度。\n3.礼金7-30天内可申请1次50%以内的紧急提现，30天后可申请剩余金额100%提现，为保障资金安全，请尽量自行申请提现。\n4.提现审核通过后，3个工作日打款(周六、周末、节假日除外)，如有疑问请咨询400-6063-400',
      })
    }

    //设置
    that.setData({
      dsqz_list: [],               //滴水救助数据
      mutuaAid_list: [],         //滴水互助数据   
      qf_list: [],                 //滴水祈福  
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
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