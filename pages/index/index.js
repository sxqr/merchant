//index.js
const api = require("../../utils/ajax.js");
//获取应用实例
const app = getApp()

Page({
  data: {
    loginFlag: true,
    usableAmount: '', //可用余额
    interestAmount: '', //利息
    nickname: '',
    headUrl: '',
    userId: '',
    statusBarHeight: app.globalData.statusBarHeight,
    facility: app.globalData.facility,
    isAuthorization: true,
  },
  onLoad: function () {
    
  },
  onShow: function () {
    wx.stopPullDownRefresh();
    wx.hideHomeButton();
    this.setData({
      isAuthorization: wx.getStorageSync('isAuthorization')
    })
    // 判断是否授权
    if (!this.data.isAuthorization) {
      this.setData({
        loginFlag: false
      })
    }
    // 获取金额
    api("/merchantAccount/getAmount", {
        access_token: wx.getStorageSync('access_token')
      }, "POST", 1)
      .then(t => {
        if (t.code == 200) {
          var usableAmount = "0.00";
          var interestAmount = "0.00";
          if(t.data != ""){
            usableAmount = (t.data.usableAmount / 100).toFixed(2);
            interestAmount = (t.data.interestAmount / 100).toFixed(2);
          }
          this.setData({
            usableAmount: usableAmount,
            interestAmount: interestAmount
          })
        }
      });
    // 获取用户信息
    api("/merchant/getMerchant", {
        access_token: wx.getStorageSync('access_token')
      }, "POST", 1)
      .then(t => {
        if (t.code == 200) {
          wx.setStorageSync('headUrl', t.data.headUrl);
          wx.setStorageSync('userId', t.data.userId);
          wx.setStorageSync('nickname', t.data.merchantShortName);
          wx.setStorageSync('settleName', t.data.settleName);
          this.setData({
            nickname: t.data.merchantShortName,
            headUrl: t.data.headUrl,
            userId: t.data.userId
          })
        }
      });
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
    // wx.setStorageSync("nickname", userInfo.nickName);
    // wx.setStorageSync("headImg", userInfo.avatarUrl);

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
    api("/login/zhLogin", json, "POST", 1)
      .then(t => {
        if (t.code == 200) {
          wx.setStorageSync("access_token", t.data.token);
          wx.setStorageSync('isAuthorization', true);
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
  transactionQuery: function () {
    wx.navigateTo({
      url: '../transactionQuery/transactionQuery',
    })
  },
  // 个人信息
  personal: function () {
    wx.navigateTo({
      url: '../personal/personal',
    })
  },
  // 报表
  statement: function () {
    wx.navigateTo({
      url: '../statement/statement',
    })
  },
  // 门店管理
  storeList: function () {
    wx.navigateTo({
      url: '../storeList/storeList',
    })
  },
  // 云音响
  cloudSound: function () {
    wx.navigateTo({
      url: '../cloudSound/cloudSound',
    })
  },
  // 二维码
  codeList: function () {
    wx.navigateTo({
      url: '../codeList/codeList',
    })
  },
  // 我的钱包
  wallet: function () {
    wx.navigateTo({
      url: '../wallet/wallet',
    })
  },
  // 解绑
  unbind: function () {
    wx.showModal({
      title: "提示",
      content: "是否要解绑商户",
      success (res) {
        if (res.confirm) {
          wx.login({
            success: function (res) {
              if (res.code) {
                let code = res.code;
                let json = {
                  access_token: wx.getStorageSync("access_token"),
                  code: code,
                }
                api("/merchant/unOpenIdBind", json, "POST", 1)
                  .then(t => {
                    if (t.code == 200) {
                      wx.showToast({
                        icon: "none",
                        title: '解绑成功',
                      })
                      setTimeout(function (){
                        wx.navigateTo({
                          url: '../login/login',
                        })
                      }, 1000);
                    }
                  }).catch((response) => {
                    wx.showToast({
                        icon: 'none',
                        title: response.msg
                    })
                  })
              }
            }
          })
        } else if (res.cancel) {
          
        }
      }
    })
  },
  // 关于我们
  about: function () {
    wx.navigateTo({
      url: '../about/about',
    })
  },
  personal: function () {
    wx.navigateTo({
      url: '../personal/personal',
    })
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