// pages/addStorePhotos/addStorePhotos.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: app.data.url,
        merchants: {},
        merchantDoorPhotoUrl: "",
        merchantBusinessUrl: "",
        merchantCashierDeskPhotoUrl: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var merchants = wx.getStorageSync("merchants");
        let merchantDoorPhotoUrl = "";
        let merchantBusinessUrl = "";
        let merchantCashierDeskPhotoUrl = "";
        if(merchants){
            merchants = merchants
        }else{
            merchants = {}
        }
        if(merchants && merchants.merchantDoorPhotoUrl){
            merchantDoorPhotoUrl = merchants.merchantDoorPhotoUrl
        }
        if(merchants && merchants.merchantBusinessUrl){
            merchantBusinessUrl = merchants.merchantBusinessUrl
        }
        if(merchants && merchants.merchantCashierDeskPhotoUrl){
            merchantCashierDeskPhotoUrl = merchants.merchantCashierDeskPhotoUrl
        }
        this.setData({
            merchants: merchants,
            merchantDoorPhotoUrl: merchantDoorPhotoUrl,
            merchantBusinessUrl: merchantBusinessUrl,
            merchantCashierDeskPhotoUrl: merchantCashierDeskPhotoUrl
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
    },

    //上传门头照
    merchantDoorPhotoUrl: function(){
        var that = this;
        wx.chooseImage({
            count: 1,
            success: (res) => {
                wx.showLoading({
                    title: '图片上传中...',
                })
                wx.uploadFile({
                    filePath: res.tempFilePaths[0],
                    name: 'file',
                    url: that.data.url + '/file/upload',
                    success(res){
                        wx.hideLoading()
                        var data = JSON.parse(res.data);
                        if(data.code == 200){
                            var merchantDoorPhotoUrl = data.data;
                            that.setData({
                                merchantDoorPhotoUrl: merchantDoorPhotoUrl
                            })
                        }else{
                            wx.showToast({
                                icon:'none',
                                title: data.msg,
                            })
                        }
                    }
                })
            },
        })
    },

    //上传经营场所照
    merchantBusinessUrl: function(){
        var that = this;
        wx.chooseImage({
            count: 1,
            success: (res) => {
                wx.showLoading({
                    title: '图片上传中...',
                })
                wx.uploadFile({
                    filePath: res.tempFilePaths[0],
                    name: 'file',
                    url: that.data.url + '/file/upload',
                    success(res){
                        wx.hideLoading()
                        var data = JSON.parse(res.data);
                        if(data.code == 200){
                            var merchantBusinessUrl = data.data;
                            that.setData({
                                merchantBusinessUrl: merchantBusinessUrl
                            })
                        }else{
                            wx.showToast({
                                icon:'none',
                                title: data.msg,
                            })
                        }
                    }
                })
            },
        })
    },

    //上传收银台照
    merchantCashierDeskPhotoUrl: function(){
        var that = this;
        wx.chooseImage({
            count: 1,
            success: (res) => {
                wx.showLoading({
                    title: '图片上传中...',
                })
                wx.uploadFile({
                    filePath: res.tempFilePaths[0],
                    name: 'file',
                    url: that.data.url + '/file/upload',
                    success(res){
                        wx.hideLoading()
                        var data = JSON.parse(res.data);
                        if(data.code == 200){
                            var merchantCashierDeskPhotoUrl = data.data;
                            that.setData({
                                merchantCashierDeskPhotoUrl: merchantCashierDeskPhotoUrl
                            })
                        }else{
                            wx.showToast({
                                icon:'none',
                                title: data.msg,
                            })
                        }
                    }
                })
            },
        })
    },

    //完成
    confirm: function(){
        var merchants = this.data.merchants;
        let merchantDoorPhotoUrl = this.data.merchantDoorPhotoUrl;
        let merchantBusinessUrl = this.data.merchantBusinessUrl;
        let merchantCashierDeskPhotoUrl = this.data.merchantCashierDeskPhotoUrl;
        if(merchantDoorPhotoUrl == ""){
            wx.showToast({
                icon: 'none',
                title: '请上传门头照',
            })
            return false;
        }
        if(merchantBusinessUrl == ""){
            wx.showToast({
                icon: 'none',
                title: '请上传经营场所照片',
            })
            return false;
        }
        if(merchantCashierDeskPhotoUrl == ""){
            wx.showToast({
                icon: 'none',
                title: '请上传收银台照片',
            })
            return false;
        }
        merchants.merchantDoorPhotoUrl = merchantDoorPhotoUrl;
        merchants.merchantBusinessUrl = merchantBusinessUrl;
        merchants.merchantCashierDeskPhotoUrl = merchantCashierDeskPhotoUrl;
        wx.setStorageSync("merchants", merchants);
        wx.navigateBack({
          delta: 1,
        })
    }

})