// pages/walletDetail/walletDetail.js
const common = require("../../utils/common.js");
const api = require("../../utils/ajax.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: [],
        page: 1,
        limit: 10,
        count: 0,
    },
    onLoad: function (option) {

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function () {
        this.setData({
            page: 1,
            limit: 10,
            dataList: []
        })
        let that = this;
        let json = {
            access_token: wx.getStorageSync("access_token"),
            page: 1,
            limit: 10
        };
        storeList(that, json);
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
            storeList(that, json);
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
})

function storeList(that, json) {
    wx.showLoading({
        title: '加载中...',
    })
    api("/merchantWithdraw/applet/wdView", json, "POST", 1)
        .then(t => {
            var dataList = that.data.dataList;
            var newList = t.data;
            for (var i = 0; i < newList.length; i++) {
                dataList.push(newList[i]);
            }
            that.setData({
                dataList: dataList,
                count: t.count
            })
        })
}