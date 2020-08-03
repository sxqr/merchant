// pages/linkmanInfo/linkmanInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        merchants: {},
        contactName: "",
        contactMobile: ""
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
        let merchants = wx.getStorageSync("merchants");
        let contactName = "";
        let contactMobile = "";
        if(merchants){
            merchants = merchants
        }else{
            merchants = {}
        }
        if(merchants && merchants.contactName){
            contactName = merchants.contactName
        }
        if(merchants && merchants.contactMobile){
            contactMobile = merchants.contactMobile
        }
        this.setData({
            merchants: merchants,
            contactName: contactName,
            contactMobile: contactMobile
        })
    },

    // 获取联系人姓名
    contactName: function(e){
        this.setData({
            contactName: e.detail.value
        })
    },

    //获取联系人电话
    contactMobile: function(e){
        this.setData({
            contactMobile: e.detail.value
        })
    },

    //完成
    confirm: function(){
        var merchants = this.data.merchants;
        var contactName = this.data.contactName;
        var contactMobile = this.data.contactMobile;
        if(contactName == ""){
            wx.showToast({
                icon: 'none',
                title: '请输入联系人姓名',
            })
            return false;
        }
        if(contactMobile == ""){
            wx.showToast({
                icon: 'none',
                title: '请输入联系人电话',
            })
            return false;
        }
        if(!(/^1(3|4|5|7|8)\d{9}$/.test(contactMobile))){
            wx.showToast({
                icon:'none',
                title: '联系电话格式错误',
            })
            return false;
        }
        merchants.contactName = contactName;
        merchants.contactMobile = contactMobile;
        wx.setStorageSync("merchants", merchants);
        wx.navigateBack({
          delta: 1,
        })
    }

})