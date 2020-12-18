// pages/code/code.js
const api = require("../../utils/ajax.js");
const common = require("../../utils/common.js");
const drawQrcode = require("../../utils/weapp.qrcode.js");
const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;
// 360rpx 在6s上为 180px
const qrcode_w = 360 / rate;


Page({

    /**
     * 页面的初始数据
     */
    data: {
        qrcode_w: qrcode_w,
        receiptCodeNo: '',
        urlAddress: '',
        merchantName: '',
        storeNo: '',
        clerkNo: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            receiptCodeNo: options.code,
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let json = {
            receiptCodeNo: this.data.receiptCodeNo,
            access_token: wx.getStorageSync('access_token')
        }
        wx.showLoading({
            title: '加载中...',
            mask: true
        })
        api("/merchantReceiptCode/getCode", json, 'POST', 1).then(t => {
            wx.hideLoading();
            if (t.code == 200) {
                this.setData({
                    urlAddress: t.data.urlAddress,
                    merchantName: t.data.merchantName,
                    receiptCodeNo: t.data.receiptCodeNo,
                    storeNo: t.data.storeNo,
                    clerkNo: t.data.clerkNo
                })
                drawQrcode({
                    width: qrcode_w,
                    height: qrcode_w,
                    canvasId: 'canvas',
                    text: t.data.urlAddress
                })
            } else {
                wx.showToast({
                    icon: 'none',
                    title: t.msg
                })
            }
        }).catch((response) => {
            wx.showToast({
              icon: 'none',
              title: response.msg
            })
        });
    },
    // 解绑二维码
    unbind: function () {
        let _this = this;
        wx.showModal({
            title: "提示",
            content: "您确定解绑二维码?",
            success(res) {
                if (res.confirm) {
                    let json = {
                        receiptCodeNo: _this.data.receiptCodeNo,
                        access_token: wx.getStorageSync('access_token')
                    }
                    api("/merchantReceiptCode/unbindStore", json, "POST", 1)
                        .then(t => {
                            wx.showToast({
                                icon: 'success',
                                title: '解绑成功',
                            })
                            setTimeout(function () {
                                wx.navigateBack({
                                    delta: 1
                                })
                            }, 1500)
                        })
                }
            }
        })
    },


    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})