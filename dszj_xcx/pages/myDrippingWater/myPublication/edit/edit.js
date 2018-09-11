// pages/myDrippingWater/myPublication/edit/edit.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],                              //选择图片的数组，预留。不包含编辑之前的数据
    imageArr: [],//包含编辑之前的数据
    num: 0,
    id:null,//id
    imgPath: app.config.domain,//图片路径,本地
    
    //表单
    form:{
      id:null,
      title:null,//标题
      content:null,//内容
      pictures:[],//文章图片
      del_pictures: [],//删除图片列表。
    }
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var that=this;
    that.setData({
      id:options.id,
    });

    //根据id得到详情
    that.getWhereId(that);
  },

  //根据id得到详情
  getWhereId: function (that) {
    wx.request({
      url: app.config.dszjPath_web + 'api/Post/detail',
      method: "GET",
      header: {
        Token: wx.getStorageSync("token")
      },
      data: {
        id: that.data.id,
        is_from_seriousIllness: 0,
      },
      success: function (res) {
        console.log(res);
        var info = res.data.data;
        if (!app.checkInput(info.avatar)) {
          //匹配是否包含http://
          if (info.avatar.indexOf("http://") == -1) {
            info.avatar = app.config.domain + info.avatar;
          }
        }

        //保存
        that.setData({
          info: info,
          form:{
            title:info.title,
            content:info.content,
            pictures: [],//文章图片
          },
          imageArr: info.pictures
        });

      }
    })

  },

  //确定编辑
  bindtapSubmit: function (e) {
    var that = this;
    var form = that.data.form;
    //验证非空
    if (app.checkInput(e.detail.value.title)) {
      app.showToast("标题不能为空!", "none");
      return;
    }
    if (app.checkInput(e.detail.value.content)) {
      app.showToast("请输入内容", "none");
      return;
    } else {
      form.id=that.data.id;
      form.title = e.detail.value.title;
      form.content = e.detail.value.content;
    }

    //上传图片
    var imageArray = [];
    var length=that.data.arr.length+that.data.imageArr.length;

    if (length == 0) {
      app.showToast("请上传图片!", "none");
      return;
    } else {
      imageArray = that.data.arr;
    }
    if (length > 6) {
      app.showToast("图片最多只能上传六张!", "none");
      return;
    }else{
      //原来，未删除的图片
      form.pictures = that.data.imageArr;
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
            //现在，新增的图片
            form.pictures.push(json.data[0].url);
            if (dataArr.length > 0) {
              //递归
              uploadimg(dataArr.splice(0, 1), pathArr, dataArr);
            } else {
              
              //调用请求,编辑保存
              that.reqSetData(form);
            }
          }
        }
      });
    }
  },

  //调用请求,编辑保存
  reqSetData: function (form) {
    var that = this;
    wx.request({
      url: app.config.dszjPath_web + 'api/UserPost/edit',
      method: "POST",
      header: {
        Token: wx.getStorageSync("token")
      },
      data: form,
      success: function (res) {
        console.log(res);
        app.showToast(res.data.msg, "none");
      }
    })
  },

  //获取值
  dataChange: function (e) {
    this.setData({
      num: e.detail.value.length,
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

  //删除图片，之前的
  bindtapImageDelete_edit: function (e) {
    var that = this;
    var imageArr = that.data.imageArr;
    var img = e.currentTarget.dataset.img;

    for (var j = 0; j < imageArr.length; j++) {
      if (imageArr[j] == img) {
        imageArr.splice(j, 1);
      }
    }

    that.setData({
      imageArr:imageArr,
    })
  },

  //获取 图片
  chooseImage: function (e) {
    var that = this;
    if (that.data.arr.length >= 6) {
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
        var imglength = res.tempFilePaths.length + that.data.arr.length;
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