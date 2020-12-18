// pages/balanceInfo/balanceInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        merchants: {},
        settleName: "",
        rate: "",
        settleNo: "",
        merAccountTypeFlag: true,
        merAccountType: "",
        merAccountTypeName: "请选择"
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
        let settleName = "";
        let rate = "";
        let settleNo = "";
        let merAccountType = "";
        if(merchants){
            merchants = merchants
        }else{
            merchants = {}
        }
        if(merchants && merchants.settleName){
            settleName = merchants.settleName
        }
        if(merchants && merchants.rate){
            rate = merchants.rate
        }
        if(merchants && merchants.settleNo){
            settleNo = merchants.settleNo
        }
        if(merchants && merchants.merAccountType){
            merAccountType = merchants.merAccountType
        }
        this.setData({
            merchants: merchants,
            settleName: settleName,
            rate: rate,
            settleNo: settleNo,
            merAccountType: merAccountType
        })
    },

    //隐藏弹出层
    hidden: function () {
        this.setData({
            merAccountTypeFlag: true
        })
    },
    
    //点击子层不去触发父层的隐藏事件
    rf: function (e) {
        return;
    },

    //获取类型
    getMerAccountType: function(){
        this.setData({
            merAccountTypeFlag: false
        })
    },

    //选择类型
    merAccountType: function(e){
        let merAccountType = e.currentTarget.dataset.value;
        this.setData({
            merAccountType: merAccountType,
            merAccountTypeName: merAccountType == 0 ? "对私" : "对公",
            merAccountTypeFlag: true,
            settleNo: merAccountType == 1 ? "" : this.data.settleNo,
        })
    },

    //获取结算人姓名
    settleName: function(e){
        this.setData({
            settleName: e.detail.value
        })
    },

    //获取结算人身份证
    settleNo: function(e){
        this.setData({
            settleNo: e.detail.value
        })
    },

    //获取交易费率
    rate: function(e){
        this.setData({
            rate: e.detail.value
        })
    },

    //完成
    confirm: function(){
        var merchants = this.data.merchants;
        var merAccountType = this.data.merAccountType;
        var settleName = this.data.settleName;
        var rate = this.data.rate;
        if(merAccountType == ""){
            wx.showToast({
                icon: 'none',
                title: '请选择类型',
            })
            return false;
        }
        if(settleName == ""){
            wx.showToast({
                icon: 'none',
                title: '请输入结算人姓名',
            })
            return false;
        }
        if(merAccountType == "0"){
            var settleNo = this.data.settleNo;
            if(settleNo == ""){
                wx.showToast({
                    icon: 'none',
                    title: '请输入结算人身份证号',
                })
                return false;
            }
            if(!(/^([1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx])$/.test(settleNo))){
                wx.showToast({
                    icon: 'none',
                    title: '身份证号格式错误',
                })
                return false;
            }
            merchants.settleNo = settleNo;
        }
        if(rate == ""){
            wx.showToast({
                icon: 'none',
                title: '请输入交易费率',
            })
            return false;
        }
        if(!(/^[0]+(\.[0-9]{1,5})?$/.test(rate))){
            wx.showToast({
                icon: 'none',
                title: '交易费率格式错误',
            })
            return false;
        }
        merchants.merAccountType = merAccountType;
        merchants.settleName = settleName;
        merchants.rate = rate;
        wx.setStorageSync("merchants", merchants);
        wx.navigateBack({
          delta: 1,
        })
    }

})