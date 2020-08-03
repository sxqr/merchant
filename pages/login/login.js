// pages/login/login.js
const api = require("../../utils/ajax.js");

const common = require("../../utils/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: "",
    code: "",
    isAuthorization: false,
    isType:true,
    isType1:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          let code = res.code;
          _this.setData({
            code:code
          })
          api("/login/isAuthorization", {
            code: code
          }, "POST", 1).then(t => {
            wx.setStorageSync('isAuthorization', t.data.isAuthorization);
            _this.setData({
              isAuthorization: t.data.isAuthorization
            })
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 同意协议
  isConsent:function(e){
    let isType = e.currentTarget.dataset.type;
    
    if(isType == 'no'){
      this.setData({
        isType:true,
        isType1:false
      })
    } else {
      this.setData({
        isType:false,
        isType1:true
      })
    }
  },
  //微信授权
  bindGetUserInfo: function (e) {
    console.log(e);
    // 获得最新的用户信息
    let that = this;
    let userInfo = e.detail.userInfo;
    if (!userInfo) {
      return;
    }
    wx.login({
      success: function (res) {
        console.log(res);
        if (res.code) {
          let code = res.code;
          let json = {
            code: code,
          }
          that.wxLogin(json);
        }
      }
    })
  },
  //微信授权登录
  wxLogin: function (json) {
    var _this = this;
    if(_this.data.isType1){
      wx.showToast({
        icon: 'none',
        title: '请先同意用户协议',
      })
    } else {
      api("/login/wxLogin", json, "POST", 1)
      .then(t => {
        if (t.code == 200) {
          wx.setStorageSync('isAuthorization', _this.data.isAuthorization);
          wx.setStorageSync("access_token", t.data.token);
          wx.reLaunch({
            url: '../index/index'
          })
        }
      }).catch((response) => {
        wx.showToast({
          icon: 'none',
          title: response.msg
        })
      });
    }
  },
  username: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  password: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  //登录
  userLogin: function () {
    var that = this;
    wx.login({
      success: function (res) {
        console.log(res);
        if (res.code) {
          var username = that.data.username;
          var password = that.data.password;
          if (username == "") {
            wx.showToast({
              icon: 'none',
              title: '请输入用户账号'
            })
            return false;
          }
          if (password == "") {
            wx.showToast({
              icon: 'none',
              title: '请输入密码'
            })
            return false;
          }
          if (that.data.isType1) {
            wx.showToast({
              icon: 'none',
              title: '请先同意用户协议'
            })
            return false;
          }
          wx.showLoading({
            title: '登录中...',
            mask: true
          })
          var json = {
            username: username,
            password: password,
            code:res.code
          }
          api("/user/login/merchant", json, "POST", 1)
            .then(t => {
              if (t.code == 200) {
                wx.setStorageSync('access_token', t.data)
                wx.reLaunch({
                  url: '../index/index'
                })
              } else {
                wx.showToast({
                  icon: 'none',
                  title: t.msg
                })
              }
            }).catch((response) => {
              wx.showToast({
                icon: 'none',
                title: response.msg
              })
            });
        }
      }
    })
  },
})