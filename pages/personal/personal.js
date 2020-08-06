// pages/personal/personal.js
const app = getApp();
const common = require("../../utils/common.js");
const api = require("../../utils/ajax.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
      url: app.data.url,
      headUrl: "",
      userId: "",
      nickname: '',
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
        headUrl: wx.getStorageSync("headUrl"),
        userId: wx.getStorageSync("userId"),
        nickname: wx.getStorageSync('nickname')
      })
    },
    // 上传头像
    uploadHeadImg: function(e){
      var that = this;
      wx.chooseImage({
        count: 1,
        success: (res) => {
          wx.showLoading({
            title: '图片上传中...',
          })
          wx.uploadFile({
            filePath: res.tempFilePaths[0],
            name: 'file',
            url: that.data.url + '/file/upload',
            success(res){
              wx.hideLoading();
              var data = JSON.parse(res.data);
              if(data.code == 200){
                var headUrl = data.data;
                // 修改头像
                var json = {
                  access_token: wx.getStorageSync("access_token"),
                  headUrl: headUrl
                }
                api("/merchant/updateHead", json, "POST", 1)
                  .then(t => {
                    if(t.code == 200){
                        wx.showToast({
                            icon:'none',
                            title: '修改成功',
                        })
                        wx.setStorageSync("headUrl", headUrl);
                        that.setData({
                            headUrl: headUrl
                        })
                    }
                  })
              }else{
                wx.showToast({
                  icon:'none',
                  title: data.msg,
                })
              }
            }
          })
        },
      })
    }
})