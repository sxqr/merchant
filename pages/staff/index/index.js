//index.js
//获取应用实例
const app = getApp()
const common = require("../../../utils/common.js")
const api = require("../../../utils/ajax.js")

Page({
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    facility: app.globalData.facility,
    id: "",
    accountName: "",
    headUrl: ""
  },
  onShow: function (){
    console.log(this.data.statusBarHeight);
    wx.stopPullDownRefresh();
    wx.hideHomeButton();
    var that = this;
    var json = {
      access_token: wx.getStorageSync("token")
    }
    // 获取个人信息
    api("/workUser/getWork", json, "POST", 1)
      .then(t => {
        console.log(t);
        if(t.code == 200){
          wx.setStorageSync("id", t.data.id);
          wx.setStorageSync("accountName", t.data.accountName);
          wx.setStorageSync("headUrl", t.data.headUrl);
          that.setData({
            id: t.data.id,
            accountName: t.data.accountName,
            headUrl: t.data.headUrl
          })
        }
      })

    // 获取工作人员统计
    api("/txnOrder/workHome", json, "POST", 1)
      .then(t => {
        console.log(t);
        if(t.code == 200){
          that.setData({
            merCount: t.data.merCount,
            todayTxAmount: (t.data.todayTxAmount/100).toFixed(2),
            yesTxAmount: (t.data.yesTxAmount/100).toFixed(2)
          })
        }
      })
  },
  // 交易查询
  transactionQuery: function(){
    wx.navigateTo({
      url: '../transactionQuery/transactionQuery',
    })
  },
  personal: function(){
    wx.navigateTo({
      url: '../personal/personal',
    })
  },
  onLoad: function (){
    
  },
  // 新增商户
  merchantList: function(){
    common.go("../merchantList/merchantList");
  },
  // 进件状态
  checkList: function(){
    common.go("../checkList/checkList");
  },
  // 业绩
  performan: function(){
    common.go("../performan/performan");
  },
  // 消息通知
  notification: function(){
    common.go("../notification/notification");
  },
})
