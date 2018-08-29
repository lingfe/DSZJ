// pages/index/largeIllnessRescue/patientInformation/patientInformation.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      step: 2,                      //Int请求步骤。
      id:0,   //	Int项目id。
      aided_name:null,              //String 真实姓名
      aided_id_type:1,              //	Int证件类型1身份证，2出生证
      aided_id:null,                // 選項	String 证件号（对应aided_id_type=1）
      born_id:null,                 //選項	String	出生证号（对应aided_id_type=2）
      disease:null,                 //	String 所患疾病
      hospital_name:null,           // 選項	String医院名称
      aided_id_pic:null,            // 選項	String身份证照url, 通过图片上传接口获取（对应aided_id_type=1）
      born_id_pic:null,             // 選項	String出生证照url, 通过图片上传接口获取（对应aided_id_type=2）
      hospital_diagnosis_pic:null,  //選項	Json诊断证明照
      hospital_supplement_pic:null, // 選項	Json	诊断补充
    },
    isDisplay_rideo:true,           //默认显示证件号输入，

    files: [],                      //选择图片的数组，原始。包含完整的图片url，以及现在编辑数据，用于预览
    arr: {                          //选择图片的数组，预留。不包含编辑之前的数据，用于组装
      img1:[],    //存身份证照片
      img2:[],    //存出生证明
      img3:[],    //存医疗诊断证明
      img4:[],    //存补充证明
    },                              
    imageArray: [],                 //图片数组，原始。不包含完整url，用于储存
  },

  /**
   * 页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      "form.id": options.id,
    });
  },

  //下一步
  formSubmit:function(e){
    var that=this;
    var arr = that.data.arr;
    //验证是否为空  
    if (!app.checkInput(e.detail.value.aided_name)) {
      that.data.form.aided_name = e.detail.value.aided_name;
    } else {
      app.showToast("真实姓名不能为空!", "none");
      return false;
    }
    if (that.data.form.aided_id_type == 1) {
      if (app.checkInput(e.detail.value.aided_id)) {
        app.showToast("请输入身份证号!", "none");
        return;
      } else {
        that.data.form.aided_id = e.detail.value.aided_id;
      }
    } else {
      if (app.checkInput(e.detail.value.born_id)) {
        app.showToast("请输入出生证号!", "none");
        return;
      } else {
        that.data.form.born_id = e.detail.value.born_id;
      }
    }
    if (app.checkInput(e.detail.value.disease)) {
      app.showToast("请填写所患的疾病名称!", "none");
      return;
    } else {
      that.data.form.disease = e.detail.value.disease;
    }
    that.data.form.hospital_name = e.detail.value.hospital_name;

    if (app.checkInput(that.data.arr.img1)) {
      app.showToast("请选择身份证照片!", "none");
      return;
    }
    if (app.checkInput(that.data.arr.img2)) {
      app.showToast("请选择出生证照片!", "none");
      return;
    }
    if (app.checkInput(that.data.arr.img3)) {
      app.showToast("请上传医疗诊断证明照片!", "none");
      return;
    }
    
    //上传图片
    //提示
    app.showToast("请求中，请稍等..","loading");

    //上传图片数组
    uploadimg(1,arr.img1.splice(0, 1), [], arr);
      
    //多张图片上传
    function uploadimg(j,path, pathArr, dataArr) {
      wx.uploadFile({
        url: app.config.dszjPath_web + "api/UserSeriousIllness/imageUpload",                       //开发者服务器 url
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
          
          //上传身份证照片
          if (j == 1 && dataArr.img1.length > 0) {
            //递归
            uploadimg(1,dataArr.img1.splice(0, 1), pathArr, dataArr);
          } else {
            if (j == 1){
              that.data.form.aided_id_pic = pathArr.join(",");
              pathArr = [];
              j = 2;
            }
          }

          //上传出身证照片
          if (j == 2 && dataArr.img2.length > 0) {
            //递归
            uploadimg(2, dataArr.img2.splice(0, 1), pathArr, dataArr);
          } else {
            if(j==2){
              that.data.form.born_id_pic = pathArr.join(",");
              pathArr = [];
              j = 3;
            }
          }
          
          //上传医疗诊断证明照片
          if (j==3 && dataArr.img3.length > 0) {
            //递归
            uploadimg(3, dataArr.img3.splice(0, 1), pathArr, dataArr);
          } else {
            if(j==3){
              that.data.form.hospital_diagnosis_pic = pathArr.join(",");
              pathArr = [];
              j = 4;
            }
          }

          //上传补充证明照片
          if (j==4 && dataArr.img4.length > 0) {
            //递归
            uploadimg(4, dataArr.img4.splice(0, 1), pathArr, dataArr);
          } else {
            if(j==4){
              that.data.form.hospital_supplement_pic = pathArr.join(",");
              pathArr = [];
              j = 5;
            }
          }

          //是否已经全部上传
          if(j==5){
            that.setData({
              arr:that.data,arr,
              form:that.data.form
            });
            //调用请求发布
            that.reqSetData(that);
          }
        }
      });
    }
  },

  //调用请求发布
  reqSetData:function(that){
    //请求地址url
    var url = app.config.dszjPath_web + "api/UserSeriousIllness/add";
    //请求头
    var header = {
      Token: wx.getStorageSync("token")
    }
    //参数
    var data = that.data.form;

    //发起请求
    app.request.reqPost(url, header, data, function (res) {
      console.log(res);
      //跳转到下一步
      wx.navigateTo({
        url: '/pages/index/largeIllnessRescue/patientInformation/receivablesInformation/receivablesInformation?id='+res.data.data,
      })
    }, function (res) {
      console.log(res);
    })
  },
  
  //删除图片
  bindtapImageDelete: function (e) {
    var value=e.currentTarget.dataset.value;
    var img = e.currentTarget.dataset.img;
    var that = this;
    var arr = that.data.arr;

    //判断要删除的空间
    if (value == 1){
      arr.img1=[];
    } else if (value == 2){
      arr.img2=[];
    }else if(value == 3){
      for (var j = 0; j < arr.img3.length; j++) {
        if (arr.img3[j] == img) {
          arr.img3.splice(j, 1);
        }
      }
    }else if(value == 4){
      for (var j = 0; j < arr.img4.length; j++) {
        if (arr.img4[j] == img) {
          arr.img4.splice(j, 1);
        }
      }
    }

    //更新
    that.setData({
      arr:arr,
    });
  },

  //获取 图片
  chooseImage: function (e) {
    var that = this;
    console.log(e);
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths;
        //判断来源
        if (e.target.dataset.value == 1){
          that.data.arr.img1=[];
          tempFilePaths=res.tempFilePaths[0];
          that.setData({ "arr.img1": tempFilePaths.split(",") });
        }else if(e.target.dataset.value == 2){
          that.data.arr.img2 = [];
          tempFilePaths = res.tempFilePaths[0];
          that.setData({ "arr.img2": tempFilePaths.split(",") });
        } else if (e.target.dataset.value == 3) {
          var imglength = res.tempFilePaths.length + that.data.arr.img3.length;
          if(imglength>2){
            app.showToast("医疗证明两张图片就够了","none");
            return;
          }
          that.setData({ "arr.img3": that.data.arr.img3.concat(res.tempFilePaths)});
        } else if (e.target.dataset.value == 4) {
          var imglength = res.tempFilePaths.length + that.data.arr.img4.length;
          if (imglength > 4) {
            app.showToast("补充证明4张图片就够了", "none");
            return;
          }
          that.setData({ "arr.img4": that.data.arr.img4.concat(res.tempFilePaths) });
        }

      }
    })
  },

  //单选
  radioChange: function (e) {
    var isDisplay_rideo=true;
    if(e.detail.value==1){
      isDisplay_rideo=true;
    }else{
      isDisplay_rideo = false;
    }
    this.setData({
      'form.aided_id_type':e.detail.value,
      isDisplay_rideo: isDisplay_rideo,
    });
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  //预览
  previewImage: function (e) {
    wx.previewImage({
       // 当前显示图片的http链接
      urls: [e.currentTarget.id],
    })
  },
})