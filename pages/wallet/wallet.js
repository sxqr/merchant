// pages/wallet/wallet.js
const common = require("../../utils/common.js");
const api = require("../../utils/ajax.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        usableAmount: "0.00", //可用余额
        bankCardlengh: 0,
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
        wx.showLoading({
          title: '加载中...',
          mask:true
        })
        api("/merchantAccount/getAmount", {
                access_token: wx.getStorageSync('access_token')
            }, "POST", 1)
            .then(t => {
                if (t.code == 200) {
                    if(t.data != ""){
                        var usableAmount = (t.data.usableAmount / 100).toFixed(2);
                        this.setData({
                            usableAmount: usableAmount,
                        })
                    }
                }
            });

        api("/merchantBank/getMerBanks", {
            access_token: wx.getStorageSync('access_token')
        }, "POST", 1).then(t => {
            if (t.code == 200) {
                this.setData({
                    bankCardlengh: t.data.length,
                })
            }
        });
    },
    // 提现
    withdraw: function () {
        if (this.data.bankCardlengh > 0) {
            common.go('../withdraw/withdraw?amount=' + this.data.usableAmount)
        } else {
            wx.showToast({
                icon: 'none',
                title: '请先绑定银行卡号'
            })
        }
    },
    // 充值
    recharge: function () {
        wx.showToast({
          icon: 'none',
          title: '开发中',
        })
        // common.go('../recharge/recharge')
    },
    // 钱包明细
    walletDetail: function () {
        common.go('../walletDetail/walletDetail')
    },
    // 银行卡
    bankCard: function () {
        common.go('../bankCard/bankCard')
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
})