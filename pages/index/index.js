//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    facility: app.globalData.facility
  },
  onShow: function (){
    console.log(this.data.statusBarHeight);
    wx.stopPullDownRefresh();
    wx.hideHomeButton();
  },
  // 交易查询
  transactionQuery: function(){
    wx.navigateTo({
      url: '../transactionQuery/transactionQuery',
    })
  },
  // 报表
  statement: function(){
    wx.navigateTo({
      url: '../statement/statement',
    })
  },
  // 门店管理
  storeList: function(){
    wx.navigateTo({
      url: '../storeList/storeList',
    })
  },
  // 云音响
  cloudSound: function(){
    wx.navigateTo({
      url: '../cloudSound/cloudSound',
    })
  },
  // 二维码
  codeList: function(){
    wx.navigateTo({
      url: '../codeList/codeList',
    })
  },
  // 我的钱包
  wallet: function(){
    wx.navigateTo({
      url: '../wallet/wallet',
    })
  },
  // 关于我们
  about: function(){
    wx.navigateTo({
      url: '../about/about',
    })
  },
  personal: function(){
    wx.navigateTo({
      url: '../personal/personal',
    })
  },
  onLoad: function (){
    
  }
})
