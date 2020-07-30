// pages/storeDetail/storeDetail.js
const common = require("../../utils/common.js");
const api = require("../../utils/ajax.js");

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: app.globalData.statusBarHeight,
        facility: app.globalData.facility,
        storeClerk:[],
        storeNo:"",//门店编号
        id:"",//门店ID
        page:1,
        limit: 10,
        count: 0,
        storeName:"",//门店名称
        detailAddr:"",//门店地址
        isFixing:false,//是否绑定云音响
        isReceiptCode:false,//是否绑定二维码
    },
    back: function(){
        wx.navigateBack({
          delta: 1,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            storeNo:options.storeNo,
            id:options.id
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            page: 1,
            limit: 10,
            storeClerk: []
          })
          let that = this;
          let json = {
            access_token: wx.getStorageSync("access_token"),
            storeNo:this.data.storeNo,
            page: 1,
            limit: 10
          };
          storeClerk(that, json);
        // 获取门店详情
        let json1 = {
            id:this.data.id,
            access_token: wx.getStorageSync("access_token"),
        }
        api("/mercStore/getStore",json1,"POST",1).then(t => {
            if(t.code == 200){
                this.setData({
                    storeName:t.data.storeName,
                    detailAddr:t.data.detailAddr,
                    isFixing:t.data.isFixing,
                    isReceiptCode:t.data.isReceiptCode
                })
            }
        })
    },
    // 新增店员
    addStaff:function(){
        common.go("../addStaff/addStaff?storeNo=" + this.data.storeNo);
    },
      //到达底部
    scrollToLower: function (e) {
        let that = this;
        let page = that.data.page;
        let limit = that.data.limit;
        let count = that.data.count;
        if (count > page * limit) {
            page++;
            that.setData({
                page: page
            })
            let json = {
                access_token: wx.getStorageSync("access_token"),
                storeNo:this.data.storeNo,
                page: page,
                limit: limit
            };
            storeClerk(that, json);
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
})
function storeClerk(that, json) {
    api("/storeClerk/list", json, "POST",1)
      .then(t => {
        var storeList = that.data.storeClerk;
        var newStoreList = t.data;
        for (var i = 0; i < newStoreList.length; i++) {
            storeList.push(newStoreList[i]);
        }
        console.log(storeList);
        that.setData({
            storeClerk: storeList,
            count: t.count
        })
      })
  }