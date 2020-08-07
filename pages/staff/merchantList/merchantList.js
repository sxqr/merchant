// pages/addMerchant/addMerchant.js
const common = require("../../../utils/common.js");
const api = require("../../../utils/ajax.js")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        merchants: {},
        merchantInfoPerfect: false,
        linkmanInfoPerfect: false,
        licenseInfoPerfect: false,
        balanceInfoPerfect: false,
        addStorePhotosPerfect: false,
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
        var merchants = wx.getStorageSync("merchants");
        console.log(merchants);
        if(merchants){
            this.setData({
                merchants: merchants
            })
        }else{
            this.setData({
                merchants: {}
            })
        }
        if(merchants.merchantName && merchants.merchantShortName && merchants.address && merchants.province && merchants.city && merchants.area){
            this.setData({
                merchantInfoPerfect: true
            })
        }
        if(merchants.contactName && merchants.contactMobile){
            this.setData({
                linkmanInfoPerfect: true
            })
        }
        if(merchants.legalPersonCardFrontUrl && merchants.legalPersonCardReverseUrl && merchants.businessLicenseUrl){
            this.setData({
                licenseInfoPerfect: true
            })
        }
        if(merchants.settleName && merchants.settleNo){
            this.setData({
                balanceInfoPerfect: true
            })
        }
        if(merchants.merchantDoorPhotoUrl && merchants.merchantBusinessUrl && merchants.merchantCashierDeskPhotoUrl){
            this.setData({
                addStorePhotosPerfect: true
            })
        }
    },

    // 商户信息
    merchantInfo: function(){
        common.go("../merchantInfo/merchantInfo");
    },

    // 联系人信息
    linkmanInfo: function(){
        common.go("../linkmanInfo/linkmanInfo");
    },

    // 证照信息
    licenseInfo: function(){
        common.go("../licenseInfo/licenseInfo");
    },

    // 结算信息
    balanceInfo: function(){
        common.go("../balanceInfo/balanceInfo");
    },

    // 门店照片
    addStorePhotos: function(){
        common.go("../addStorePhotos/addStorePhotos");
    },

    // 预览信息
    storeDetail: function(){
        common.go("../storeDetail/storeDetail");
    },

    // 保存
    save: function(){
        var that = this;
        var merchants = this.data.merchants;
        merchants.access_token = wx.getStorageSync("token");
        var merchantInfoPerfect = this.data.merchantInfoPerfect;
        var linkmanInfoPerfect = this.data.linkmanInfoPerfect;
        var licenseInfoPerfect = this.data.licenseInfoPerfect;
        var balanceInfoPerfect = this.data.balanceInfoPerfect;
        var addStorePhotosPerfect = this.data.addStorePhotosPerfect;
        if(merchantInfoPerfect && linkmanInfoPerfect && licenseInfoPerfect && balanceInfoPerfect && addStorePhotosPerfect){
            api("/merchant/add", merchants, "POST", 1)
                .then(t => {
                    if(t.code == 200){
                        wx.showToast({
                            icon: "none",
                            title: '保存成功',
                        })
                        wx.setStorageSync("merchants", "");
                        wx.setStorageSync("citysIndex", "");
                        wx.setStorageSync("adrDetail", "");
                        wx.setStorageSync("ssqAdr", "");
                        that.setData({
                            merchants: {}
                        })
                        setTimeout(function () {
                            wx.navigateBack({
                                delta: 1
                            })
                        }, 1000)
                    }
                })
        }else{
            wx.showToast({
                icon: "none",
                title: '请完善信息',
            })
        }
    }

})