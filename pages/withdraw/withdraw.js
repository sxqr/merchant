// pages/withdraw/withdraw.js
const api = require("../../utils/ajax.js");
const common = require("../../utils/common.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 输入框参数设置
        inputData: {
            input_value: "", //输入框的初始内容
            value_length: 0, //输入框密码位数
            isNext: false, //是否有下一步的按钮
            get_focus: false, //输入框的聚焦状态
            focus_class: false, //输入框聚焦样式
            value_num: [1, 2, 3, 4, 5, 6], //输入框格子数
            height: "80rpx", //输入框高度
            width: "490rpx", //输入框宽度
            see: false, //是否明文展示
            interval: true, //是否显示间隔格子
        },
        password: "",
        show: false,
        banckDialog: true, // 银行卡弹窗
        backNameList: [],
        bankNo: "",
        bankName: "",
        amount: "",
        usableAmount: "",
        prefix: "",
        suffix: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.getSystemInfo({
            success: function (res) {
                //   console.log(res.model)
                //   console.log(res.pixelRatio)
                //   console.log(res.windowWidth)
                //   console.log(res.windowHeight)
                //   console.log(res.language)
                //   console.log(res.version)
                //   console.log(res.platform)
            }
        });
        this.setData({
            usableAmount: options.amount
        })
        console.log(numMulti(4989.25, 100));
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        api("/merchant/getMerchant", {
            access_token: wx.getStorageSync('access_token')
        }, "POST", 1).then(t => {
            if (t.code == 200) {
                if (!t.data.payPwd) {
                    wx.showModal({
                        title: "提示",
                        confirmText: "去设置",
                        content: "您未设置支付密码，请先设置支付密码",
                        success(res) {
                            if (res.confirm) {
                                common.go("../payPassword/payPassword");
                            }else{
                                wx.navigateBack({
                                  delta: 1
                                })
                            }
                        }
                    })
                }
            }
        });
        api("/merchantBank/getMerBanks", {
            access_token: wx.getStorageSync('access_token')
        }, "POST", 1).then(t => {
            if (t.code == 200) {
                this.setData({
                    backNameList: t.data,
                    bankNo: t.data[0].bankNo,
                    bankName: t.data[0].bankName,
                    prefix: "（",
                    suffix: "）"
                })
            }
        });
    },
    amountChange: function (e) {
        var amount = e.detail.value;
        this.setData({
            amount: amount
        })
    },
    recharge: function () {
        var amount = parseFloat(this.data.amount);
        var usableAmount = parseFloat(this.data.usableAmount);
        if (amount && amount > 0) {
            if (amount > usableAmount) {
                wx.showToast({
                    icon: 'none',
                    title: '可提现金额不足'
                })
            } else if(!(/^[0-9]+[0-9]*[0-9]*$/.test(amount)) || amount < 100) {
                wx.showToast({
                    icon: 'none',
                    title: '提现金额必须是大于等于100的正整数'
                })
            } else {
                this.setData({
                    'inputData.get_focus': true,
                    'inputData.focus_class': true,
                    show: true
                });
            }
        } else {
            wx.showToast({
                icon: 'none',
                title: '请输入提现金额'
            })
        }

    },
    allRecharge: function () {
        this.setData({
            amount: this.data.usableAmount
        })
    },
    clos: function () {
        this.setData({
            show: false
        })
    },
    valueSix(e) {
        console.log(e);
        // 模态交互效果
        this.setData({
            show: false
        });
        let json = {
            bankNo: this.data.bankNo,
            amount: numMulti(this.data.amount, 100),
            payPwd: e.detail,
            access_token: wx.getStorageSync('access_token')
        }
        if (!(/^[0-9]+[0-9]*[0-9]*$/.test(json.amount/100)) || json.amount/100 < 100) {
            wx.showToast({
                icon: 'none',
                title: '提现金额必须是大于等于100的正整数'
            })
        } else {
            api("/merchantWithdraw/add", json, "POST", 1).then(t => {
                if (t.code == 200) {
                    wx.showToast({
                        icon: 'success',
                        title: '申请提现成功',
                    })
                    setTimeout(function () {
                        wx.navigateBack({
                            delta: 1
                        })
                    }, 1500)
                }
            }).catch((response) => {
                wx.showToast({
                    icon: 'none',
                    title: response.msg
                })
            });
        }
    },
    // 选择银行卡
    slectBankCard: function () {
        this.setData({
            banckDialog: false
        })
    },
    // 关闭弹窗
    closeBanck: function () {
        this.setData({
            banckDialog: true
        })
    },
    ref: function () {
        return false;
    },
    slectBanck: function (e) {
        this.setData({
            bankNo: e.currentTarget.dataset.card,
            bankName: e.currentTarget.dataset.name,
            banckDialog: true,
            prefix: "（",
            suffix: "）"
        })
    }
})

/**
 * num1被乘数 | num2乘数
 */
function numMulti(num1, num2) {
    var baseNum = 0;
    try {
     baseNum += num1.toString().split(".")[1].length;
    } catch (e) {
    }
    try {
     baseNum += num2.toString().split(".")[1].length;
    } catch (e) {
    }
    return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
};