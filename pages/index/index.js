Page({

  data:{
    aa:"110"
    
  },
  formSubmit: function (e) {
    var that = this;
    wx.request({
      url: 'https://www.gdmecyyn.xyz/city.php',
      method: "get",
      data: {
        ip: e.detail.value.ip,
      }, 
      header:{
        "Content-Type": "application/json; charset=utf-8"
      },
      success: function (res) {
        console.log(typeof(res.data.data));
        
        if (typeof(res.data.data)!="string"){
        that.setData({
          site: res.data.data.country + res.data.data.region + res.data.data.city + res.data.data.isp
        })
        }else {
          that.setData({
            site: res.data.data
          })

        }
        console.log(res.data)
      }
    })
  },
onLoad:function(e){
  var that=this
  wx.request({
    url: 'http://ip-api.com/json',
    success: function (res) {
      console.log(res.data.query);
      that.setData({
        thisip: res.data.query
      })
      
    }
  })
}
})