//获取应用实例
const common = require("../../utils/common.js");
const api = require("../../utils/ajax.js");

const app = getApp()

Page({
  data: {
    // 输入框参数设置
    inputData: {
      input_value: "", //输入框的初始内容
      value_length: 0, //输入框密码位数
      isNext: true, //是否有下一步的按钮
      get_focus: true, //输入框的聚焦状态
      focus_class: true, //输入框聚焦样式
      value_num: [1, 2, 3, 4, 5, 6], //输入框格子数
      height: "98rpx", //输入框高度
      width: "604rpx", //输入框宽度
      see: false, //是否明文展示
      interval: true, //是否显示间隔格子
    },
    password: "",
    firstPassword: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      firstPassword: options.password
    })
  },
  onShow: function () {

  },
  nextStep: function () {
    var password = this.data.password;
    var firstPassword = this.data.firstPassword;
    if (password == "") {
      wx.showToast({
        icon: 'none',
        title: '请再次确认密码',
      })
    } else if (password == firstPassword) {
      let json = {
        payPassword: password,
        access_token: wx.getStorageSync('access_token')
      }
      api("/merchant/updatePayPwd", json, "POST", 1).then(t => {
        if (t.code == 200) {
          wx.showToast({
            icon: 'success',
            title: '设置成功',
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 2
            })
          }, 1500)
        }
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '两次密码不一致',
      })
      var str = 'inputData.input_value';
      var str1 = "inputData.value_length";
      this.setData({
        [str]: "",
        [str1]: 0,
        password: ""
      })
    }
  },
  // 当组件输入数字6位数时的自定义函数
  valueSix(e) {
    this.setData({
      password: e.detail
    })
  }
})