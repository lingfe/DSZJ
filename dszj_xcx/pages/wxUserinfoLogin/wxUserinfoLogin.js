/**  
 *   作者:  lingfe 
 *   时间:  2017-7-26
 *   描述:  微信登录
 * 
 * */
var app=getApp();

Page({

  data:{
    userInfo:{}
  },
  //用户手机号码
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  } ,

  //获取用户信息,button
  getUserInfo: function (e) {
    var that=this;
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    //保存到缓存
    wx.setStorageSync("userInfo", e.detail.userInfo);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    //1.请求登陆
    //调用登录接口
    wx.login({
      success: function (logRes) {
        //url 获取用户信息以及openid,http://192.168.3.4:8020/api/UserLogin/wechatLogin
        var url = app.config.dszjPath_web+'api/UserLogin/wechatLogin';
        console.log(logRes);
        //参数
        var data = {
          code: logRes.code,
          userInfo: e.detail.userInfo,
          
        }
        //请求头
        //var header = { "Content-Type": "application/x-www-form-urlencoded" };

        //发送请求
        app.request.reqGet(url,  data,
        function(res){
          console.log(res);
          //得到token
          var token = res.data.data.token;
          //储存到app
          app.token = token;
          //存到缓存中
          wx.setStorageSync("token", app.token);
          
          //返回上一页
          //得到打开的页面
          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];  //当前页面
          var prevPage = pages[pages.length - 2]; //上一个页面
          //返回上一页
          wx.navigateBack();

        },function (res) {
          console.log(res);
        });
      }, fail: function (res) {
        console.log(res);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that= this;
  },
})