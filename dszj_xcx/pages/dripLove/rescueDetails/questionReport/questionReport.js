// pages/dripLove/rescueDetails/questionReport/questionReport.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,//id
    files: [],                            //选择图片的数组，原始。包含完整的图片url，以及现在编辑数据，用于预览
    arr: [],                              //选择图片的数组，预留。不包含编辑之前的数据，用于组装
    isAgree: false,
    imageArray: [],                       //图片数组，原始。不包含完整url，用于储存

    form:{                                //表单
      id:null,//	Int项目Id。
      name:null,//	String	真实姓名。
      mobile:null,	//String	手机号。
      identityCard:null,//	String	身份证号。
      description:null,//	String	举报理由。
      pictures:null,// 選項	Array举报图片集合。
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({id:options.id,});
  },

  // 新增举报记录
  setAddDoubt:function(e){
    var that=this;

    //验证是否为空
    if (app.checkInput(e.detail.value.name)){
      app.showToast("真实姓名不能为空!","none");
      return;
    }
    if(app.checkInput(e.detail.value.mobile)){
      app.showToast("手机号不能为空!","none");
      return;
    }
    if(app.checkInput(e.detail.value.identityCard)){
      app.showToast("身份证号码不能为空!","none");
      return;
    }
    if(app.checkInput(e.detail.value.description)){
      app.showToast("举报理由不能为空！","none");
      return;
    }

    //赋值
    that.data.form={
      id:that.data.id,
      name: e.detail.value.name,//	String	真实姓名。
      mobile: e.detail.value.mobile,	//String	手机号。
      identityCard: e.detail.value.identityCard,//	String	身份证号。
      description: e.detail.value.description,//	String	举报理由。
    }

    //上传图片
    if(!app.checkInput(that.data.arr)){
      //提示
      app.showToast("请求中..","loading");

      var imageArray=that.data.arr;

      //上传图片数组
      uploadimg(imageArray.splice(0, 1), [], imageArray);
      //多张图片上传
      function uploadimg(path, pathArr, dataArr) {
        wx.uploadFile({
          url: app.config.dszjPath_web + "api/UserSeriousIllness/uploadDoubtPicture",   //上传举报图片url
          filePath: path[0],                          //要上传文件资源的路径
          name: 'file',                                //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
          header: {                                   //HTTP 请求 Header , header 中不能设置 Referer
            Token: wx.getStorageSync("token"),
          },
          formData: null,                             //参数(HTTP 请求中其他额外的 form data)
          success: (resp) => {                         //接口调用成功的回调函数

            var json = JSON.parse(resp.data);
            //验证状态
            app.btnLogin(json.code);

            pathArr.push(json.data[0].url);
            if (dataArr.length > 0) {
              //递归
              uploadimg(dataArr.splice(0, 1), pathArr, dataArr);
            } else {
              that.data.form.pictures=pathArr.join(",");
              //调用请求发布
              that.reqSetData(that);
            }
          }
        });
      }
    }else{
      //调用请求发布
      that.reqSetData(that);
    }

  },

  //发s请求
  reqSetData: function (that) {
    var that = this;
    //url
    var url = app.config.dszjPath_web + "api/UserSeriousIllness/addDoubt";
    //请求头
    var header = {
      Token: wx.getStorageSync("token")
    }
    //参数
    var data = that.data.form;

    //发送请求
    app.request.reqPost(url, header, data, function (res) {
      console.log(res);
      that.setData({
        form:{},
        arr:null
      });

      app.showToast("感谢您的举报!","success");

      //返回上一页
      //得到打开的页面
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];  //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面
      //返回上一页
      wx.navigateBack();

    }, function (res) {
      console.log(res);
    })
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
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var imglength = res.tempFilePaths.length + that.data.files.length;
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
      urls: this.data.arr // 需要预览的图片http链接列表
    })
  },
})