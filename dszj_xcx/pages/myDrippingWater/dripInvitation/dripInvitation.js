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

    list:[],

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
    that.getUserInvitationPaging(that);

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

  //申请提现
  setApplicationForPresentation:function(e){
    var that=this;

    //验证非空
    if (app.checkInput(e.detail.value.card_name)){
      app.showToast("姓名不能为空!","none");
      return;
    }
    if(app.checkInput(e.detail.value.sfz)){
      app.showToast("身份证不能为空!","none");
      return;
    }
    if (app.checkInput(e.detail.value.bank)){
      app.showToast("请输入开户银行!","none");
      return;
    }
    if (app.checkInput(e.detail.value.card_no)){
      app.showToast("银行卡号不能为空!","none");
      return;
    }
    if (app.checkInput(e.detail.value.money)){
      app.showToast("金额不能为空!",none);
      return;
    }

    //发送请求
    wx.request({
      url: app.config.dszjPath_web +'api/UserInvitationWithdraw/apply',
      method:"POST",
      header:{
        Token:wx.getStorageSync("token")
      },
      data:{
        id:e.detail.value.id,//请柬id
        days: e.detail.value.days,//提现还需等待N天。
        card_name: e.detail.value.card_name,//姓名
        sfz:e.detail.value.sfz,//身份证
        mobile:e.detail.value.mobile,//电话号码
        bank:e.detail.value.bank,//开户银行
        other_bank:e.detail.value.other_bank,//其他银行
        bank_address: e.detail.value.bank_address,//开户行地址
        card_no:e.detail.value.card_no,//卡号
        money:e.detail.value.money,//金额
      },
      success:function(res){
        console.log(res);
        app.showModal(res.data.msg);
      }
    })
  },


  //获取用户礼单分页列表
  getUserInvitationPresentPaging:function(that){
    wx.request({
      url: app.config.dszjPath_web + 'api/UserInvitationPresent/paging',
      method: "GET",
      header: {
        Token: wx.getStorageSync("token")
      },
      data: {
        type: that.data.type,//0(线上礼单)，1(线下礼单)
        "pageSize": that.data.pageSize,
        "pageIndex": that.data.pageIndex
      },
      success: function (res) {
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

        that.setData({
          list: pageList
        });
      }
    })
  },

  //请柬提现分页列表
  getListpaging:function(that){
    wx.request({
      url: app.config.dszjPath_web +'api/UserInvitationWithdraw/paging',
      method: "GET",
      header: {
        Token: wx.getStorageSync("token")
      },
      data: {
        "pageSize": that.data.pageSize,
        "pageIndex": that.data.pageIndex
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

        that.setData({
          list: pageList,
          bank: res.data.data.Bank
        });
      }
    })
  },

  //获取请柬总数和总礼金
  getUserInvitationWithdraw:function(that){
    wx.request({
      url: app.config.dszjPath_web +'api/UserInvitationWithdraw/statistics',
      method: "GET",
      header: {
        Token: wx.getStorageSync("token")
      },
      success:function(res){
        that.setData({
          count:res.data.data.count,
          amount:res.data.data.amount
        });
      }
    })
  },

  //选择银行卡
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //获取请柬分页列表
  getUserInvitationPaging: function (that) {
    wx.request({
      url: app.config.dszjPath_web + 'api/UserInvitation/paging',
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

          //设置数据，提示框
          that.setData({
            list: pageList
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
      //获取请柬分页列表
      that.getUserInvitationPaging(that);
    }
    else if(name=="线上礼单"){
      //获取用户礼单分页列表
      that.data.type = 0;
      that.getUserInvitationPresentPaging(that);
    }
    else if(name=="线下礼单"){
      //获取用户礼单分页列表
      that.data.type=1;
      that.getUserInvitationPresentPaging(that);
    }
    else if( name == "礼金提现"){
      //提示
      wx.showModal({
        title: '提现须知',
        
        content: '1.请正确填写银行卡信息，务必认真核对，否则影响打款。\n2.提现审核需要进行身份验证，请务必保证资料齐全无误，否则影响提现进度。\n3.礼金7-30天内可申请1次50%以内的紧急提现，30天后可申请剩余金额100%提现，为保障资金安全，请尽量自行申请提现。\n4.提现审核通过后，3个工作日打款(周六、周末、节假日除外)，如有疑问请咨询400-6063-400',
      });
      //获取请柬总数和总礼金
      that.getUserInvitationWithdraw(that);
      //请柬提现分页列表
      that.getListpaging(that);
    }

    //设置
    that.setData({
      list: [],               //数据
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  //用户下拉动作
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      pageIndex: 1,         //所在页页码，从1开始
      list: [],
    });

    //验证模块
    if(that.data.activeIndex == 0){
      //获取请柬分页列表
      that.getUserInvitationPaging(that);
    }
    else if (that.data.activeIndex == 1) {
      //获取用户礼单分页列表
      that.data.type = 0;
      that.getUserInvitationPresentPaging(that);
    }
    else if (that.data.activeIndex == 2) {
      //获取用户礼单分页列表
      that.data.type = 1;
      that.getUserInvitationPresentPaging(that);
    }
    else if (that.data.activeIndex == 3){
      //获取请柬总数和总礼金
      that.getUserInvitationWithdraw(that);
      //请柬提现分页列表
      that.getListpaging(that);
    }

    //下拉完成后执行回退
    wx.stopPullDownRefresh();
  },

  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    var that = this;
    var num = that.data.pageIndex;
    num++;
    that.setData({
      pageIndex: num,
    });

    //验证模块
    if (that.data.activeIndex == 0) {
      //获取请柬分页列表
      that.getUserInvitationPaging(that);
    }
    else if (that.data.activeIndex == 1) {
      //获取用户礼单分页列表
      that.data.type = 0;
      that.getUserInvitationPresentPaging(that);
    }
    else if (that.data.activeIndex == 2) {
      //获取用户礼单分页列表
      that.data.type = 1;
      that.getUserInvitationPresentPaging(that);
    }
    else if (that.data.activeIndex == 3) {
      //获取请柬总数和总礼金
      that.getUserInvitationWithdraw(that);
      //请柬提现分页列表
      that.getListpaging(that);
    }
    //提示
    wx.showToast({
      title: '正在加载..',
      icon: 'loading',
      duration: 2000,
    });
  },

})