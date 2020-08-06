// pages/checkList/checkList.js
const api = require("../../../utils/ajax.js")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        active1: true,
        active2: false,
        active3: false,
        active4: false,
        checkList: [],
        status: "",
        page: 1,
        limit: 10,
        count: 0,
        height: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var json = {
            access_token: wx.getStorageSync("token"),
            page: 1,
            limit: 10
        }
        getCheckList(json, that);
        var phoneInfo=wx.getSystemInfoSync();
        var pHeight=phoneInfo.windowHeight;//高
        let query = wx.createSelectorQuery();
        query.select('.page_menu').boundingClientRect(rect=>{
            let height = rect.height;
            that.setData({
                height: (pHeight-height)/pHeight*100
            })
        }).exec();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
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
            let json = {
                token: wx.getStorageSync("token"),
                page: page,
                limit: limit,
                status: that.data.status
            };
            getCheckList(json, that);
        }
    },

    // 选择状态
    choose: function(e){
        var that = this;
        var status = e.currentTarget.dataset.status;
        if(status == ""){
            that.setData({
                active1: true,
                active2: false,
                active3: false,
                active4: false,
            })
        }else if(status == 1){
            that.setData({
                active1: false,
                active2: true,
                active3: false,
                active4: false,
            })
        }else if(status == 2){
            that.setData({
                active1: false,
                active2: false,
                active3: true,
                active4: false,
            })
        }else if(status == 3){
            that.setData({
                active1: false,
                active2: false,
                active3: false,
                active4: true,
            })
        }
        that.setData({
            status: status,
            checkList: []
        })
        var json = {
            access_token: wx.getStorageSync("token"),
            page: 1,
            limit: 10,
            status: status
        }
        getCheckList(json, that)
    },
    // 预览图片
    preview: function(e){
        var img = e.currentTarget.dataset.img;
        console.log(img);
        wx.previewImage({
            current: img,
            urls: [img],
            success: function(res) {
              console.log(res)
            }
        })
    },
})

function getCheckList(json, that){
    api("/merchant/status/list", json, "POST", 1)
        .then(t => {
            console.log(t);
            if(t.code == 200){
                var checkList = that.data.checkList;
                var newCheckList = t.data;
                for (var i = 0; i < newCheckList.length; i++) {
                    checkList.push(newCheckList[i]);
                }
                that.setData({
                    checkList: checkList,
                    count: t.count
                })
            }
        })

}