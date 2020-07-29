//判断年份是平年还是闰年
function confirmYearIsLeapYearOrLeapYear(year){
  var flag = false;
  //判断传来的年份是否是整百的年份：如1900、2000
  if (year%100 != 0){//不是整百的年份
    if (year%4 != 0){//平年
      flag = false;
    }else{//闰年
      flag = true;
    }
  }else{
    if (year%400 != 0) {//平年
      flag = false;
    } else {//闰年
      flag = true;
    }
  }
  return flag;
}

//判断月份是大月还是小月亦或者是2月
function confirmMonthIsMonthlyOrAbortion(month){
  var type = "big";
  var monthly = [1,3,5,7,8,10,12];
  var abortion = [4,6,9,11];
  if (monthly.indexOf(month)) {//大月
    type = "big";
  } else if (abortion.indexOf(month)) {//小月
    type = "small";
  } else {//2月
    type = "two";
  }
  return type;
}

//通过年份和月份获取每月的天数
function getDays(year, month){
  var day = 31;
  var flag = confirmYearIsLeapYearOrLeapYear(year);
  var type = confirmMonthIsMonthlyOrAbortion(month);
  if (type == "big") {
    day = 31;
  } else if (type == "small") {
    day = 30;
  } else {
    if (flag) {//闰年
      day = 29;
    } else {//平年
      day = 28;
    }
  }
  return day;
}