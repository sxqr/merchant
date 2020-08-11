// pages/about/about.js
const common = require("../../utils/common.js")

Page({

    /**
     * 页面的初始数据
     */
    data: {

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

    },

    //协议
    protocol: function(e){
        var type = e.currentTarget.dataset.type;
        common.go("../protocol/protocol?type=" + type);
    }

})