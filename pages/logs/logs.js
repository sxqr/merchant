//logs.js
const util = require('../../utils/util.js')
import * as echarts from '../../utils/ec-canvas/echarts';

const app = getApp();
var initChart = null;
var initChart1 = null;

Page({
  onShareAppMessage: function (res) {
    // return {
    //   title: 'ECharts 可以在微信小程序中使用啦！',
    //   path: '/pages/index/index',
    //   success: function () { },
    //   fail: function () { }
    // }
  },
  data: {
    ec: {
      onInit: function(canvas, width, height,dpr) {
				initChart = echarts.init(canvas, null, {
					width: width,
          height: height,
          devicePixelRatio: dpr
				});
				canvas.setChart(initChart);
				return initChart;
			}
    },
    ec1: {
      onInit: function(canvas, width, height,dpr) {
				initChart1 = echarts.init(canvas, null, {
					width: width,
          height: height,
          devicePixelRatio: dpr
				});
				canvas.setChart(initChart1);
				return initChart1;
			}
    },
    firstData: [{
      value: 50,
      name: '支付宝支付'
    }, {
      value: 50,
      name: '微信支付'
    }]
  },
  onReady() {
    // this.getData();
    var _this = this;
    setTimeout(_this.getData, 500);
  },
  getData(){
    var _this = this;
    // _this.setData({

    // })
    _this.initChartOption();
    _this.initChartOption1();
  },
  initChartOption: function(){
    var twoLevelIndex = this.data.firstData;
    console.log(twoLevelIndex);
    initChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      // legend: {
      //     orient: 'vertical',
      //     left: 10,
      //     data: ['支付宝支付', '微信支付']
      // },
      color: ["#55CD51", "#DDDDDD"],
      series: [{
        label: {
          show: false,
          position: 'right'
        },
        type: 'pie',
        center: ['32%', '40%'],
        radius: ['40%', '63%'],
        data: twoLevelIndex
      }]
    })
  },

  initChartOption1: function(){
    var twoLevelIndex = this.data.firstData;
    initChart1.setOption({
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
        right:"5%",
        textStyle: {
            color: "#93A3B6"
        },
        data: ['支付宝', '微信']
    },
    grid: {
        // top:'18%',
        left: '0%',
        right: '5%',
        bottom: '5%',
        containLabel: true
    },
    // calculable: true,
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            splitLine: { show: false },
            axisLabel: {
                color: '#9A999F',
            },
            axisTick: { //x轴刻度线
                show: false
            },
            axisLine: { //x轴
                show: false
            },
            data: ['10.20', '10.21', '10.22', '10.23', '10.24', '10.25', '10.26']

        }

    ],
    yAxis: [
        {
            type: 'value',
            splitLine: { 
              show: true,
              lineStyle:{
                color: ['#F7F7F7'],
                width: 1,
                type: 'solid'
              } 
            },
            max: 800,
            axisLabel: {
                color: '#9A999F',
            },
            axisTick: { //y轴刻度线
                show: false,
            },
            axisLine: { //y轴
                show: false
            },

        },
    ],

    series: [
        {
            name: '支付宝',
            type: 'line',
            // smooth: false,
            smooth:true,
            symbolSize: 0,
            symbol: 'circle', //圆点显示方式
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
            data: [300, 402, 354, 391, 790, 320, 260]
        },
        {
            name: '微信',
            type: 'line',
            // smooth:true,
            smooth: true,
            symbolSize: 0,
            symbol: 'circle', //圆点显示方式
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
            data: [400, 452, 604, 391, 390, 350, 200]
        }
    ]
    })
  }

});

