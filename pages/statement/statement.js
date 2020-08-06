const util = require('../../utils/util.js');
const api = require("../../utils/ajax.js");
const common = require("../../utils/common.js");
var appleDate = util.formatDate(new Date()); // 获取当前日期

import * as echarts from '../../utils/ec-canvas/echarts';

const app = getApp();
var initChart = null;

Page({
    onShareAppMessage: function (res) {

    },
    data: {
        ec: {
            onInit: function (canvas, width, height, dpr) {
                initChart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr
                });
                canvas.setChart(initChart);
                return initChart;
            }
        },
        firstData: [],
        startTime: "",
        endTime: "",
        allLine: [],
        alipayLine: [],
        weChatLine: [],
        totalAmount: '', //总金额
        dayCount: [],
        itemTxt: "",
        wxMoney: "",
        alipayMoney: ""
    },
    onShow: function () {
        let that = this;
        var sendTiem = appleDate + " " + "23:59:59";
        that.setData({
            startTime: getTime(sendTiem),
            endTime: appleDate
        });
        let json = {
            startTime: that.data.startTime + " " + "00:00:00",
            endTime: appleDate + " " + "23:59:59",
            access_token: wx.getStorageSync('access_token')
        }
        api("/txnOrder/merAppSta", json, "POST", 1).then(t => {
            if (t.code == 200) {
                let dataList = t.data.dataInfo;
                let allLine = that.data.allLine;
                let alipayLine = that.data.alipayLine;
                let weChatLine = that.data.weChatLine;
                let dayCount = that.data.dayCount;
                let totalAmount = (t.data.totalAmount / 100).toFixed(2);
                for (let i = 0; i < dataList.length; i++) {
                    allLine.push(dataList[i].txnTotalAmount / 100);
                    alipayLine.push(dataList[i].zfbTxnTotalAmount / 100);
                    weChatLine.push(dataList[i].wxTxnTotalAmount / 100);
                    dayCount.push(dataList[i].dayCount.substr(dataList[i].dayCount.length - 4));
                }
                that.setData({
                    allLine: allLine,
                    alipayLine: alipayLine,
                    weChatLine: weChatLine,
                    totalAmount: totalAmount,
                    dayCount: dayCount,
                    wxMoney: (t.data.wxTotalAmount / 100).toFixed(2),
                    alipayMoney: (t.data.zfbTotalAmount / 100).toFixed(2)
                });
            }
        })
    },
    onReady: function () {
        var _this = this;
        setTimeout(_this.getData, 500);
    },
    // 时间选择
    dayDateChange: function (e) {
        var that = this;
        var time = e.detail.value;
        var sendTiem = time + " " + "23:59:59";
        that.setData({
            startTime: getTime(sendTiem),
            endTime: time
        });
        let json = {
            startTime: that.data.startTime + " " + "00:00:00",
            endTime: time + " " + "23:59:59",
            access_token: wx.getStorageSync('access_token')
        }
        // getEchart(that,json);
        api("/txnOrder/merAppSta", json, "POST", 1).then(t => {
            if (t.code == 200) {
                that.setData({
                    allLine: [],
                    alipayLine: [],
                    weChatLine: [],
                    dayCount: []
                });
                let dataList = t.data.dataInfo;
                let allLine = that.data.allLine;
                let alipayLine = that.data.alipayLine;
                let weChatLine = that.data.weChatLine;
                let dayCount = that.data.dayCount;
                let totalAmount = (t.data.totalAmount / 100).toFixed(2);
                for (let i = 0; i < dataList.length; i++) {
                    allLine.push(dataList[i].txnTotalAmount / 100);
                    alipayLine.push(dataList[i].zfbTxnTotalAmount / 100);
                    weChatLine.push(dataList[i].wxTxnTotalAmount / 100);
                    dayCount.push(dataList[i].dayCount.substr(dataList[i].dayCount.length - 4));
                }
                that.setData({
                    allLine: allLine,
                    alipayLine: alipayLine,
                    weChatLine: weChatLine,
                    totalAmount: totalAmount,
                    dayCount: dayCount,
                    wxMoney: (t.data.wxTotalAmount / 100).toFixed(2),
                    alipayMoney: (t.data.zfbTotalAmount / 100).toFixed(2)
                });
                that.getData();
            }
        })
    },

    getData() {
        var _this = this;
        _this.initChartOption();
    },

    initChartOption: function () {
        var allLine = this.data.allLine;
        var alipayLine = this.data.alipayLine;
        var weChatLine = this.data.weChatLine;
        var totalAmount = this.data.totalAmount;
        var dayCount = this.data.dayCount;
        initChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                top: "5%",
                right: "5%",
                textStyle: {
                    // color: "#93A3B6"
                    color: ['#FF3955', '#019EF2', '#47B734']
                },
                data: ['总金额', '支付宝', '微信']
            },
            grid: {
                left: '0%',
                right: '5%',
                bottom: '5%',
                containLabel: true
            },
            // calculable: true,
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                offset: 5,
                splitLine: {
                    show: false
                },
                axisLabel: {
                    color: '#50576A',
                },
                axisTick: { //x轴刻度线
                    show: false
                },
                axisLine: { //x轴
                    show: false
                },
                data: dayCount
            }],
            yAxis: [{
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#F7F7F7'],
                        width: 1,
                        type: 'solid'
                    }
                },
                max: totalAmount,
                axisLabel: {
                    color: '#9A999F',
                },
                axisTick: { //y轴刻度线
                    show: false,
                },
                axisLine: { //y轴
                    show: false
                },

            }, ],

            series: [{
                    name: '总金额',
                    type: 'line',
                    smooth: true,
                    symbol: 'none', //去掉点
                    itemStyle: {
                        color: '#FF4962'
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#FFF2F4'
                            }, {
                                offset: 1,
                                color: '#FF96A5'
                            }])
                        }
                    },
                    data: allLine
                },
                {
                    name: '支付宝',
                    type: 'line',
                    smooth: true,
                    symbol: 'none', //去掉点
                    itemStyle: {
                        color: '#00A0E9'
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#E2F0F9'
                            }, {
                                offset: 1,
                                color: '#E2D3E0'
                            }])
                        }
                    },
                    data: alipayLine
                },
                {
                    name: '微信',
                    type: 'line',
                    smooth: true,
                    symbol: 'none', //去掉点
                    itemStyle: {
                        color: '#79CB6B'
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#DFF3FA'
                            }, {
                                offset: 1,
                                color: '#D6DADD'
                            }])
                        }
                    },
                    data: weChatLine
                }
            ]
        })
    }
});
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const getTime = s => {
    var myDate = new Date(s.replace(/-/g, "/"))
    var sevenDate = new Date(myDate.getTime() - (6 * 24 * 60 * 60 * 1000)).toLocaleDateString();
    var year = new Date(sevenDate).getFullYear();
    var month = new Date(sevenDate).getMonth() + 1;
    var day = new Date(sevenDate).getDate()
    return [year, month, day].map(formatNumber).join('-')
}