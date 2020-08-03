// pages/cloudAdd/cloudAdd.js
const api = require("../../utils/ajax");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cloudHornId: ""
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
    cloudHornId: function (e) {
        this.setData({
            cloudHornId: e.detail.value
        });
    },
    addCloud: function () {
        var cloudHornId = this.data.cloudHornId;
        if (cloudHornId == "") {
            wx.showToast({
                icon: 'none',
                title: '请输入云音响编号',
            })
            return false;
        }
        wx.showLoading({
            title: '加载中...',
            mask: true
        })
        var json = {
            cloudHornId: cloudHornId,
            access_token: wx.getStorageSync('access_token')
        }
        api("/merchantFixing/sound/bindCloudHorn", json, "POST", 1).then(t => {
            if (t.code == 200) {
                wx.showToast({
                    icon: 'success',
                    title: '添加成功',
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
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
})