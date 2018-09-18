// pages/myDrippingWater/dripInvitation/dirpInvitationUpdate/dirpInvitationUpdate.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    domian:app.config.domian,
    form:{
      id:null,
      title: null,
      content: null,
      name: null,
      telephone: null,
      address: null,
      pictures: [],
      del_pictures:[],
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id:options.id,//请柬id
    });

    //获取请柬详情
    that.getlvitationPressentDetail(that);
  },
  
  //获取请柬编辑详情
  getlvitationPressentDetail:function(that){
    wx.request({
      url: app.config.dszjPath_web +'api/UserInvitation/detail',
      method:"POST",
      header:{
        Token:wx.getStorageSync("token")
      },
      data:{
        id:that.data.id,
      },
      success:function(res){
        console.log(res);
        if(res.data.code==0){
          app.showModal(res.data.msg);
          return;
        }

        that.setData({
          qj_detail:res.data.data,
          imageArr: res.data.data.pictures
        });
      }
    })
  },

  //发请柬
  bindtapSubmit: function (e) {
    var that = this;
    //验证非空
    if (app.checkInput(e.detail.value.title)) {
      app.showToast("标题不能为空!", "none");
      return;
    }
    if (app.checkInput(e.detail.value.content)) {
      app.showToast("请柬内容不能为空!", "none");
      return;
    }
    if (app.checkInput(e.detail.value.name)) {
      app.showToast("姓名不能为空!", "none");
      return;
    }
    if (app.checkInput(e.detail.value.telephone)) {
      app.showToast("电话不能为空!", "none");
      return;
    }
    if (app.checkInput(e.detail.value.address)) {
      app.showToast("地址不能为空!", "none");
      return;
    }

    //提示
    app.showToast('正在保存', 'loading');
    var imageArray = that.data.arr;
    if (!app.checkInput(imageArray)) {
      //上传图片数组
      uploadimg(imageArray.splice(0, 1), [], imageArray);
    } else {
      //调用请求,保存
      that.reqSetData(e, null);
    }
    var pictures = that.data.imageArr;

    //多张图片上传
    function uploadimg(path, pathArr, dataArr) {
      wx.uploadFile({
        url: app.config.dszjPath_web + "api/UserInvitation/uploadPicture",//上传请柬图片 开发者服务器 url
        filePath: path[0],                          //要上传文件资源的路径
        name: 'file',                                //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
        header: {                                   //HTTP 请求 Header , header 中不能设置 Referer
          Token: wx.getStorageSync("token"),
        },
        formData: null,                             //参数(HTTP 请求中其他额外的 form data)
        success: (resp) => {                         //接口调用成功的回调函数

          var json = JSON.parse(resp.data);
          if (resp.data.code == "401") {
            //验证状态
            app.btnLogin(json.code);

          } else {
            pathArr.push(json.data[0].url);
            pictures.push(json.data[0].url);
            if (dataArr.length > 0) {
              //递归
              uploadimg(dataArr.splice(0, 1), pathArr, dataArr);
            } else {
              //调用请求,保存
              that.reqSetData(e, pictures);
            }
          }
        }
      });
    }
  },

  //请求
  reqSetData: function (e, pictures) {
    var that=this;
    //请求
    wx.request({
      url: app.config.dszjPath_web + 'api/UserInvitation/edit',
      method: "POST",
      header: {
        Token: wx.getStorageSync('token')
      },
      data: {
        id:that.data.id,
        title: e.detail.value.title,
        content: e.detail.value.content,
        name: e.detail.value.name,
        telephone: e.detail.value.telephone,
        address: e.detail.value.address,
        pictures: pictures,
        del_pictures: that.data.form.del_pictures
      },
      success: function (res) {
        console.log(res);
        app.showToast(res.data.msg, "none");
        if (res.data.code == 1) {
          wx.navigateBack();
        }
      }
    });
  },

  //删除图片，之前的
  bindtapImageDelete_edit: function (e) {
    var that = this;
    var img = e.currentTarget.dataset.img;
    var imageArr = that.data.imageArr;
    var form = that.data.form;

    for (var j = 0; j < imageArr.length; j++) {
      if (imageArr[j] == img) {
        var path = imageArr[j];
        form.del_pictures.push(imageArr[j]);
        imageArr.splice(j, 1);

        that.setData({
          form: form,
          imageArr: imageArr,
        });
        return;
      }
    }
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
      urls: this.data.arr // 需要预览的图片http链接列表
    })
  },
})