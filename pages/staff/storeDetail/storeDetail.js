// pages/storeDetail/storeDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        merchants: {},
        ssqAdr: ""
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
            merchants: wx.getStorageSync("merchants"),
            ssqAdr: wx.getStorageSync("ssqAdr")
        })
    },

    // 预览图片
    preview: function(e){
        var img = e.currentTarget.dataset.img;
        console.log(img);
        wx.previewImage({
            current: img,
            urls: [img],
            success: function(res) {
              console.log(res)
            }
        })
    },

    // 重新编辑
    edit: function(){
        wx.navigateBack({
            delta: 1
        })
    }

})