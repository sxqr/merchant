// pages/addStore/addStore.js
const api = require("../../utils/ajax.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        storeName:"",
        detailAddr:"",
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
    //获取三级联动
    bindRegionChange: function(e){
        console.log('picker发送选择改变，携带值为', e.detail.value)
        var region = e.detail.value;
        this.setData({
          region: region,
          address: region[0]+region[1]+region[2]
        })
        // api("/area/getProvinceList",{},"POST",1).then(t => {
        //     console.log(t);
        //     if(t.code == 200){
                
        //     }
        // })    
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
})