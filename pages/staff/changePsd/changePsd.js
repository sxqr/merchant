// pages/changePsd/changePsd.js
const api = require("../../../utils/ajax.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        oldPsw: "",
        newPsw: "",
        confirmPsw: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    // 获取旧密码
    getOldPsw: function(e){
        this.setData({
            oldPsw: e.detail.value
        })
    },
    //获取新密码
    getNewPsw: function(e){
        this.setData({
            newPsw: e.detail.value
        })
    },
    //获取确认密码
    getConfirmPsw: function(e){
        this.setData({
            confirmPsw: e.detail.value
        })
    },

    // 确认修改
    confirm: function(){
        var oldPsw = this.data.oldPsw;
        var newPsw = this.data.newPsw;
        var confirmPsw = this.data.confirmPsw;
        if(oldPsw == ""){
            wx.showToast({
                icon: "none",
                title: '请输入旧密码',
            })
            return false;
        }
        if(newPsw == ""){
            wx.showToast({
                icon: "none",
                title: '请输入密码',
            })
            return false;
        }
        if(confirmPsw == ""){
            wx.showToast({
                icon: "none",
                title: '请确认密码',
            })
            return false;
        }
        if(newPsw != confirmPsw){
            wx.showToast({
                icon: "none",
                title: '两次输入的密码不一致',
            })
            return false;
        }
        var json = {
            access_token: wx.getStorageSync("token"),
            oldPsw: oldPsw,
            newPsw: newPsw
        }
        api("/user/psw", json, "POST", 1)
            .then(t => {
                console.log(t);
                if(t.code == 200){
                    wx.showToast({
                        icon: "none",
                        title: '修改成功',
                    })
                    setTimeout(function () {
                        wx.navigateBack({
                            delta: 1
                        })
                      }, 1000)
                }
            }).catch((response)=>{
                wx.showToast({
                  icon: 'none',
                  title: response.msg
                })
            });
    }

})