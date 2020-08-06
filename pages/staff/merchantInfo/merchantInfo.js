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
        provinces: [],
        citys: [],
        areas: [],
        address: "",
        citysIndex: [], //给一个初始值索引，因为有三列，所以3个0
        citysIndexChange: [0, 0, 0]
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
        var that = this;
        let merchants = wx.getStorageSync("merchants");
        let citysIndex = wx.getStorageSync("citysIndex");
        let cityArray = wx.getStorageSync("cityArray");
        let ssqAdr = wx.getStorageSync("ssqAdr");
        let provinces = wx.getStorageSync("provinces");
        let citys = wx.getStorageSync("citys");
        let areas = wx.getStorageSync("areas");
        let merchantName = "";
        let merchantShortName = "";
        let address = "";
        if (cityArray) {
          cityArray = cityArray;
        } else {
          //定义三列空数组
          cityArray = [
            [],
            [],
            [],
          ];
          // 获取省数据
          api("/area/getProvinceList", {}, "POST", 1)
          .then(t => {
              if(t.code == 200){
                that.setData({
                    provinces: t.data
                })
                //第一列
                for (let i = 0, len = t.data.length; i < len; i++) {
                    cityArray[0].push(t.data[i]["name"]);
                }  
                // 获取市数据
                var json = {
                    parentId: t.data[0].id
                }
                api("/area/getCityList", json, "POST", 1)
                    .then(t => {
                        if(t.code == 200){
                            that.setData({
                                citys: t.data
                            })
                            //第二列
                            for (let i = 0, len = t.data.length; i < len; i++) {
                                cityArray[1].push(t.data[i]["name"]);
                            }
                            var json = {
                                parentId: t.data[0].id
                            }
                            api("/area/getAreaList", json, "POST", 1)
                                .then(t => {
                                    if(t.code == 200){
                                        that.setData({
                                            areas: t.data
                                        })
                                        //第三列
                                        for (let i = 0, len = t.data.length; i < len; i++) {
                                            cityArray[2].push(t.data[i]["name"]);
                                        }
                                        wx.setStorageSync('global_cityData', cityArray);
                                        that.setData({
                                            cityArray: cityArray
                                        });
                                    }
                                })
                        }
                    })
              }
          })
        }
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
        if(citysIndex && cityArray && ssqAdr && provinces && citys && areas){
            this.setData({
                citysIndex: citysIndex,
                cityArray: cityArray,
                ssqAdr: ssqAdr,
                provinces: provinces,
                citys: citys,
                areas: areas,
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
        var that = this;
        var cityArray = that.data.cityArray;
        var ssqAdr='';
        if (that.data.ssq == undefined){
          //下面方法中没有设置ssq，应该给它默认值 ，此时citysIndex相当于[0,0,0]
          var citysIndex = [0, 0, 0];
          for (let i in citysIndex) {
            ssqAdr += cityArray[i][citysIndex[i]]
          }
        }else{
            ssqAdr = that.data.ssq;
            that.setData({
                citysIndex: that.data.citysIndexChange
            })
        }
        that.setData({
            ssqAdr: ssqAdr
        })
    },
    func_changeCitysChangeColumn: function(e) {
        var that = this;
        var cityArray = that.data.cityArray;
        // 获取省数据
        let provinces = this.data.provinces;

        var firstPitch = 0; // 选中省列的下标
        var secondPitch = 0; // 选中市列的下标
        var thirdPitch = 0; // 选中区列的下标
    
        var list1 = []; //存放第二列数据，即市的列
        var list2 = []; //存放第三列数据，即区的列
        
        var citysIndexChange = [];
        //主要是注意地址文件中的字段关系，省、市、区关联的字段有 sheng、di、level
        switch (e.detail.column) {
          case 0:
            //滑动左列
            for (let i = 0, len = provinces.length; i < len; i++) {
                if (provinces[i]['name'] == cityArray[0][e.detail.value]) {
                    firstPitch = i;
                    // 获取市数据
                    var json = {
                        parentId: provinces[i].id
                    }
                    api("/area/getCityList", json, "POST", 1)
                        .then(t => {
                            if(t.code == 200){
                                // 第二列
                                for (let i = 0, len = t.data.length; i < len; i++) {
                                    list1.push(t.data[i]["name"]);
                                }
                                that.setData({
                                    "cityArray[1]": list1,//重新赋值中列数组，即联动了市
                                    citys: t.data
                                });
                                var json = {
                                    parentId: t.data[0].id
                                }
                                api("/area/getAreaList", json, "POST", 1)
                                    .then(t => {
                                        if(t.code == 200){
                                            // 第三列
                                            for (let i = 0, len = t.data.length; i < len; i++) {
                                                list2.push(t.data[i]["name"]);
                                            }
                                            that.setData({
                                                "cityArray[2]": list2,//重新赋值中列数组，即联动了市
                                            });
                                            var ssq = cityArray[0][e.detail.value] + list1[0] + list2[0]+'';
                                        }
                                    })
                            }
                        })
                }
            }
            citysIndexChange = [e.detail.value, 0, 0];
            that.setData({
                citysIndexChange: citysIndexChange
            });  
            break;
          case 1:
            //滑动中列
            list1 = cityArray[1];
            for (let i = 0, len = provinces.length; i < len; i++) {
                if (i == firstPitch) { //选中的省
                    // 获取市数据
                    var citys = that.data.citys;
                    for (let i = 0, len = citys.length; i < len; i++) {
                        if (citys[i]['name'] == cityArray[1][e.detail.value]) {
                            secondPitch = i;
                            // 获取区数据
                            var json = {
                                parentId: citys[i].id
                            }
                            api("/area/getAreaList", json, "POST", 1)
                                .then(t => {
                                    if(t.code == 200){
                                        // 第三列
                                        for (let i = 0, len = t.data.length; i < len; i++) {
                                            list2.push(t.data[i]["name"]);
                                        }
                                        that.setData({
                                            "cityArray[2]": list2,//重新赋值中列数组，即联动了市
                                        });
                                        var ssq = cityArray[0][that.data.citysIndexChange[0]] + list1[e.detail.value] + list2[0] + '';
                                    }
                                })
                        }
                    }
                }
            }
            citysIndexChange = [that.data.citysIndexChange[0], e.detail.value, 0];
            break;
          case 2:
            //滑动右列
            list1 = cityArray[1];
            list2 = cityArray[2];
            citysIndexChange = [that.data.citysIndexChange[0], that.data.citysIndexChange[1], e.detail.value];
            var ssq = cityArray[0][that.data.citysIndexChange[0]] + list1[that.data.citysIndexChange[1]] + list2[e.detail.value] + '';
            break;
        }
    
        that.setData({
          "cityArray[1]": list1,//重新赋值中列数组，即联动了市
          "cityArray[2]": list2,//重新赋值右列数组，即联动了区
          citysIndexChange: citysIndexChange,//更新索引
          ssq: ssq,//获取选中的省市区
        });
    },

    // 完成
    confirm: function(){
        var that = this;
        var merchants = this.data.merchants;
        var merchantName = this.data.merchantName;
        var merchantShortName = this.data.merchantShortName;
        var address = this.data.address;
        var citysIndex = this.data.citysIndex;
        var cityArray = this.data.cityArray;
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
        // 获取省数据
        api("/area/getProvinceList", {}, "POST", 1)
            .then(t => {
                if(t.code == 200){
                    for (let i = 0, len = t.data.length; i < len; i++) {
                        if(citysIndex[0] == i){ //省
                            merchants.province = t.data[i].id;
                            // 获取市数据
                            var json = {
                                parentId: t.data[i].id
                            }
                            api("/area/getCityList", json, "POST", 1)
                                .then(t => {
                                    if(t.code == 200){
                                        for (let i = 0, len = t.data.length; i < len; i++) {
                                            if(citysIndex[1] == i){ //市
                                                merchants.city = t.data[i].id;
                                                var json = {
                                                    parentId: t.data[i].id
                                                }
                                                api("/area/getAreaList", json, "POST", 1)
                                                    .then(t => {
                                                        if(t.code == 200){
                                                            for (let i = 0, len = t.data.length; i < len; i++) {
                                                                if(citysIndex[2] == i){ //区
                                                                    merchants.area = t.data[i].id;
                                                                    wx.setStorageSync("merchants", merchants);
                                                                    wx.setStorageSync("citysIndex", citysIndex);
                                                                    wx.setStorageSync("cityArray", cityArray);
                                                                    wx.setStorageSync("ssqAdr", ssqAdr);
                                                                    wx.setStorageSync("provinces", that.data.provinces);
                                                                    wx.setStorageSync("citys", that.data.citys);
                                                                    wx.setStorageSync("areas", that.data.areas);
                                                                    wx.navigateBack({
                                                                      delta: 1,
                                                                    })
                                                                }    
                                                            }
                                                        }
                                                    })
                                            }    
                                        }
                                    }
                                })
                        }
                    } 
                }
            })
    }

})