module.exports = {
  parseTime: parseTime,
  getCurTime: getCurTime,
  getZero: getZero,
  getTwentyThree: getTwentyThree,
  getLastDay: getLastDay
}

// 格式化时间
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
      return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
      date = time
  } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
  }
  const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
      if (result.length > 0 && value < 10) {
          value = '0' + value
      }
      return value || 0
  })
  return time_str
}

// 获取当前时间
function getCurTime(){
  let curTime = new Date();
  let y = curTime.getFullYear();
  let m = curTime.getMonth()+1;
  let d = curTime.getDate();
  return y+'-'+m+'-'+d
}

// 获取0点
function getZero(time){
  return parseTime(new Date(new Date(time.toLocaleDateString()).getTime())); // 当天0点
}

// 获取23点
function getTwentyThree(time){
  return parseTime(new Date(new Date(time.toLocaleDateString()).getTime() +24 * 60 * 60 * 1000 -1)); // 当天23:59
}

//获得某月的最后一天
function getLastDay(year,month) {
  var new_year = year; //取当前的年份
  var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）
  if(month>12) {
      new_month -=12; //月份减
      new_year++; //年份增
  }
  var new_date = new Date(new_year,new_month,1); //取当年当月中的第一天
  return (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期
}