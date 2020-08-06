// pages/addStore/addStore.js
const api = require("../../utils/ajax.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        storeName: "",
        detailAddr: "",
        editType:"",
        provinces: [],
        citys: [],
        countys: [],
        region: ['北京市', '北京市', '东城区'],
        address: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let editType = options.editType;
        if(editType == "edit"){
            let id = options.id;
            let storeName = options.storeName;
            let detailAddr = options.detailAddr;
            this.setData({
                id: id,
                storeName: storeName,
                detailAddr: detailAddr
            })
            wx.setNavigationBarTitle({
              title: '编辑门店',
            })
        } else {
            wx.setNavigationBarTitle({
                title: '添加门店',
            })
        }
        this.setData({
            editType: editType
        })
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    storeName: function (e) {
        this.setData({
            storeName: e.detail.value
        })
    },
    // 添加门店
    addStore: function () {
        var detailAddr = "湖南省长沙市岳麓区麓谷信息港B座";
        var storeName = this.data.storeName;
        if (storeName == "") {
            wx.showToast({
                icon: 'none',
                title: '请输入门店名称'
            })
            return false;
        }
        if (detailAddr == "") {
            wx.showToast({
                icon: 'none',
                title: '请选择门店地址'
            })
            return false;
        }
        wx.showLoading({
            title: '加载中...',
            mask: true
        })
        var json = {
            detailAddr: detailAddr,
            storeName: storeName,
            access_token: wx.getStorageSync('access_token')
        }
        let editType = this.data.editType
        let msg = '添加成功';
        let url = '/mercStore/add';
        if(editType == "edit"){
            let id = this.data.id;
            msg = '修改成功';
            url = '/mercStore/update';
            json = {
                id: id,
                detailAddr: detailAddr,
                storeName: storeName,
                access_token: wx.getStorageSync('access_token')
            }
        }
        api(url, json, "POST", 1).then(t => {
            if (t.code == 200) {
                wx.showToast({
                    icon: 'success',
                    title: msg,
                })
                setTimeout(function () {
                    wx.navigateBack({
                        delta: 1
                    })
                }, 1500)
            }
        })
    },
    //获取三级联动
    bindRegionChange: function (e) {
        var region = e.detail.value;
        this.setData({
            region: region,
            address: region[0] + region[1] + region[2]
        }) 
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
})