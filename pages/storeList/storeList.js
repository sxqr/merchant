// pages/storeList/storeList.js
const common = require("../../utils/common.js");
const api = require("../../utils/ajax.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        storeList: [],
        page: 1,
        limit: 10,
        count: 0,
        storeName: ""
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
        this.setData({
            page: 1,
            limit: 10,
            storeList: []
        })
        let that = this;
        let json = {
            access_token: wx.getStorageSync("access_token"),
            storeName: "",
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
                storeName: "",
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

    },
    // 新增门店
    addStore: function () {
        common.go('../addStore/addStore?editType=' + "add");
    },
    // 门店详情
    storeDetail: function (e) {
        var storeno = e.currentTarget.dataset.storeno;
        var id = e.currentTarget.dataset.id;
        common.go('../storeDetail/storeDetail?storeNo=' + storeno + "&id=" + id);
    },
})

function storeList(that, json) {
    wx.showLoading({
        title: '加载中...',
        mask: true
    })
    api("/mercStore/list", json, "POST", 1)
        .then(t => {
            var storeList = that.data.storeList;
            var newStoreList = t.data;
            for (var i = 0; i < newStoreList.length; i++) {
                storeList.push(newStoreList[i]);
            }
            console.log(storeList);
            that.setData({
                storeList: storeList,
                count: t.count
            })
        })
}