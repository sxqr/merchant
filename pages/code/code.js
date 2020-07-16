// pages/code/code.js
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
        qrcode_w:qrcode_w
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        drawQrcode({
            width: qrcode_w,
            height: qrcode_w,
            canvasId: 'canvas',
            text: 'https://baidu.com'
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