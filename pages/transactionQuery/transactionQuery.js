// pages/transactionQuery/transactionQuery.js
const common = require("../../utils/common.js");
const api = require("../../utils/ajax.js");
const util = require("../../utils/util.js");
var appleDate = util.formatDate(new Date()); // 获取当前日期
var appleDate2 = util.formatDate2(new Date()); // 获取当前月份
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: app.globalData.statusBarHeight,
        facility: app.globalData.facility,
        appleDate: '',
        appletList: [],
        withdrawList: [],
        page: 1,
        limit: 10,
        count: 0,
        product: "",
        startTime: "",
        endTime: "",
        totalCount: "",
        totalAmount: "",
        totalCount2: "",
        totalAmount2: "",
        dayMonth: true, //时间选择类型
        dayType: true,
        dayType1: false,
        type: "receipt",
        isType: true,
        isType1: false,
        isChoose: true,
        isChoose1: false,
        isChoose2: false
    },
    back: function () {
        wx.navigateBack({
            delta: 1,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            appleDate: appleDate,
            startTime: appleDate + " " + "00:00:00",
            endTime: appleDate + " " + "23:59:59"
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            page: 1,
            limit: 10,
            appletList: []
        })
        let that = this;
        let json = {
            access_token: wx.getStorageSync("access_token"),
            product: that.data.product,
            startTime: that.data.startTime,
            endTime: that.data.endTime,
            page: 1,
            limit: 10
        };
        appletList(that, json);

        //   获取总金额
        let json2 = {
            access_token: wx.getStorageSync("access_token"),
            product: that.data.product,
            startTime: that.data.startTime,
            endTime: that.data.endTime
        };
        merAppTxSta(that, json2);
    },
    // 日月切换
    slectMonth: function (e) {
        var that = this;
        var day = e.currentTarget.dataset.day;
        var type = that.data.type;
        if (day == "slectDay") {
            that.setData({
                dayMonth: true,
                dayType: true,
                dayType1: false,
                appleDate: appleDate,
                startTime: appleDate + " " + "00:00:00",
                endTime: appleDate + " " + "23:59:59"
            })
        } else if (day == "slectMonth") {
            that.setData({
                dayMonth: false,
                dayType: false,
                dayType1: true,
                appleDate: appleDate2,
                startTime: appleDate2 + "-01" + " " + "00:00:00",
                endTime: getNextMonth(appleDate2)
            })
        }
        if (type == "receipt") {
            that.setData({
                page: 1,
                limit: 10,
                product: that.data.product,
                startTime: that.data.startTime,
                endTime: that.data.endTime,
                appletList: []
            })
            let json = {
                access_token: wx.getStorageSync("access_token"),
                product: that.data.product,
                startTime: that.data.startTime,
                endTime: that.data.endTime,
                page: 1,
                limit: 10
            };
            let txstaJson = {
                access_token: wx.getStorageSync("access_token"),
                product: that.data.product,
                startTime: that.data.startTime,
                endTime: that.data.endTime,
            }
            merAppTxSta(that, txstaJson);
            appletList(that, json);
        } else if (type == "withdraw") {
            that.setData({
                page: 1,
                limit: 10,
                startTime: that.data.startTime,
                endTime: that.data.endTime,
                withdrawList: [],
            })
            let json2 = {
                access_token: wx.getStorageSync("access_token"),
                startTime: that.data.startTime,
                endTime: that.data.endTime,
                page: 1,
                limit: 10
            };
            let wdTotalJson = {
                access_token: wx.getStorageSync("access_token"),
                startTime: that.data.startTime,
                endTime: that.data.endTime,
            }
            withdrawList(that, json2);
            wdTotal(that, wdTotalJson);
        }
    },

    // 选择时间日期
    dayDateChange: function (e) {
        var that = this;
        var time = e.detail.value;
        var type = that.data.type;
        var dayMonth = that.data.dayMonth;
        if (dayMonth) {
            that.setData({
                appleDate: time,
                startTime: time + " " + "00:00:00",
                endTime: time + " " + "23:59:59"
            });
        } else {
            that.setData({
                appleDate: time,
                startTime: time + "-01" + " " + "00:00:00",
                endTime: getNextMonth(time)
            });
        }
        if (type == "receipt") {
            that.setData({
                page: 1,
                limit: 10,
                product: that.data.product,
                startTime: that.data.startTime,
                endTime: that.data.endTime,
                appletList: []
            })
            let json = {
                access_token: wx.getStorageSync("access_token"),
                product: that.data.product,
                startTime: that.data.startTime,
                endTime: that.data.endTime,
                page: 1,
                limit: 10
            };
            let txstaJson = {
                access_token: wx.getStorageSync("access_token"),
                product: that.data.product,
                startTime: that.data.startTime,
                endTime: that.data.endTime,
            }
            merAppTxSta(that, txstaJson);
            appletList(that, json);
        } else if (type == "withdraw") {
            that.setData({
                page: 1,
                limit: 10,
                startTime: that.data.startTime,
                endTime: that.data.endTime,
                withdrawList: [],
            })
            let json2 = {
                access_token: wx.getStorageSync("access_token"),
                startTime: that.data.startTime,
                endTime: that.data.endTime,
                page: 1,
                limit: 10
            };
            let wdTotalJson = {
                access_token: wx.getStorageSync("access_token"),
                startTime: that.data.startTime,
                endTime: that.data.endTime,
            }
            withdrawList(that, json2);
            wdTotal(that, wdTotalJson);
        }
    },

    // 收款明细跟提现明细切换
    status: function (e) {
        var type = e.currentTarget.dataset.type;
        var that = this;
        that.setData({
            appleDate: appleDate,
            startTime: appleDate + " " + "00:00:00",
            endTime: appleDate + " " + "23:59:59",
            dayMonth: true,
            dayType: true,
            dayType1: false,
        })
        wx.showLoading({
            title: '加载中...',
            mask: true
        })
        if (type == "receipt") {
            that.setData({
                page: 1,
                limit: 10,
                isType: true,
                isType1: false,
                type: type,
                product: "",
                appletList: []
            })
            let json = {
                access_token: wx.getStorageSync("access_token"),
                product: that.data.product,
                startTime: that.data.startTime,
                endTime: that.data.endTime,
                page: 1,
                limit: 10
            };
            let txstaJson = {
                access_token: wx.getStorageSync("access_token"),
                product: that.data.product,
                startTime: that.data.startTime,
                endTime: that.data.endTime,
            }
            appletList(that, json);
            merAppTxSta(that, txstaJson);
        } else if (type == "withdraw") {
            that.setData({
                page: 1,
                limit: 10,
                isType: false,
                isType1: true,
                type: type,
                withdrawList: [],
            })
            let json2 = {
                access_token: wx.getStorageSync("access_token"),
                startTime: that.data.startTime,
                endTime: that.data.endTime,
                page: 1,
                limit: 10
            };
            let wdTotalJson = {
                access_token: wx.getStorageSync("access_token"),
                startTime: that.data.startTime,
                endTime: that.data.endTime,
            }
            withdrawList(that, json2);
            wdTotal(that, wdTotalJson);
        }
    },
    // 选择状态
    slectType: function (e) {
        var statusName = e.currentTarget.dataset.status;
        console.log(statusName);
        if (statusName == "") {
            this.setData({
                isChoose: true,
                isChoose1: false,
                isChoose2: false
            })
        } else if (statusName == "ALIPAY_SERVICEW") {
            this.setData({
                isChoose: false,
                isChoose1: true,
                isChoose2: false
            })
        } else if (statusName == "WECHAT_GZH") {
            this.setData({
                isChoose: false,
                isChoose1: false,
                isChoose2: true
            })
        }
        let that = this;
        let json = {
            access_token: wx.getStorageSync("access_token"),
            product: statusName,
            startTime: that.data.startTime,
            endTime: that.data.endTime,
            page: 1,
            limit: 10,
        };
        wx.showLoading({
            title: '加载中...',
            mask: true
        })
        api("/txnOrder/merchant/applet/list", json, "POST", 1)
            .then(t => {
                var appletList = t.data;
                that.setData({
                    appletList: appletList,
                    product: statusName,
                    page: 1,
                    limit: 10,
                    count: t.count,
                })
            })

        let json2 = {
            access_token: wx.getStorageSync("access_token"),
            product: statusName,
            startTime: that.data.startTime,
            endTime: that.data.endTime,
        }
        merAppTxSta(that, json2);
    },
    //交易查询到达底部
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
                product: that.data.product,
                startTime: that.data.startTime,
                endTime: that.data.endTime,
                page: page,
                limit: limit
            };
            appletList(that, json);
        } else {
            // wx.showToast({
            //   icon:'none',  
            //   title: '没有更多内容了~'
            // })
        }
    },
    // 提现明细到达底部
    withdrawScrollToLower: function () {
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
                startTime: that.data.startTime,
                endTime: that.data.endTime,
                page: page,
                limit: limit
            };
            withdrawList(that, json);
        }
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
})
//收款列表
function appletList(that, json) {
    api("/txnOrder/merchant/applet/list", json, "POST", 1)
        .then(t => {
            var appletList = that.data.appletList;
            var newStoreList = t.data;
            for (var i = 0; i < newStoreList.length; i++) {
                appletList.push(newStoreList[i]);
            }
            console.log(appletList);
            that.setData({
                appletList: appletList,
                count: t.count
            })
        })
}
// 提现列表
function withdrawList(that, json) {
    api("/merchantWithdraw/applet/wdView", json, "POST", 1)
        .then(t => {
            var withdrawList = that.data.withdrawList;
            var newList = t.data;
            for (var i = 0; i < newList.length; i++) {
                withdrawList.push(newList[i]);
            }
            console.log(withdrawList);
            that.setData({
                withdrawList: withdrawList,
                count: t.count
            })
        })
}
// 收款明细总金额
function merAppTxSta(that, json) {
    api("/txnOrder/merchant/applet/merAppTxSta", json, "POST", 1)
        .then(t => {
            that.setData({
                totalCount: t.data.totalCount,
                totalAmount: t.data.totalAmount,
            })
        })
}
// 提现明细总金额
function merAppTxSta(that, json) {
    api("/txnOrder/merchant/applet/merAppTxSta", json, "POST", 1)
        .then(t => {
            that.setData({
                totalCount: t.data.totalCount,
                totalAmount: t.data.totalAmount,
            })
        })
}

function wdTotal(that, json) {
    api("/merchantWithdraw/applet/wdTotal", json, "POST", 1)
        .then(t => {
            that.setData({
                totalCount2: t.data.totalCount,
                totalAmount2: t.data.totalAmount,
            })
        })
}

const getNextMonth = date => {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2 + '-01' + " " + "00:00:00";
    return t2;
}