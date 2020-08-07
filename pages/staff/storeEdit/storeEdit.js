// pages/staff/storeEdit/storeEdit.js
const app = getApp();
const api = require("../../../utils/ajax.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.data.url,
    merchants: {},
    citysIndex: [], //给一个初始值索引，因为有三列，所以3个0
    adrDetail: ['北京', '北京市', '东城区'],
    ssqAdr: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
    var merchantNo = options.merchantNo;
    if(merchantNo){
      // 查询商户
      let json = {
        access_token: wx.getStorageSync('token'),
        merchantNo: merchantNo
      }
      api("/merchant/queryMerInfoByNo", json, "POST", 1)
        .then(t => {
          if(t.code == 200){
            let merchants = this.data.merchants;
            merchants.id = t.data.id;
            merchants.status = t.data.status;
            merchants.merchantName = t.data.merchantName;
            merchants.merchantShortName = t.data.merchantShortName;
            merchants.province = t.data.province;
            merchants.city = t.data.city;
            merchants.area = t.data.area;
            merchants.address = t.data.address;
            merchants.contactName = t.data.contactName;
            merchants.contactMobile = t.data.contactMobile;
            merchants.legalPersonCardFrontUrl = t.data.legalPersonCardFrontUrl;
            merchants.legalPersonCardReverseUrl = t.data.legalPersonCardReverseUrl;
            merchants.businessLicenseUrl = t.data.businessLicenseUrl;
            merchants.settleName = t.data.settleName;
            merchants.settleNo = t.data.settleNo;
            merchants.merchantDoorPhotoUrl = t.data.merchantDoorPhotoUrl;
            merchants.merchantBusinessUrl = t.data.merchantBusinessUrl;
            merchants.merchantCashierDeskPhotoUrl = t.data.merchantCashierDeskPhotoUrl;
            let area = merchants.area;
            // 获取省市区
            let json = {
              id: area
            }
            api("/area/getList", json, "POST", 1)
              .then(t => {
                if(t.code == 200){
                  let provinceName = t.data[2].areaname;
                  let cityName = t.data[1].areaname;
                  let areaName = t.data[0].areaname;
                  this.setData({
                    ssqAdr: t.data[0].fullname,
                    adrDetail: [provinceName, cityName, areaName]  
                  })
                }
              })
            this.setData({
              merchants: merchants,
            })
          }
        })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  // 修改商户全称
  merchantName: function(e){
    let merchants = this.data.merchants;
    merchants.merchantName = e.detail.value;
    this.setData({
      merchants: merchants
    })
  },

  // 修改简称
  merchantShortName: function(e){
    let merchants = this.data.merchants;
    merchants.merchantShortName = e.detail.value;
    this.setData({
      merchants: merchants
    })
  },

  // 修改地址
  func_changeCitysChange: function(e) {
    let merchants = this.data.merchants;
    var detail = e.detail;
    merchants.province = detail.code[0];
    merchants.city = detail.code[1];
    merchants.area = detail.code[2];
    this.setData({
        citysIndex: detail.code,
        ssqAdr: detail.value[0]+detail.value[1]+detail.value[2],
        adrDetail: detail.value
    })
},

  // 修改详细地址
  address: function(e){
    let merchants = this.data.merchants;
    merchants.address = e.detail.value;
    this.setData({
      merchants: merchants
    })
  },

  // 修改姓名
  contactName: function(e){
    let merchants = this.data.merchants;
    merchants.contactName = e.detail.value;
    this.setData({
      merchants: merchants
    })
  },

  // 修改电话
  contactMobile: function(e){
    let merchants = this.data.merchants;
    merchants.contactMobile = e.detail.value;
    this.setData({
      merchants: merchants
    })
  },

  // 上传正面照
  legalPersonCardFrontUrl: function(){
    let merchants = this.data.merchants;
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
            console.log(res);
            wx.hideLoading()
            var data = JSON.parse(res.data);
            if(data.code == 200){
              merchants.legalPersonCardFrontUrl = data.data;
              that.setData({
                merchants: merchants
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
  },

  // 上传反面照
  legalPersonCardReverseUrl: function(){
    let merchants = this.data.merchants;
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
            wx.hideLoading()
            var data = JSON.parse(res.data);
            if(data.code == 200){
              merchants.legalPersonCardReverseUrl = data.data;
              that.setData({
                merchants: merchants
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
  },

  // 上传营业执照
  businessLicenseUrl: function(){
    let merchants = this.data.merchants;
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
            wx.hideLoading()
            var data = JSON.parse(res.data);
            if(data.code == 200){
              merchants.businessLicenseUrl = data.data;
              that.setData({
                merchants: merchants
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
  },

  // 修改结算人姓名
  settleName: function(e){
    let merchants = this.data.merchants;
    merchants.settleName = e.detail.value;
    this.setData({
      merchants: merchants
    })
  },

  // 修改身份证号
  settleNo: function(e){
    let merchants = this.data.merchants;
    merchants.settleNo = e.detail.value;
    this.setData({
      merchants: merchants
    })
  },

  //上传门头照
  merchantDoorPhotoUrl: function(){
    let merchants = this.data.merchants;
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
            wx.hideLoading()
            var data = JSON.parse(res.data);
            if(data.code == 200){
              merchants.merchantDoorPhotoUrl = data.data;
              that.setData({
                merchants: merchants
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
  },

  //上传经营场所照
  merchantBusinessUrl: function(){
    let merchants = this.data.merchants;
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
            wx.hideLoading()
            var data = JSON.parse(res.data);
            if(data.code == 200){
              merchants.merchantBusinessUrl = data.data;
              that.setData({
                merchants: merchants
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
  },

  //上传收银台照
  merchantCashierDeskPhotoUrl: function(){
    let merchants = this.data.merchants;
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
              wx.hideLoading()
              var data = JSON.parse(res.data);
              if(data.code == 200){
                merchants.merchantCashierDeskPhotoUrl = data.data;
                that.setData({
                  merchants: merchants
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
  },

  // 提交
  confirm: function(){
    let merchants = this.data.merchants;
    merchants.access_token = wx.getStorageSync('token');
    //修改商户
    api("/merchant/update", merchants, "POST", 1)
      .then(t => {
        if(t.code == 200){
          //修改状态
          let json = {
            id: merchants.id,
            access_token: wx.getStorageSync('token')
          }
          api("/merchant/updateMerStatus", json, "POST", 1)
            .then(t => {
              if(t.code == 200){
                wx.showToast({
                  icon: "none",
                  title: '修改成功',
                })
                wx.navigateBack({
                  delta: 1
                })
              }
            })
        }
      })
  }
})