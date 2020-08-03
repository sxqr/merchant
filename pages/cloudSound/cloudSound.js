// pages/cloudSound/cloudSound.js
const api = require("../../utils/ajax.js");
const common = require("../../utils/common.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fixingList: [],
    page: 1,
    limit: 10,
    count: 0,
    slectType: '',
    storeNo: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      slectType: options.slectType,
      storeNo: options.storeNo
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      page: 1,
      limit: 10,
      fixingList: []
    })
    let that = this;
    let json = {
      access_token: wx.getStorageSync("access_token"),
      page: 1,
      limit: 10
    };
    getSound(that, json);
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
        storeName: "",
        page: page,
        limit: limit
      };
      getSound(that, json);
    }
  },
  // 新增设备
  advDevice: function () {
    common.go("../cloudAdd/cloudAdd");
  },
  // 详情
  cloudDetail: function (e) {
    var storeNo = e.currentTarget.dataset.storeno;
    var id = e.currentTarget.dataset.id;
    var fixingvol = e.currentTarget.dataset.fixingvol;
    var storename = e.currentTarget.dataset.storename;
    if (storeNo && this.data.slectType) {
      wx.showToast({
        icon: 'none',
        title: '云音响已绑定过门店',
      })
      return false;
    } else {
      if (this.data.slectType) {
        let json = {
          storeNo: this.data.storeNo,
          cloudHornId: id,
          access_token: wx.getStorageSync('access_token')
        }
        api("/merchantFixing/sound/bindStore", json, "POST", 1).then(t => {
          if (t.code == 200) {
            wx.showToast({
              icon: 'success',
              title: '绑定成功',
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
        })
      } else {
        common.go("../cloudDetail/cloudDetail?id=" + id + "&fixingVol=" + fixingvol + "&storeName=" + storename);
      }
    }

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
})

function getSound(that, json) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  api("/merchantFixing/sound/getMerchantFixingList", json, "POST", 1)
    .then(t => {
      var storeList = that.data.fixingList;
      var newStoreList = t.data;
      for (var i = 0; i < newStoreList.length; i++) {
        storeList.push(newStoreList[i]);
      }
      that.setData({
        fixingList: storeList,
        count: t.count
      })
    })
}