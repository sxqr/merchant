const config = require('./config.js');
var app = getApp();
var httpUrl = app.data.imgUrl;

// const user=require('../dal/user.js')
module.exports = api;

function api(url, form, method, type, that) {
  return new Promise((resolve, reject) => {
    if (!type) {
      var header = {
        // 'content-type': 'application/x-www-form-urlencoded',
        'Cookie': wx.getStorageSync("cookie") // 默认值
      };
    }

    if (method == 'POST' && type == 1) {
      var header = {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': wx.getStorageSync("cookie") // 默认值
      };
    }
    if (method == 'POST' && type == 2) {
      var header = {
        'content-type': 'application/json',
        'Cookie': wx.getStorageSync("cookie") // 默认值
      };
    }
    if (method == 'POST' && type == 3) {
      var header = {
        'content-type': 'multipart/form-data',
        'Cookie': wx.getStorageSync("cookie") // 默认值
      };
    }
    if(wx.getStorageSync('sessionId')){
      form.sessionId=wx.getStorageSync('sessionId')
    }
    console.log(config.apiUrl + url);
    wx.request({
      url: config.apiUrl + url,
      data: form,
      method: method,
      dataType: 'json',
      header: header,
      success: function (res) {
        wx.hideLoading();
        if (res.data.code == 200) {
          console.log(res);
          resolve(res.data);
        }else if (res.data.code == 401) {
          wx.showToast({
            title: '网络开了个小差，请刷新一下页面',
            icon: 'loading',
            mask: true,
            duration: 2000
          })
          if (wx.getStorageSync('token')) {
            wx.request({
              url: httpUrl+'/wx/login/againLogin',
              data: {
                token: wx.getStorageSync('token')
              },
              method: 'POST',
              header :{
                'content-type': 'application/x-www-form-urlencoded',
              },
              dataType: 'json',
              success: function (res) {
                wx.setStorageSync("token", t.data.token.token);
                wx.setStorageSync("memberId", t.data.member.memberId);
                wx.setStorageSync("phone", t.data.member.phone);
                wx.setStorageSync("nickname", t.data.member.nickName);
                wx.setStorageSync("headImg", t.data.member.headImg);
                that.onShow();
              }
            })
          }else{
            // wx.showToast({
            //   icon: 'none',
            //   title: '请登录',
            // })
            // setTimeout(function(){
            //   wx.switchTab({
            //     url: '../mine/mine',
            //   })
            // }, 1000);
            
            // wx.showModal({
            //   title: '提示信息',
            //   content: '请登录',
            //   success: function (res) {
            //     if (res.cancel) {
            //       //点击取消,默认隐藏弹框
            //       that.setData({
            //         name: '',
            //         mobile: ''
            //       })
            //     } else {
            //       //点击确定
            //       wx.switchTab({
            //         url: '../mine/mine',
            //       })
            //     }
            //   },
            // })
          }
        } else if (res.data.code == 501) {//校验错误
          resolve(res.data);
        } else if (res.data.code == 502) {//登录失效
          wx.showToast({
            icon: 'none',
            title: '请登录',
          })
          setTimeout(function () {
            wx.reLaunch({
              url: '../login/login',
            })
          }, 1000);
        } else {
          console.log(res);
          reject(res.data);
        } 
      },
      fail: function (res) {
        wx.hideLoading();
        reject(res);
      }
    });
  });
}
