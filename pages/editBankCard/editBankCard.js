// pages/addBankCard/addBankCard.js
const api = require("../../utils/ajax.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        bankName: "",
        bankNo: "",
        id: "",
        bankFlag: true,
        backNameList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({
            bankName: options.bankName,
            bankNo: options.bankNo,
            id: options.id
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var json = {
            access_token: wx.getStorageSync('access_token')
        }
        api("/bank/bankNames", json, "POST", 1).then(t => {
            if (t.code == 200) {
                this.setData({
                    backNameList: t.data
                })
            }
        });
    },
    // 隐藏事件
    hidden: function () {
        this.setData({
            bankFlag: true
        })
    },
    //点击子层不去触发父层的隐藏事件
    rf: function (e) {
        return;
    },
    // 现在银行卡弹窗
    openDialog: function () {
        this.setData({
            bankFlag: false
        })
    },
    // 选择银行卡
    slectName: function (e) {
        var name = e.currentTarget.dataset.name;
        this.setData({
            bankName: name,
            bankFlag: true
        })
    },
    bankNo: function (e) {
        this.setData({
            bankNo: e.detail.value
        })
    },
    // 修改银行卡
    editBank: function () {
        let bankNo = this.data.bankNo;
        let bankName = "中国银行";
        if (bankNo == "") {
            wx.showToast({
                icon: 'none',
                title: '请输入银行卡号',
            })
            return false;
        }
        if (bankName == "") {
            wx.showToast({
                icon: 'none',
                title: '请选择所属银行',
            })
            return false;
        }
        let json = {
            id: this.data.id,
            bankName: bankName,
            bankNo: bankNo,
            access_token: wx.getStorageSync('access_token')
        }
        api("/merchantBank/update", json, "POST", 1)
            .then(t => {
                wx.showToast({
                    icon: 'success',
                    title: '修改成功',
                })
                setTimeout(function () {
                    wx.navigateBack({
                        delta: 1
                    })
                }, 1500)
            })
    },
    // 删除银行卡
    deleteBank: function () {
        var _this = this;
        wx.showModal({
            title: "提示",
            content: "您确认删除该银行卡?",
            success(res) {
                if (res.confirm) {
                    let json = {
                        id: _this.data.id,
                        access_token: wx.getStorageSync('access_token')
                    }
                    api("/merchantBank/del", json, "POST", 1)
                        .then(t => {
                            wx.showToast({
                                icon: 'success',
                                title: '删除成功',
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
    }
})