
const util = require('../../utils/util.js')
import * as echarts from '../../utils/ec-canvas/echarts';

const app = getApp();
var initChart = null;

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
  },

  initChartOption: function(){
    var twoLevelIndex = this.data.firstData;
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
        right:"5%",
        textStyle: {
            // color: "#93A3B6"
            color:['#FF3955','#019EF2','#47B734']
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
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            splitLine: { show: false },
            axisLabel: {
                color: '#50576A',
            },
            axisTick: { //x轴刻度线
                show: false
            },
            axisLine: { //x轴
                show: false
            },
            data: ['JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

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
            name: '总金额',
            type: 'line',
            smooth:true,
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
            data: [300, 402, 354, 391, 790, 320, 260]
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
          data: [460, 352, 304, 321, 390, 350, 200]
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
            data: [400, 452, 604, 391, 390, 350, 200]
        }
    ]
    })
  }

});

