// pages/addStore/addStore.js
const api = require("../../utils/ajax.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        storeName:"",
        detailAddr:""
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
    storeName:function(e){
        this.setData({
            storeName:e.detail.value
        })
    },
    // 添加门店
    addStore:function(){
        var detailAddr = "湖南省长沙市岳麓区麓谷信息港B座";
        var storeName = this.data.storeName;
        if(storeName == ""){
            wx.showToast({
                icon: 'none',
                title: '请输入门店名称'
            })
            return false;
        }
        if(detailAddr == ""){
            wx.showToast({
                icon: 'none',
                title: '请选择门店地址'
            })
            return false;
        }
        var json = {
            detailAddr:detailAddr,
            storeName:storeName,
            access_token:wx.getStorageSync('access_token')
        }
        api("/mercStore/add",json,"POST",1).then(t => {
            if(t.code == 200){
                wx.showToast({
                    icon: 'success',
                    title: '添加成功',
                })
                setTimeout(function(){
                    wx.navigateBack({
                        delta: 1
                    })
                }, 1500)
            }
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
})