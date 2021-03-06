// pages/myDrippingWater/myLaunch/toUpdateDynamic/toUpdateDynamic.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],                              //选择图片的数组，预留。不包含编辑之前的数据，用于组装
    info_type:0,//0=救助详情，1=祈福详情，2=请柬详情
    id: null,//救助项目id/祈福项目Id。
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      id:options.id,
      info_type:options.type,
    });
  },

  //保存更新内容
  bindtapSubmit:function(e){
    var that=this;
    var form={};
    //验证非空
    if (app.checkInput(e.detail.value.description)){
      app.showToast("更新内容不能为空","none");
      return;
    }

    //赋值
    form.description=e.detail.value.description;
    form.id=that.data.id;

    //上传图片
    var imageArray = [];
    if (that.data.arr == null || that.data.arr.length == 0) {
      app.showToast("请上传图片!", "none");
      return;
    } else {
      imageArray = that.data.arr;
    }
    if (imageArray.length > 8) {
      app.showToast("图片最多只能上传8张!", "none");
      return;
    }

    //提示
    app.showToast('保存', 'loading');

    //上传图片数组
    uploadimg(imageArray.splice(0, 1), [], imageArray);
    //多张图片上传
    function uploadimg(path, pathArr, dataArr) {
      wx.uploadFile({
        url: app.config.dszjPath_web + "api/UserSeriousIllness/uploadDynamicPicture",//上传动态图片 开发者服务器 url
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
            if (dataArr.length > 0) {
              //递归
              uploadimg(dataArr.splice(0, 1), pathArr, dataArr);
            } else {
              form.pictures= pathArr;
              //调用请求,提交
              that.reqSetData(form);
            }
          }
        }
      });
    }
  },

  //发送请求，保存
  reqSetData: function (form){
    var that=this;
    var url = app.config.dszjPath_web + 'api/UserSeriousIllness/addDynamic';
    //是否是请柬
    if (that.data.info_type == 2){
      //新增请柬动态
      url = app.config.dszjPath_web +"api/UserInvitation/addDynamic";
    }
    wx.request({
      url: url,
      header:{
        Token:wx.getStorageSync('token')
      },
      data: form,
      method:"POST",
      success:function(res){
        console.log(res);
        if(res.data.code == 0){
          app.showModal(res.data.msg);
          return;
        }
        //跳转到详情
        if (that.data.info_type == 0){
          //救助详情
          wx.navigateTo({
            url: '/pages/dripLove/rescueDetails/rescueDetails?id='+that.data.id,
          })
        }else if(that.data.info_type == 1){
          //祈福详情
          wx.navigateTo({
            url: '/pages/index/largeIllnessRescue/dripPrayingForBlessing/dripPrayingForBlessing?id=' + that.data.id,
          })
        } else if (that.data.info_type == 2) {
          //请柬详情
          wx.navigateTo({
            url: '/pages/index/largeIllnessRescue/dripPrayingForBlessing/dripPrayingForBlessing?id=' + that.data.id,
          })
        }
      }
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
    return false;
  },

  //获取 图片
  chooseImage: function (e) {
    var that = this;
    if (that.data.arr.length >= 8) {
      //弹出提示
      wx.showModal({
        content: '最多只能上传8张图片！',
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
        if (imglength > 8) {
          //弹出提示
          wx.showModal({
            content: '总共只能上传8张图片！',
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