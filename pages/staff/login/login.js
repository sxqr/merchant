// pages/login/login.js
const app = getApp();
const api = require("../../../utils/ajax.js");
const common = require("../../../utils/common.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: app.globalData.statusBarHeight,
        facility: app.globalData.facility,
        username: "",
        password: ""
    },
    //获取用户名
    getUsername: function(e){
        this.setData({
            username: e.detail.value
        })
    },
    //获取密码
    getPassword: function(e){
        this.setData({
            password: e.detail.value
        })
    },
    //登录
    login: function (){
        var username = this.data.username;
        if(username == ""){
            wx.showToast({
              icon: "none",
              title: '请输入用户账号',
            })
            return false;
        }
        var password = this.data.password;
        if(password == ""){
            wx.showToast({
              icon: "none",
              title: '请输入密码',
            })
            return false;
        }
        wx.showLoading({
            title: '登录中...',
            mask: true
        })
        let json = {
            username: username,
            password: password
        }
        api('/user/login/work', json, 'POST', 1)
            .then(t => {
                if(t.code == 200){
                    wx.setStorageSync("token", t.data);
                    wx.reLaunch({
                        url: '../index/index'
                    })
                }
            }).catch((response)=>{
                wx.showToast({
                  icon: 'none',
                  title: response.msg
                })
            });
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

    //商户登录
    goMerchantLogin: function(){
        wx.reLaunch({
            url: '../../login/login'
        })
    }
})