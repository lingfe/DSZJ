// pages/dripLove/rescueDetails/heplTaFundraising/heplTaFundraising.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jingE_list: app.dahuoData.jingE_list,
    detailsData:null,//项目信息
    percent:10, //贡献值
    jingE:0,         //金额
    textarea:null,  //祝福语
    checkbox:false, //是否匿名
    //支付表单
    pay_form:{
      type:0,	//Int 支付类型。 默認值: 0 Allowed values: 0(大病救助), 1(项目祈福), 2(个人祈福), 3(请柬)
      payway:0,//	Int支付方式。默認值: 0 Allowed values: 0(微信支付), 1(支付宝支付), 2(银联支付)
      id:null,//	Int 主ID（项目ID/请柬ID）。
      amount:0,//	Int支付金额。
      content:null,// 選項	String	支付内容。
      isAnonymous:0, //選項	Int	是否匿名。默認值: 0  Allowed values: 0, 1
    },
    order_id:null,//订单号
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var info = JSON.parse(options.detailsData);
    that.setData({
      detailsData: info
    });
  },

  //支付订单
  setUserPayOrder:function(e){
    var that=this;
    //验证非空
    if (app.checkInput(that.data.jingE)){
      app.showToast("请选择或输入金额","none");
      return;
    }
    if(app.checkInput(that.data.textarea)){
      app.showToast("请输入祝福语","none");
      return;
    }
    //赋值
    var pay_form = that.data.pay_form;
    if (that.data.checkbox){
      pay_form.isAnonymous=1;
    }
    pay_form.amount = that.data.jingE;
    pay_form.content = that.data.textarea;
    pay_form.id = that.data.detailsData.id;

    //保存订单
    wx.request({
      url: app.config.dszjPath_web +'api/UserPay/order',
      method:"POST",
      header:{
        Token:wx.getStorageSync("token")
      },
      data:pay_form,
      success:function(res){
        console.log(res);
        if(res.data.code == 401){
          app.btnLogin(res.data.code);
          return;
        }else{
          //得到支付参数
          wx.request({
            url: app.config.dszjPath_web +'api/WxPay/getParamters',
            method:'GET',
            header:{
              Token:wx.getStorageSync("token")
            },
            data:{
              isApp:0,      //是否app
              tradeNo:res.data.data, //订单号
              amount: pay_form.amount, //金额
            },
            success:function(resPay){
              console.log(resPay);

            }
          })

        }
      }
    })

  },

  /*
    调起微信支付 
    @param 支付价格，不填写默认为1分钱
  */
  pay:function(total_fee) {

    var total_fee = total_fee;
    wx.login({
      success: res => {
        //code 用于获取openID的条件之一
        var code = res.code;

        wx.request({
          url: '后台地址/index.php',
          method: "POST",
          data: {
            total_fee: total_fee,
            code: code,
          },
          success: function (res) { //后端返回的数据
            var data = res.data;
            console.log(data);
            console.log(data["timeStamp"]);
            wx.requestPayment({
              timeStamp: data['timeStamp'],
              nonceStr: data['nonceStr'],
              package: data['package'],
              signType: data['signType'],
              paySign: data['paySign'],
              success: function (res) {
                wx.showModal({
                  title: '支付成功',
                  content: '',
                })
              },
              fail: function (res) {
                console.log(res);
              }
            })
          }
        });


      }
    })

  },

  //祝福语
  bindTextarea:function(e){
    this.setData({
      textarea:e.detail.value
    });
  },

  //选择匿名帮助
  bindtapCheckbox:function(e){
    console.log(e);
    this.setData({
      checkbox:this.data.checkbox==false?true:false,
    });
  },

  //计算贡献值并保存
  bindtapAmount:function(e){
    var amount = 0;
    if(app.checkInput(e.detail.value)){
      amount = e.currentTarget.dataset.amount;
    }else{
      amount = e.detail.value;
    }
    var percent = amount / 10;

    //设置值
    this.setData({
      jingE:amount,
      percent:percent,
    });
  },
})