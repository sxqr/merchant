// pages/cloudDetail/cloudDetail.js
const api = require("../../utils/ajax.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cloudHornId: "",
        fixingVol: "",
        storeName: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            cloudHornId: options.id,
            fixingVol: options.fixingVol,
            storeName: options.storeName
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    sliderValue: function (e) {
        this.setData({
            fixingVol: e.detail.value
        });
        var that = this;
        var json = {
            cloudHornId: that.data.cloudHornId,
            fixingVol: e.detail.value,
            access_token: wx.getStorageSync('access_token')
        }
        setCloudHornVol(that, json)
    },
    // 音量加
    add: function () {
        var that = this;
        var fixingVol = that.data.fixingVol;
        if (fixingVol < 100) {
            fixingVol++;
            that.setData({
                fixingVol: fixingVol
            })
        } else {
            wx.showToast({
                icon: 'none',
                title: '已经是最大音量了',
            })
        }
        var json = {
            cloudHornId: that.data.cloudHornId,
            fixingVol: that.data.fixingVol,
            access_token: wx.getStorageSync('access_token')
        }
        setCloudHornVol(that, json)
    },
    // 音量减
    dec: function () {
        var that = this;
        var fixingVol = that.data.fixingVol;
        if (fixingVol > 0) {
            fixingVol--;
            that.setData({
                fixingVol: fixingVol
            })
        } else {
            wx.showToast({
                icon: 'none',
                title: '已经是最小音量了',
            })
        }
        var json = {
            cloudHornId: that.data.cloudHornId,
            fixingVol: that.data.fixingVol,
            access_token: wx.getStorageSync('access_token')
        }
        setCloudHornVol(that, json)
    },
    // 商户解绑云音响
    unbindCloudHorn: function () {
        var _this = this;
        wx.showModal({
            title: "提示",
            content: "您确定删除设备?",
            success(res) {
                if (res.confirm) {
                    let json = {
                        cloudHornId: _this.data.cloudHornId,
                        access_token: wx.getStorageSync('access_token')
                    }
                    api("/merchantFixing/sound/unbindCloudHorn", json, "POST", 1)
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
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
})
//调节音量
function setCloudHornVol(that, json) {
    api("/merchantFixing/sound/setCloudHornVol", json, "POST", 1)
        .then(t => {

        })
}