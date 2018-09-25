// pages/myDrippingWater/dripInvitation/dripInvitationDetail/dripInvitationDetail.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPath: app.config.domain,
    isTextarea: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({ id: options.id });

    //获取滴水请柬详情
    that.getUserPrayDetail(that);
    //奉上礼金状态
    that.getRrecordPaging(that);
  },

  //失去焦点
  blurBtndtap: function (e) {
    this.setData({
      isTextarea: false,
    });
  },

  //点击回复者,得到焦点也触发
  huifuBtndtap: function (e) {
    this.setData({
      huifu_id: e.currentTarget.id,
      isTextarea: true,
    });
  },

  //评论请柬
  setCommentHuifu: function (e) {
    var that = this;
    //验证非空
    if (app.checkInput(e.detail.value.content)) {
      app.showToast("评论内容不能为空!", "none");
      return;
    }

    //发起请求
    wx.request({
      url: app.config.dszjPath_web + 'api/UserInvitation/comment',
      method: "POST",
      header: {
        Token: wx.getStorageSync("token")
      },
      data: {
        id: that.data.id,
        type: 1,//1(请柬礼单), 2(请柬发起), 3(请柬动态)
        sub_id: that.data.huifu_id,
        content: e.detail.value.content,
      },
      success: function (res) {
        if (res.data.code == 0) {
          app.showModal(res.data.msg);
          return;
        }
        if (res.data.code == "401") {
          //验证状态
          app.btnLogin(res.data.code);
          return;
        } else {
          app.showModal(res.data.msg);
          //奉上礼金状态
          that.getRrecordPaging(that);
        }
      }
    })
  },

  //跳转到感谢亲们页面
  bindTab_GXQM: function () {
    wx.navigateTo({
      url: '/pages/dripWaterRescue/customerService/customerService',
    })
  },

  //奉上礼金状态
  getRrecordPaging: function (that) {
    wx.request({
      url: app.config.dszjPath_web + 'api/InvitationPresent/paging',
      method: "POST",
      header: {
        Token: wx.getStorageSync("token")
      },
      data: {
        id: that.data.id,
        pageIndex: 1,
        pageSize: 10,
      },
      success: function (res) {
        console.log(res);
        that.setData({
          paging_list: res.data.data.Records
        });
      }
    })
  },

  //获取滴水请柬详情
  getUserPrayDetail: function (that) {
    //url
    var url = app.config.dszjPath_web + "api/Invitation/detail";
    //请求头
    var header = {
      Token: wx.getStorageSync("token")
    }
    //参数
    var data = {
      id: that.data.id
    }

    //发起请求
    wx.request({
      url: url,
      header: header,
      data: data,
      method: "GET",
      success: function (res) {
        console.log(res);
        that.setData({
          info: res.data.data
        });
      }
    })
  },

  //分享
  onShareAppMessage: function (e) {
    return {
      title: '滴水请柬',
      desc: this.data.info.title,
      path: '/pages/myDrippingWater/dripInvitation/dripInvitationDetail/dripInvitationDetail?id=' + this.data.info.id
    }
  },
})