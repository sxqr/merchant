// pages/performance/performance.js
const app = getApp()
const api = require("../../../utils/ajax.js")
const date = require("../../../utils/date.js")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: app.globalData.statusBarHeight,
        facility: app.globalData.facility,
        active1: true,
        active2: false,
        startTime: "",
        endTime: "",
        totalCount: 0,
        totalAmount: 0,
        performanceList: [],
        todayTime: "",
        page: 1,
        limit: 10,
        count: 0,
        height: 0
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
        var that = this;
        console.log(this.data.facility)
        let startTime = date.getZero(new Date());
        let endTime = date.getTwentyThree(new Date());
        that.setData({
            startTime: startTime,
            endTime: endTime,
            todayTime: date.getCurTime()
        })

        // 查询业绩
        var json = {
            access_token: wx.getStorageSync("token"),
            startTime: startTime,
            endTime: endTime
        }
        getTotal(json, that);
        // 业绩详情    
        json = {
            access_token: wx.getStorageSync("token"),
            page: 1,
            limit: 10,
            startTime: startTime,
            endTime: endTime
        }
        getView(json, that)

        var phoneInfo=wx.getSystemInfoSync();
        var pWidth=phoneInfo.windowWidth;//宽
        var pHeight=phoneInfo.windowHeight;//高
        var px = 91 / 750 * pWidth + 44 + this.data.statusBarHeight;
        let query = wx.createSelectorQuery();
        query.select('.transaction').boundingClientRect(rect=>{
            let height = rect.height;
            that.setData({
                height: (pHeight-height-px)/pHeight*100
            })
        }).exec();
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
            // 业绩详情    
            let json = {
                access_token: wx.getStorageSync("token"),
                page: page,
                limit: limit,
                startTime: this.data.startTime,
                endTime: this.data.endTime
            }
            getView(json, this);
        }
    },

    // 选择
    choose: function(e){
        var id = e.currentTarget.dataset.id;
        var startTime = this.data.startTime;
        var endTime = this.data.endTime;
        let y = new Date().getFullYear();
        let m = new Date().getMonth()+1;
        if(id == 1){
            this.setData({
                active1: true,
                active2: false,
                todayTime: date.getCurTime()
            })
            let d = new Date().getDate();
            startTime = date.getZero(new Date(y+"-"+m+"-"+d));
            endTime = date.getTwentyThree(new Date(y+"-"+m+"-"+d));
        }else if(id == 2){
            this.setData({
                active1: false,
                active2: true,
                todayTime: new Date().getFullYear()+"."+(new Date().getMonth()+1)
            })
            startTime = date.getZero(new Date(y+"-"+m+"-"+"01"));
            endTime = date.getTwentyThree(new Date(y+"-"+m+"-"+date.getLastDay(y, m)));
        }
        this.setData({
            startTime: startTime,
            endTime: endTime,
            page: 1,
            limit: 10,
            performanceList: []
        })
        // 查询业绩
        var json = {
            access_token: wx.getStorageSync("token"),
            startTime: startTime,
            endTime: endTime
        }
        getTotal(json, this);
        // 业绩详情    
        json = {
            access_token: wx.getStorageSync("token"),
            page: 1,
            limit: 10,
            startTime: startTime,
            endTime: endTime
        }
        getView(json, this)
    },

    // 选择时间
    bindDateChange: function(e) {
        var chooseTime = e.detail.value;
        let y = new Date(chooseTime).getFullYear();
        let m = new Date(chooseTime).getMonth()+1;
        let startTime = this.data.startTime;
        let endTime = this.data.endTime;
        if(this.data.active2){ //月
            startTime = date.getZero(new Date(y+"-"+m+"-"+"01"));
            endTime = date.getTwentyThree(new Date(y+"-"+m+"-"+date.getLastDay(y, m)));
            this.setData({
                todayTime: y+"."+m
            })
        }else{
            let d = new Date(chooseTime).getDate();
            startTime = date.getZero(new Date(y+"-"+m+"-"+d));
            endTime = date.getTwentyThree(new Date(y+"-"+m+"-"+d));
            this.setData({
                todayTime: y+"."+m+"."+d
            })
        }
        this.setData({
            performanceList: [],
            page: 1,
            limit: 10,
            startTime: startTime,
            endTime: endTime
        })
        // 查询业绩
        var json = {
            access_token: wx.getStorageSync("token"),
            startTime: startTime,
            endTime: endTime
        }
        getTotal(json, this);
        // 业绩详情    
        json = {
            access_token: wx.getStorageSync("token"),
            page: 1,
            limit: 10,
            startTime: startTime,
            endTime: endTime
        }
        getView(json, this)
    },
})

function getTotal(json, that){
    api("/txnOrder/workPerformance/total", json, "POST", 1)
        .then(t => {
            if(t.code == 200){
                that.setData({
                    totalCount: t.data.totalCount,
                    totalAmount: (t.data.totalAmount/100).toFixed(2),
                })
            }
        })
}

function getView(json, that){
    api("/txnOrder/workPerformance/view", json, "POST", 1)
        .then(t => {
            if(t.code == 200){
                var performanceList = that.data.performanceList;
                var newPerformanceList = t.data;
                for (var i = 0; i < newPerformanceList.length; i++) {
                    performanceList.push(newPerformanceList[i]);
                }
                that.setData({
                    performanceList: performanceList,
                    count: t.count
                })
            }
        })
}