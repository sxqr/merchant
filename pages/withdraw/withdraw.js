// pages/withdraw/withdraw.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 输入框参数设置
        inputData: {
          input_value: "",//输入框的初始内容
          value_length: 0,//输入框密码位数
          isNext: false,//是否有下一步的按钮
          get_focus: false,//输入框的聚焦状态
          focus_class: false,//输入框聚焦样式
          value_num: [1, 2, 3, 4, 5, 6],//输入框格子数
          height: "80rpx",//输入框高度
          width: "490rpx",//输入框宽度
          see: false,//是否明文展示
          interval: true,//是否显示间隔格子
        },
        password:"",
        show:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.getSystemInfo({
            success: function (res) {
              console.log(res.model)
              console.log(res.pixelRatio)
              console.log(res.windowWidth)
              console.log(res.windowHeight)
              console.log(res.language)
              console.log(res.version)
              console.log(res.platform)
            }
        })
    },
    recharge: function(){
        this.setData({
            'inputData.get_focus':true,
            'inputData.focus_class':true,
            show:true
        });
    },
    clos: function(){
        this.setData({
            show:false
        })
    },
    valueSix(e) {
        console.log(e);
        // 模态交互效果
        this.setData({
            show:false
        });
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        })
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