// pages/dripLove/thankGuys/thankGuysIn/publishThank/publishThank.js
var app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    files: [],                            //选择图片的数组，原始。包含完整的图片url，以及现在编辑数据，用于预览
    arr: [],                              //选择图片的数组，预留。不包含编辑之前的数据，用于组装
    domain: app.config.domain,            //图片地址
    isAgree: false,

    imageArray: [],                       //图片数组，原始。不包含完整url，用于储存
    num: 0,
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var that = this;
    if (!app.checkInput(options.pid)) {
      that.setData({ pid: options.pid });
    }

    //获取新增文章项目详情
    that.getSeriousIllness(that);
  },

  //获取新增文章项目详情
  getSeriousIllness:function(that){
    wx.request({
      url: app.config.dszjPath_web+'api/UserPost/getSeriousIllness',
      method:"GET",
      header:{
        Token:wx.getStorageSync("token")
      },
      data:{
        id:that.data.pid,
      },
      success:function(res){
        console.log(res);
        that.setData({
          info:res.data.data
        });
      }
    })
  },

  //确定发表
  bindtapSubmit: function (e) {
    var that = this;
    var form = {};
    //验证非空
    if (app.checkInput(e.detail.value.title)) {
      app.showToast("标题不能为空!", "none");
      return;
    }
    if (app.checkInput(e.detail.value.content)) {
      app.showToast("请输入内容", "none");
      return;
    } else {
      form.type = 2;//发表感谢
      //验证项目id是否为空
      if(!app.checkInput(that.data.pid)){
        form.pid=that.data.pid;
      }
      form.title = e.detail.value.title;
      form.content = e.detail.value.content;
    }

    //上传图片
    var imageArray = [];
    if (that.data.arr == null || that.data.arr.length == 0) {
      app.showToast("请上传图片!", "none");
      return;
    } else {
      imageArray = that.data.arr;
    }
    if (imageArray.length > 6) {
      app.showToast("图片最多只能上传六张!", "none");
      return;
    }

    //提示
    app.showToast('正在保存', 'loading');

    //上传图片数组
    uploadimg(imageArray.splice(0, 1), [], imageArray);
    //多张图片上传
    function uploadimg(path, pathArr, dataArr) {
      wx.uploadFile({
        url: app.config.dszjPath_web + "api/UserPost/uploadPicture",//上传文章图片 开发者服务器 url
        filePath: path[0],                          //要上传文件资源的路径
        name: 'file',                                //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
        header: {                                   //HTTP 请求 Header , header 中不能设置 Referer
          Token: wx.getStorageSync("token"),
        },
        formData: null,                             //参数(HTTP 请求中其他额外的 form data)
        success: (resp) => {                         //接口调用成功的回调函数
          var json = JSON.parse(resp.data);
          if (json.code == "401") {
            //验证状态
            app.btnLogin(json.code);
          } else {
            pathArr.push(json.data[0].url);
            if (dataArr.length > 0) {
              //递归
              uploadimg(dataArr.splice(0, 1), pathArr, dataArr);
            } else {
              form.pictures = pathArr;
              //调用请求,保存
              that.reqSetData(form);
            }
          }
        }
      });
    }
  },

  //调用请求,保存
  reqSetData: function (form) {
    var that = this;
    wx.request({
      url: app.config.dszjPath_web + 'api/UserPost/add',
      method: "POST",
      header: {
        Token: wx.getStorageSync("token")
      },
      data: form,
      success: function (res) {
        console.log(res);
        app.showToast(res.data.msg, "none");

        //返回上一页
        wx.navigateBack();
      }
    })
  },

  //获取值
  dataChange: function (e) {
    this.setData({
      num: e.detail.value.length,
      teamIntroduction: e.detail.value
    });
  },

  //删除图片
  bindtapImageDelete: function (e) {
    var img = e.currentTarget.dataset.img;
    var that = this;
    var arr = that.data.arr;

    for (var j = 0; j < arr.length; j++) {
      if (arr[j] == img) {
        arr.splice(j, 1);
      }
    }

    that.setData({
      arr: arr,
    });
  },

  //获取 图片
  chooseImage: function (e) {
    var that = this;
    if (that.data.files.length >= 6) {
      //弹出提示
      wx.showModal({
        content: '最多只能上传6张图片！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          }
        }
      });
      return;
    }
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var imglength = res.tempFilePaths.length + that.data.files.length;
        if (imglength > 6) {
          //弹出提示
          wx.showModal({
            content: '总共只能上传6张图片！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
              }
            }
          });
          return;
        }
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths),
          arr: that.data.arr.concat(res.tempFilePaths)
        });
      }
    })
  },

  //图片预览
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
})