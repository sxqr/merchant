// pages/balanceInfo/balanceInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        merchants: {},
        settleName: "",
        settleNo: ""
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
        let settleNo = "";
        if(merchants){
            merchants = merchants
        }else{
            merchants = {}
        }
        if(merchants && merchants.settleName){
            settleName = merchants.settleName
        }
        if(merchants && merchants.settleNo){
            settleNo = merchants.settleNo
        }
        this.setData({
            merchants: merchants,
            settleName: settleName,
            settleNo: settleNo
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

    //完成
    confirm: function(){
        var merchants = this.data.merchants;
        var settleName = this.data.settleName;
        var settleNo = this.data.settleNo;
        if(settleName == ""){
            wx.showToast({
                icon: 'none',
                title: '请输入结算人姓名',
            })
            return false;
        }
        if(settleNo == ""){
            wx.showToast({
                icon: 'none',
                title: '请输入结算人身份证号',
            })
            return false;
        }
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
        
        merchants.settleName = settleName;
        merchants.settleNo = settleNo;
        wx.setStorageSync("merchants", merchants);
        wx.navigateBack({
          delta: 1,
        })
    }

})