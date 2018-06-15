var app=getApp()
var prom = require('../../utils/prom.js')
var login = app.globalData.login;

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
   // login:login

  },
  onLoad: function () {
    var that = this
    // 查看是否授权
    wx.getSetting({

      success: function (res) {
        

        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称     
          login = res.authSetting['scope.userInfo'];
          that.setData({
            login: login
          })

          wx.getUserInfo({
            success: function (res) {
              console.log(login)
              console.log(res.userInfo)
              that.setData({
                userInfo: res.userInfo
              })


            }
          })
        }
      }
    })
   
  },


  bindGetUserInfo: function (e) {
    var that=this
    prom.wxPromisify(wx.getUserInfo)({
    
    }).then(function(res){
      login=true
      that.setData({
        userInfo: e.detail.userInfo,
        login: login
      })
      console.log(login)

      }).catch(function(){
        login=false
        console.log(login)
  })
  },

  About: function () {
    if (login == true) {
      wx.navigateTo({
        url: '../about/about'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请授权登录后，才能查看!！！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }

})