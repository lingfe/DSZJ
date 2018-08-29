// pages/dripLove/rescueDetails/taHepl/taHepl.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,                //救助项目id
    pageSize: 10,            //每页显示的记录数量。
    pageIndex: 1,            //所在页页码，从1开始。
    list_hepl: [],           //ta的所以帮助信息  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({ id: options.id,});
    //分页获取他的帮助
    that.getTaHepl(that);
  },

  //分页获取他的帮助
  getTaHepl:function(that){
    //请求地址
    var url = app.config.dszjPath_web +"api/SeriousIllness/raiseFunds";
    //参数
    var data={
      id:that.data.id,
      "pageSize": that.data.pageSize,
      "pageIndex": that.data.pageIndex
    }
    //请求头
    var header={
      Token:wx.getStorageSync("token")
    }

    //发送请求
    app.request.request(url,"get",header,data,function(res){
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
        if(list[i].is_show == 1){
          //添加到当前数组
          pageList.push(list[i]);
        }
      }
      //设置数据，提示框
      that.setData({
        list_hepl: pageList
      });
    },function(res){

    },function(res){

    });
  },

  //用户下拉动作
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      pageIndex: 1,         //所在页页码，从1开始。
      list_hepl: []         //ta的所以帮助信息       
    });
    //分页获取他的帮助
    that.getTaHepl(that);
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
    //分页获取他的帮助
    that.getTaHepl(that);

    //提示
    wx.showToast({
      title: '正在加载..',
      icon: 'loading',
      duration: 2000,
    });
  },
})