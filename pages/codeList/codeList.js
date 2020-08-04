// pages/codeList/codeList.js
const api = require("../../utils/ajax.js");
const common = require("../../utils/common.js");


Page({

    /**
     * 页面的初始数据
     */
    data: {
        codeList: [],
        page: 1,
        limit: 10,
        slectType: "",
        storeNo: "",
        clerkType: "",
        clerkNo: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            slectType: options.slectType,
            storeNo: options.storeNo,
            clerkType: options.clerkType,
            clerkNo: options.clerkNo
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            page: 1,
            limit: 10,
            codeList: []
        })
        let that = this;
        let json = {
            access_token: wx.getStorageSync("access_token"),
            page: 1,
            limit: 10
        };
        getList(that, json);
    },
    //到达底部
    scrollToLower: function (e) {
        let that = this;
        let page = that.data.page;
        let limit = that.data.limit;
        let count = that.data.count;
        if (count > page * limit) {
            page++;
            that.setData({
                page: page
            })
            let json = {
                access_token: wx.getStorageSync("access_token"),
                page: page,
                limit: limit
            };
            getList(that, json);
        }
    },
    // 二维码详情
    goCode: function (e) {
        var receiptCodeNo = e.currentTarget.dataset.code;
        var storeNo = e.currentTarget.dataset.storeno;
        var clerkNo = e.currentTarget.dataset.clerkno;
        if (this.data.slectType) {
            // 二维码绑定到门店
            if (clerkNo || storeNo) {
                wx.showToast({
                    icon: 'none',
                    title: '该二维码已绑定过门店或店员，不能再绑定',
                })
                return false;
            } else {
                let json = {
                    storeNo: this.data.storeNo,
                    receiptCodeNo: receiptCodeNo,
                    access_token: wx.getStorageSync('access_token')
                }
                api("/merchantReceiptCode/bindStore", json, "POST", 1).then(t => {
                    if (t.code == 200) {
                        wx.showToast({
                            icon: 'success',
                            title: '绑定成功',
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
                })
            }
        } else if (this.data.clerkType) {
            // 二维码绑定到店员
            if (clerkNo || storeNo) {
                wx.showToast({
                    icon: 'none',
                    title: '该二维码已绑定过门店或店员，不能再绑定',
                })
                return false;
            } else {
                let json = {
                    clerkNo: this.data.clerkNo,
                    receiptCodeNo: receiptCodeNo,
                    access_token: wx.getStorageSync('access_token')
                }
                api("/merchantReceiptCode/bindClerk", json, "POST", 1).then(t => {
                    if (t.code == 200) {
                        wx.showToast({
                            icon: 'success',
                            title: '绑定成功',
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
                })
            }
        } else {
            common.go('../code/code?code=' + receiptCodeNo);
        }
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
})

function getList(that, json) {
    api("/merchantReceiptCode/getMerCodes", json, "POST", 1)
        .then(t => {
            var codeList = that.data.codeList;
            var newList = t.data;
            for (var i = 0; i < newList.length; i++) {
                codeList.push(newList[i]);
            }
            that.setData({
                codeList: codeList,
                count: t.count
            })
        })
}