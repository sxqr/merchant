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
        urlAddress: "",
        clerkNo: "",
        receiptCodeNo: "",
        flagCode: false,
        phone: "",
        clerkName: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({
            clerkNo: options.clerkNo,
            phone: options.phone,
            clerkName: options.clerkName
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let that = this
        getCode(that);
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
                    api("/merchantReceiptCode/unbindClerk", json, "POST", 1)
                        .then(t => {
                            wx.showToast({
                                icon: 'success',
                                title: '解绑成功',
                            });
                            getCode(_this);
                        })
                }
            }
        })
    },
    // 分配店员二维码
    addCodeImg: function () {
        common.go("../codeList/codeList?clerkType=" + 'clerkType' + "&clerkNo=" + this.data.clerkNo);
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
})

function getCode(that) {
    let json = {
        clerkNo: that.data.clerkNo,
        access_token: wx.getStorageSync('access_token')
    }
    api("/merchantReceiptCode/getCodeByNo", json, 'POST', 1).then(t => {
        if (t.code == 200) {
            if (t.data) {
                that.setData({
                    flagCode: true,
                    urlAddress: t.data.urlAddress,
                    receiptCodeNo: t.data.receiptCodeNo
                })
                drawQrcode({
                    width: qrcode_w,
                    height: qrcode_w,
                    canvasId: 'canvas',
                    text: t.data.urlAddress
                })
            } else {
                that.setData({
                    flagCode: false
                })
            }
        }
    })
}