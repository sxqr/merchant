//index.js
const api = require("../../utils/ajax.js");
//获取应用实例
const app = getApp()

Page({
  data: {
    loginFlag: true,
    usableAmount:'',//可用余额
    interestAmount:'',//利息
    nickname:'',
    statusBarHeight: app.globalData.statusBarHeight,
    facility: app.globalData.facility
  },
  onShow: function (){
    wx.stopPullDownRefresh();
    wx.hideHomeButton();
    // 判断是否授权
    // let isLoginOverdue = wx.getStorageSync("isLoginOverdue");
    let isLoginOverdue = true;
    console.log(isLoginOverdue,"111");
    if(isLoginOverdue){
      this.setData({
        loginFlag:false
      })
    }
    api("/merchantAccount/getAmount",{access_token:wx.getStorageSync('access_token')},"POST",1)
      .then(t => {
        if(t.code == 200){
          var usableAmount = (t.data.usableAmount / 100).toFixed(2);
          var interestAmount = (t.data.interestAmount / 100).toFixed(2);
          this.setData({
            usableAmount:usableAmount,
            interestAmount:interestAmount
          })
        }
      })
  },
  //隐藏弹出层
  hidden: function () {
    this.setData({
      loginFlag: true
    })
  },
  //微信授权
  bindGetUserInfo: function (e) {
    // 获得最新的用户信息
    let that = this;
    let userInfo = e.detail.userInfo;
    if (!userInfo) {
      return;
    }
    wx.setStorageSync("nickname", userInfo.nickName);
    wx.setStorageSync("headImg", userInfo.avatarUrl);

    wx.login({
      success: function (res) {
        if (res.code) {
          let code = res.code;
          let json = {
            access_token: wx.getStorageSync("access_token"),
            code: code,

          }
          that.login(json);
        }
      }
    })
  },
  //登录
  login: function (json) {
    var that = this;
    api("/login/wxLogin", json, "POST", 1)
      .then(t => {
        if (t.code == 200) {
          wx.setStorageSync("access_token", t.data.token.token);
          that.setData({
            loginFlag: true
          })
        }
      })
  },
  //点击子层不去触发父层的隐藏事件
  rf: function (e) {
      return;
  },
  // 交易查询
  transactionQuery: function(){
    wx.navigateTo({
      url: '../transactionQuery/transactionQuery',
    })
  },
  // 报表
  statement: function(){
    wx.navigateTo({
      url: '../statement/statement',
    })
  },
  // 门店管理
  storeList: function(){
    wx.navigateTo({
      url: '../storeList/storeList',
    })
  },
  // 云音响
  cloudSound: function(){
    wx.navigateTo({
      url: '../cloudSound/cloudSound',
    })
  },
  // 二维码
  codeList: function(){
    wx.navigateTo({
      url: '../codeList/codeList',
    })
  },
  // 我的钱包
  wallet: function(){
    wx.navigateTo({
      url: '../wallet/wallet',
    })
  },
  // 关于我们
  about: function(){
    wx.navigateTo({
      url: '../about/about',
    })
  },
  personal: function(){
    wx.navigateTo({
      url: '../personal/personal',
    })
  },
  onLoad: function (){
    
  }
})

// function isLoginOverdue(that, json){
//   //判断是否授权
//   api("/app/login/isLoginOverdue", json, "GET")
//     .then(t => {
//       if (t.code == 200) {
//         var isLoginOverdue = t.data.isLoginOverdue;
//         let loginFlag = that.data.loginFlag;
//         wx.setStorageSync("isLoginOverdue", isLoginOverdue);
//         if (isLoginOverdue) {
//           loginFlag = false;
//         } else {
//           loginFlag = true;
//         }
//         that.setData({
//           loginFlag: loginFlag
//         })
//       }
//     })
// }