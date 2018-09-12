// pages/dripLove/thankGuys/thankGuysIn/thankGuyslnDetails/thankGuyslnDetails.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: app.config.domain,
    //分页参数
    pageSize: 10,
    pageIndex: 1,
    comment_List: [],

    isTextarea: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var is_from_seriousIllness=0;
    if(!app.checkInput(options.yes)){
      is_from_seriousIllness=options.yes
    }
    that.setData({ id: options.id, is_from_seriousIllness: is_from_seriousIllness });

    //获取文章详情
    that.geDetail(that);
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
      huifu_id: e.id,
      isTextarea: true,
    });
  },

  //评论或回复
  setCommentHuifu_to: function (e) {
    var that = this;
    //验证非空
    if (app.checkInput(e.detail.value.content)) {
      app.showToast("评论内容不能为空!", "none");
      return;
    }

    //发起请求
    wx.request({
      url: app.config.dszjPath_web + 'api/UserPost/comment',
      method: "POST",
      header: {
        Token: wx.getStorageSync("token")
      },
      data: {
        id: that.data.info.id,
        commentId: that.data.huifu_id,
        content: e.detail.value.content,
      },
      success: function (res) {
        if (res.data.code == "401") {
          //验证状态
          app.btnLogin(res.data.code);
        } else {
          app.showModal(res.data.msg);
          //获取文章评论分页列表
          that.getPostComment(that);
        }
      }
    })
  },

  //获取文章评论分页列表
  getPostComment: function (that) {
    wx.request({
      url: app.config.dszjPath_web + 'api/PostComment/paging',
      method: "GET",
      header: {
        Token: wx.getStorageSync("token")
      },
      data: {
        id: that.data.info.id,
        //分页参数
        pageSize: that.data.pageSize,
        pageIndex: that.data.pageIndex
      },
      success: function (res) {
        console.log(res);
        var pageList = that.data.comment_List;
        //非空
        if(app.checkInput(res.data.data)){
          return;
        }

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
          comment_List: pageList,
        });

      }
    })
  },

  //获取文章详情
  geDetail: function (that) {
    wx.request({
      url: app.config.dszjPath_web + 'api/Post/detail',
      method: "GET",
      header: {
        Token: wx.getStorageSync("token")
      },
      data: {
        id: that.data.id,
        is_from_seriousIllness: that.data.is_from_seriousIllness,//是否是救助项目的文章。
      },
      success: function (res) {
        console.log(res);

        var info = res.data.data;

        //验证是否为空
        if(app.checkInput(info)){
          //跳转到新增,id=项目id
          wx.navigateTo({
            url: '/pages/dripLove/thankGuys/thankGuysIn/publishThank/publishThank?pid='+that.data.id,
          });
          return;
        }

        if (!app.checkInput(info.avatar)) {
          //匹配是否包含http://
          if (info.avatar.indexOf("http") == -1) {
            info.avatar = app.config.domain + info.avatar;
          }
        }

        that.setData({
          info: info,
        });

        //获取文章评论分页列表
        that.getPostComment(that);
      }
    })
  },

  //用户下拉动作
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      pageIndex: 1,         //所在页页码，从1开始
      list: [],
    });
    //获取文章评论分页列表
    that.getPostComment(that);

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

    //获取文章评论分页列表
    that.getPostComment(that);
    //提示
    wx.showToast({
      title: '正在加载..',
      icon: 'loading',
      duration: 2000,
    });
  },

})