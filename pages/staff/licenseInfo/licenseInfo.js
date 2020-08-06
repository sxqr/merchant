// pages/licenseInfo/licenseInfo.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: app.data.url,
        merchants: {},
        legalPersonCardFrontUrl: "",
        legalPersonCardReverseUrl: "",
        businessLicenseUrl: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var merchants = wx.getStorageSync("merchants");
        let legalPersonCardFrontUrl = "";
        let legalPersonCardReverseUrl = "";
        let businessLicenseUrl = "";
        if(merchants){
            merchants = merchants
        }else{
            merchants = {}
        }
        if(merchants && merchants.legalPersonCardFrontUrl){
            legalPersonCardFrontUrl = merchants.legalPersonCardFrontUrl
        }
        if(merchants && merchants.legalPersonCardReverseUrl){
            legalPersonCardReverseUrl = merchants.legalPersonCardReverseUrl
        }
        if(merchants && merchants.businessLicenseUrl){
            businessLicenseUrl = merchants.businessLicenseUrl
        }
        this.setData({
            merchants: merchants,
            legalPersonCardFrontUrl: legalPersonCardFrontUrl,
            legalPersonCardReverseUrl: legalPersonCardReverseUrl,
            businessLicenseUrl: businessLicenseUrl
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    // 上传正面照
    legalPersonCardFrontUrl: function(){
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
                            var legalPersonCardFrontUrl = data.data;
                            that.setData({
                                legalPersonCardFrontUrl: legalPersonCardFrontUrl
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

    // 上传反面照
    legalPersonCardReverseUrl: function(){
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
                            var legalPersonCardReverseUrl = data.data;
                            that.setData({
                                legalPersonCardReverseUrl: legalPersonCardReverseUrl
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

    // 上传营业执照
    businessLicenseUrl: function(){
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
                            var businessLicenseUrl = data.data;
                            that.setData({
                                businessLicenseUrl: businessLicenseUrl
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
        let legalPersonCardFrontUrl = this.data.legalPersonCardFrontUrl;
        let legalPersonCardReverseUrl = this.data.legalPersonCardReverseUrl;
        let businessLicenseUrl = this.data.businessLicenseUrl;
        if(legalPersonCardFrontUrl == ""){
            wx.showToast({
                icon: 'none',
                title: '请上传身份证正面照',
            })
            return false;
        }
        if(legalPersonCardReverseUrl == ""){
            wx.showToast({
                icon: 'none',
                title: '请上传身份证反面照',
            })
            return false;
        }
        if(businessLicenseUrl == ""){
            wx.showToast({
                icon: 'none',
                title: '请上传营业执照',
            })
            return false;
        }
        merchants.legalPersonCardFrontUrl = legalPersonCardFrontUrl;
        merchants.legalPersonCardReverseUrl = legalPersonCardReverseUrl;
        merchants.businessLicenseUrl = businessLicenseUrl;
        wx.setStorageSync("merchants", merchants);
        wx.navigateBack({
          delta: 1,
        })
    }

})