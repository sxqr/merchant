// pages/merchantInfo/merchantInfo.js
const common = require("../../../utils/common.js")
const api = require("../../../utils/ajax.js")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        merchantName: "",
        merchantShortName: "",
        address: "",
        merchants: {},
        address: "",
        citysIndex: [], //给一个初始值索引，因为有三列，所以3个0
        adrDetail: ['北京', '北京市', '东城区']
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
        let merchants = wx.getStorageSync("merchants");
        let citysIndex = wx.getStorageSync("citysIndex");
        let adrDetail = wx.getStorageSync("adrDetail");
        let ssqAdr = wx.getStorageSync("ssqAdr");
        let merchantName = "";
        let merchantShortName = "";
        let address = "";
        if(merchants){
            merchants = merchants
        }else{
            merchants = {}
        }
        if(merchants && merchants.merchantName){
            merchantName = merchants.merchantName
        }
        if(merchants && merchants.merchantShortName){
            merchantShortName = merchants.merchantShortName
        }
        if(merchants && merchants.address){
            address = merchants.address
        }
        if(citysIndex && adrDetail && ssqAdr){
            this.setData({
                citysIndex: citysIndex,
                adrDetail: adrDetail,
                ssqAdr: ssqAdr,
            })
        }
        this.setData({
            merchants: merchants,
            merchantName: merchantName,
            merchantShortName: merchantShortName,
            address: address
        })
        
    },

    // 获取商户全称
    merchantName: function(e){
        this.setData({
            merchantName: e.detail.value
        })
    },

    // 获取商户简称
    merchantShortName: function(e){
        this.setData({
            merchantShortName: e.detail.value
        })
    },

    // 获取详细地址
    address: function(e){
        this.setData({
            address: e.detail.value
        })
    },

    func_changeCitysChange: function(e) {
        console.log(e);
        var detail = e.detail;
        this.setData({
            citysIndex: detail.code,
            ssqAdr: detail.value[0]+detail.value[1]+detail.value[2],
            adrDetail: detail.value
        })
    },

    // 完成
    confirm: function(){
        var merchants = this.data.merchants;
        var merchantName = this.data.merchantName;
        var merchantShortName = this.data.merchantShortName;
        var address = this.data.address;
        var citysIndex = this.data.citysIndex;
        var adrDetail = this.data.adrDetail;
        var ssqAdr = this.data.ssqAdr;
        if(merchantName == ""){
            wx.showToast({
                icon: 'none',
                title: '请输入商户全称',
            })
            return false;
        }
        if(merchantShortName == ""){
            wx.showToast({
                icon: 'none',
                title: '请输入简称',
            })
            return false;
        }
        if(citysIndex.length == 0){
            wx.showToast({
                icon: 'none',
                title: '请选择经营地址',
            })
            return false;
        }
        if(address == ""){
            wx.showToast({
                icon: 'none',
                title: '请输入详细地址',
            })
            return false;
        }
        merchants.merchantName = merchantName;
        merchants.merchantShortName = merchantShortName;
        merchants.address = address;
        merchants.province = citysIndex[0];
        merchants.city = citysIndex[1];
        merchants.area = citysIndex[2];
        wx.setStorageSync("merchants", merchants);
        wx.setStorageSync("citysIndex", citysIndex);
        wx.setStorageSync("adrDetail", adrDetail);
        wx.setStorageSync("ssqAdr", ssqAdr);
        wx.navigateBack({
          delta: 1,
        })
    }

})