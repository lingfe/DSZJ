// pages/myDrippingWater/myLaunch/rescueEdit/rescueEdit.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],                              //选择图片的数组，预留。不包含编辑之前的数据
    imageArr: [],//包含编辑之前的数据
    id: null,//救助项目id
    imgPath:app.config.domain,//图片路径
    
    //编辑表单
    form:{
      id:null,//	String	项目Id。
      total_amount:null,//	String	目标金额。
      title:null,//	String	筹款标题。
      description:null,//	String救助说明。
      new_pictures:[],// 選項	Array	新增图片列表。
      del_pictures:[],// 選項	Array	删除图片列表。
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id,
    });

    //根据id得到救助项目详情
    that.getWhereId(that);
  },

  //根据id得到救助项目详情
  getWhereId:function(that){
    wx.request({
      url: app.config.dszjPath_web +'api/UserSeriousIllness/detail',
      method:"GET",
      header:{
        Token:wx.getStorageSync("token")
      },
      data:{
        id:that.data.id,
      },
      success:function(res){
        console.log(res);
        //处理图片路径
        var imageArr=[];
        var pictures = res.data.data.pictures;

        //保存
        that.setData({
          form:{
            id: res.data.data.id,//	String	项目Id。
            total_amount: res.data.data.total_amount,//	String	目标金额。
            title: res.data.data.title,//	String	筹款标题。
            description: res.data.data.description,//	String救助说明。
            new_pictures: [],// 選項	Array	新增图片列表。
            del_pictures: [],// 選項	Array	删除图片列表。
          },
          imageArr: pictures
        });
      }
    })

  },

  //编辑救助项目
  bindtapSubmit:function(e){
    var that=this;
    //验证非空
    if (app.checkInput(e.detail.value.total_amount)){
      app.showToast("目标金额不能为空!","none");
      return;
    }
    if(app.checkInput(e.detail.value.title)){
      app.showToast("标题不能为空!","none");
      return;
    }
    if (app.checkInput(e.detail.value.description)){
      app.showToast("求助说明不能为空!","none");
      return;
    }
    
    //验证，上传图片
    var length = that.data.arr.length + that.data.imageArr.length;
    if (length == 0) {
      app.showToast("请上传图片!", "none");
      return;
    }
    if (length > 8) {
      app.showToast("图片最多只能上传8张!", "none");
      return;
    }
    
    //提示
    app.showToast('保存中..', 'loading');

    var imageArray=that.data.arr;
    if (imageArray.length != 0) {
      //上传图片数组
      uploadimg(imageArray.splice(0, 1), [], imageArray);
    }
    //多张图片上传
    function uploadimg(path, pathArr, dataArr) {
      wx.uploadFile({
        url: app.config.dszjPath_web + "api/UserSeriousIllness/uploadPicture",//上传救助项目图片 开发者服务器 url
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
              that.data.form.new_pictures = pathArr;
              //调用请求,提交
              that.reqSetData(that);
            }
          }
        }
      });
    }
  },

  //发送请求，保存编辑
  reqSetData: function (that) {
    wx.request({
      url: app.config.dszjPath_web + 'api/UserSeriousIllness/edit',
      header: {
        Token: wx.getStorageSync('token')
      },
      data: that.data.form,
      method: "POST",
      success: function (res) {
        console.log(res);
      }
    });
  },

  //删除图片，选择的
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

   //删除图片，之前的
  bindtapImageDelete_edit: function (e) {
    var that = this;
    var id=e.currentTarget.id;
    var imageArr = that.data.imageArr;
    var form = that.data.form;

    for (var j = 0; j < imageArr.length; j++) {
      if (imageArr[j].id == id) 
      {
        var path=imageArr[j].pic;
        form.del_pictures.push({
          id:id,
          pic:path,
        });
        imageArr.splice(j, 1);

        that.setData({
          form: form,
          imageArr: imageArr,
        });
        return;
      }
    }
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