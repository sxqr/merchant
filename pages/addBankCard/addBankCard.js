// pages/addBankCard/addBankCard.js
const api = require("../../utils/ajax.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        bankName: "",
        bankNo: "",
        bankId:"",
        bankFlag: true,
        backNameList: []
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
    // 关闭弹窗
    closeBanck: function () {
        this.setData({
            bankFlag: true
        })
    },
    
    //点击子层不去触发父层的隐藏事件
    rf: function (e) {
        return;
    },
    // 选择银行卡弹窗
    openDialog: function () {
        this.setData({
            bankFlag: false
        })
    },
    // 选择银行卡
    slectName: function (e) {
        var name = e.currentTarget.dataset.name;
        var bankId = e.currentTarget.dataset.id;
        this.setData({
            bankName: name,
            bankId: bankId,
            bankFlag: true
        })
    },
    bankNo: function (e) {
        this.setData({
            bankNo: e.detail.value
        })
    },
    // 添加银行卡
    addBank: function () {
        let bankNo = this.data.bankNo;
        let bankId = this.data.bankId;
        if (bankNo == "") {
            wx.showToast({
                icon: 'none',
                title: '请输入银行卡号',
            })
            return false;
        }
        if (bankId == "") {
            wx.showToast({
                icon: 'none',
                title: '请选择所属银行',
            })
            return false;
        }
        let json = {
            bankId: bankId,
            bankNo: bankNo,
            access_token: wx.getStorageSync('access_token')
        }
        api("/merchantBank/add", json, "POST", 1)
            .then(t => {
                wx.showToast({
                    icon: 'success',
                    title: '添加成功',
                })
                setTimeout(function () {
                    wx.navigateBack({
                        delta: 1
                    })
                }, 1500)
            })
    }
})