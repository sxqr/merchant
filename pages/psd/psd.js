const app = getApp()

Page({
    data: {
        password: '',
        isFocus: false,
        inputPwd: true,
        inputNum: 0,
        passwordFirst: '',
        passwordTwo: '',
    },
    pwd(e) {
        console.log(666)
        console.log(e.detail.value)
        console.log(666)
        let reg = /[^\d]/g
        let mobile = e.detail.value.replace(reg, '')
        this.setData({
            password: mobile
        })
        return mobile
    },
    getFocus() {
        this.setData({
            isFocus: true
        })
    },
    onLoad: function () {
        console.log(this.data.password.length)
    },
    submit(){
        let that = this
        if (that.data.password.length == 6) {
            if (that.data.inputNum == 0) {
                that.data.passwordFirst = that.data.password
                that.data.inputNum = 1
                wx.setNavigationBarTitle({
                    title: '再次输入密码',
                })
                that.setData({
                    password: '',
                    isFocus: false,
                    inputPwd: true,
                })
            } else if (that.data.inputNum == 1){
                that.data.passwordTwo = that.data.password
                if (that.data.passwordFirst == that.data.passwordTwo) {
                    // 传that.data.passwordTwo为支付密码
                    wx.showToast({
                        title: '设置成功',
                        icon: 'success',
                        success: function (res) {
                            wx.navigateBack({
                                delta: 1
                            })
                        }
                    })

                } else {
                    wx.showToast({
                        title: '两次输入密码不同，请重新输入',
                        icon: 'none',
                    })
                    wx.setNavigationBarTitle({
                        title: '设置支付密码',
                    })
                    that.setData({
                        password: '',
                        isFocus: false,
                        inputPwd: true,
                        inputNum: 0,
                        passwordFirst: '',
                        passwordTwo: ''
                    })
                    return false
                }
            }
        }
    },

})