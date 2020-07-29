// pages/login/login.js
const api = require("../../utils/ajax.js");

const common = require("../../utils/common.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
      username:"",
      password:""
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
    },
    username:function(e){
      this.setData({
        username:e.detail.value
      })
    },
    password:function(e){
      this.setData({
        password:e.detail.value
      })
    },
    //登录
    login: function (){
        var username = this.data.username;
        var password = this.data.password;
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
        wx.showLoading({
          title: '登录中...',
          mask: true
        })
        var json = {
          username:username,
          password:password
        }
        console.log(json);
        api("/user/login/merchant",json,"POST",1)
          .then(t =>{
            if(t.code==200){
              wx.setStorageSync('access_token', t.data)
              wx.reLaunch({
                url: '../index/index'
              })
            }else{
              wx.showToast({
                icon: 'none',
                title: t.msg
              })
            }
          }).catch((response)=>{
            wx.showToast({
              icon: 'none',
              title: response.msg
            })
          });
    },
})