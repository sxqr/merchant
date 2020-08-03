const api = require("../../utils/ajax");

// pages/addStaff/addStaff.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        storeNo:"",
        clerkName:"",
        phone:"",
        editType:"",
        clerkId:"",
        phone:"",
        clerkName:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let editType = options.editType;
        if(editType == 'edit'){
            wx.setNavigationBarTitle({
              title: '编辑店员',
            })
        } else {
            wx.setNavigationBarTitle({
                title: '新增店员',
            })
        }
        this.setData({
            storeNo:options.storeNo,
            editType:editType,
            clerkId:options.clerkId,
            phone:options.phone,
            clerkName:options.clerkName
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    clerkName:function(e){
        this.setData({
            clerkName:e.detail.value
        })
    },
    phone:function(e){
        this.setData({
            phone:e.detail.value
        })
    },
    // 添加店员
    addStaff:function(){
        var clerkName = this.data.clerkName;
        var phone = this.data.phone;
        let editType = this.data.editType;
        if(clerkName == ""){
            wx.showToast({
                icon: 'none',  
                title: '请输入店员姓名',
            })
            return false;
        }
        if(phone == ""){
            wx.showToast({
                icon: 'none',  
                title: '请输入店员联系电话',
            })
            return false;
        }
        wx.showLoading({
            title: '加载中...',
            mask: true
        })
        if(editType == "add"){
            // 新增
            var json = {
                clerkName:clerkName,
                phone:phone,
                storeNo:this.data.storeNo,
                access_token:wx.getStorageSync('access_token')
            }
            api("/storeClerk/add",json,"POST",1).then(t => {
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
        } else {
            // 修改
            var json = {
                clerkName:clerkName,
                phone:phone,
                id:this.data.clerkId,
                access_token:wx.getStorageSync('access_token')
            }
            api("/storeClerk/update",json,"POST",1).then(t => {
                if(t.code == 200){
                    wx.showToast({
                        icon: 'success',
                        title: '修改成功',
                    })
                    setTimeout(function(){
                        wx.navigateBack({
                            delta: 1
                        })
                    }, 1500)
                }
            })
        }
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
})