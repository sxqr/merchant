// pages/bankCard/bankCard.js
const common = require("../../utils/common.js");
const api = require("../../utils/ajax.js");


Page({

    /**
     * 页面的初始数据
     */
    data: {
        bankCard:[]
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
        let json = {
            access_token:wx.getStorageSync('access_token')
        }
        api("/merchantBank/getMerBanks",json,"POST",1).then(t =>{
            if(t.code == 200){
                this.setData({
                    bankCard:t.data
                })
            }
        });
    },
    // 新增银行卡
    addBankCard: function(){
        common.go('../addBankCard/addBankCard');
    },
    // 编辑银行卡
    editBankCard:function(e){
        var id = e.currentTarget.dataset.id;
        var bankName = e.currentTarget.dataset.bankname;
        var bankNo = e.currentTarget.dataset.bankno;
        common.go("../editBankCard/editBankCard?id=" + id + "&bankName=" + bankName + "&bankNo=" + bankNo);
    }
})