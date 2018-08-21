// pages/index/largeIllnessRescue/largeIllnessRescue.js
var app= getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    txt_textarea:'好心人，您好！我叫测试，家住北京市北京市东城区，于2018年01月01日，在贵阳被查出患有mi mi，疾病的噩耗让我的精神几乎崩溃，高额的费用让原本不太富裕的家庭陷入了绝境，现在已经花去1121元，后面还需要一系列的康复治疗，家庭的经济实力已难以支撑下去，现发起筹款希望好心人能多帮帮我，今后我有了能力，一定将这份无私的爱回馈社会。感谢大家！',
    files: [],                            //选择图片的数组，原始。包含完整的图片url，以及现在编辑数据，用于预览
    arr: [],                              //选择图片的数组，预留。不包含编辑之前的数据，用于组装
    isAgree: false,  

    imageArray: [],                       //图片数组，原始。不包含完整url，用于储存
    Raise_money_for_whom: ["本人","父亲","母亲","丈夫","儿子","女儿","朋友","其他"],
    Home_town:["请选择","北京","上海"],
    Date_of_diagnosis:["请选择"],
    index: 0, Home_town_index: 0, date:'请选择',
    isDisplay:false,
    title_isDisplay:false,
    qz_isDisplay:false,
    image_isDisplay:false,

    tabs: ["大病救助", "发起祈福"],   //tab菜单列
    activeIndex: 0,         //tab切换下标
    sliderOffset: 0,        //坐标x
    sliderLeft: 0,          //坐标y
    form:{
      step:0,               //Int请求步骤。
      mobile:null,          //	Int联系人手机号。
      total_amount:null,    //	Double筹款金额。
      title:null,           //	String	求助标题。
      description:null,     //	String	描述。
      pic:null,             // 選項	Json项目图片。
      address:null,         // 選項	String	地址。
      qrcode:null,          // 選項	String	志愿者code。
    }
  },

  //快速生成表单
  formSubmit:function(e){
    var that= this;
    var remark="大家好！";
    //您的姓名
    if (!app.checkInput(e.detail.value.userName)){
      remark+="我叫"+e.detail.value.userName+"。";
    }
    //患者家乡
    if (app.checkInput(e.detail.value.address)){
      remark +="家住"+e.detail.value.address+"，天有不测风云，原本幸福美满的家庭却被一场突如其来的大病拖垮。";
    }
    //为谁筹款
    if(!app.checkInput(e.detail.value.weishei)){
      remark+="我的"+e.detail.value.weishei+",";
    }
    //确诊日期
    if (!app.checkInput(e.detail.value.dateTime)){
      remark += "在" + e.detail.value.dateTime +",突感不适，"
    }
    //所在医院
    if(!app.checkInput(e.detail.value.souzaiYyuan)){
      remark += "被送往" + e.detail.value.souzaiYyuan +",紧急救治，"
    }
    //疾病名称
    if(!app.checkInput(e.detail.value.jiebingName)){
      remark+= "最后确诊为"+e.detail.value.jiebingName+",";
    }
    //已花费金额
    if(!app.checkInput(e.detail.value.yihuafeiJE)){
      remark += "如今已经花费" + e.detail.value.yihuafeiJE;
      
    }

    remark += ",目前病情虽然已经控制住了，但后期治疗费用还需要很多资金，"
      + "朋友亲戚该借的都借了，实在是无力承担这笔天大的费用。请大家救救我可怜的"
      + e.detail.value.weishei
      + "，我还没来得及好好陪"
      + e.detail.value.weishei
      + "，大家的恩情我一定会铭记在心，感恩，好人一生平安！";
    //打印
    console.log(remark);
    //设置
    that.setData({
      "form.description": remark,
      isDisplay:false
    });
  },

  //联系人电话号码
  bindinput_mobile:function(e){
    this.setData({
      'form.mobile':e.detail.value
    })
  },

  //求助说明
  bindinput_description:function(e){
    this.setData({
      'form.description':e.detail.value
    })
  },

  //筹款标题
  bindinput_title:function(e){
    this.setData({
      'form.title':e.detail.value
    });
  },

  //筹款金额
  bindinput_total_amount:function(e){
    this.setData({
      "form.total_amount":e.detail.value
    });
  },

  //滴水祈福提交跳转
  bindTab_QF:function(e){
    wx.navigateTo({
      url: '/pages/index/largeIllnessRescue/dripPrayingForBlessing/dripPrayingForBlessing',
    })
  },

  //tab点击切换
  tabClick: function (e) {
    //当前
    var that = this;

    //设置
    that.setData({
      list: null,
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  //图片示例
  image_isDisplay: function (e) {
    this.setData({
      image_isDisplay: this.data.image_isDisplay == false ? true : false,
    })
  },

  //求助示例
  qz_isDisplay: function (e) {
    this.setData({
      qz_isDisplay: this.data.qz_isDisplay == false ? true : false,
    })
  },

  //标题示例
  bindtapTitle_isDisplay:function(e){
    this.setData({
      title_isDisplay: this.data.title_isDisplay == false ? true : false,
    })
  },

  //下一步
  bindtapSubmit:function(e){ 
    var that=this;
    
    //上传图片
    var imageArray = [];
    if (that.data.arr == null || that.data.arr.length == 0) {
      that.showModal("请上传图片!");
      return;
    }else{
      //imageArray = that.data.imageArray;
      imageArray = that.data.arr;
    }
    if (imageArray.length > 6) {
      that.showModal("图片最多只能上传六张!");
      return;
    }

    //提示
    wx.showToast({
      title: '正在上传',
      icon: 'loading',
      duration: 3000,
    });

    //上传图片数组
    uploadimg(imageArray.splice(0, 1), [], imageArray);
    //多张图片上传
    function uploadimg(path, pathArr, dataArr) {
      wx.uploadFile({
        url: app.config.dszjPath_web +"api/UserSeriousIllness/imageUpload",                       //开发者服务器 url
        filePath: path[0],                          //要上传文件资源的路径
        name: 'file',                                //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
        header: {                                   //HTTP 请求 Header , header 中不能设置 Referer
          token: wx.getStorageSync("token"),
        },
        formData: null,                             //参数(HTTP 请求中其他额外的 form data)
        success: (resp) => {                         //接口调用成功的回调函数
          var json = JSON.parse(resp.data);
          pathArr.push(json[0])
          if (dataArr.length > 0) {
            //递归
            uploadimg(dataArr.splice(0, 1), pathArr, dataArr);
          } else {
            //调用请求发布
            that.reqSetData(pathArr.join(","));
          }
        }
      });
    }
  },

  //发布请求
  reqSetData:function(images){
    var that=this;
    //url
    var url = app.config.dszjPath_web + "api/UserSeriousIllness/add";
    //请求头
    var header = {
      token: wx.getStorageSync("token")
    }
    //参数
    that.form.pic=images;
    var data = that.form;

    //发送请求
    app.request.reqPost(url, header, data, function (res) {
      console.log(res);

    }, function (res) {
      console.log(res);
    })

    wx.navigateTo({
      url: '/pages/index/largeIllnessRescue/patientInformation/patientInformation',
    })
  },

  //取消或显示
  btnClose:function(e){
    this.setData({
      isDisplay:this.data.isDisplay==false?true:false,
    })
  },

  //确诊日期
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //患者家乡
  bindPickerHome: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Home_town_index: e.detail.value
    })
  },
  //为谁筹款
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //删除图片
  bindtapImageDelete: function (e) {
    var img = e.currentTarget.dataset.img;
    var that = this;
    var files = that.data.files;

    for (var j = 0; j < files.length; j++) {
      if (files[j] == img) {
        files.splice(j, 1);
      }
    }

    var imageArray = that.data.imageArray;
    for (var j = 0; j < imageArray.length; j++) {
      var strImg = __config.domainImage + imageArray[j];
      if (strImg == img) {
        imageArray.splice(j, 1);
      }
    }

    that.setData({
      files: files,
      imageArray: imageArray
    });
    return false;
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //设置tab
    var sliderWidth = 50;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})