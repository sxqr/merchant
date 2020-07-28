module.exports = {
    go:go
  }
  function go(url,id,status){
    wx.navigateTo({
        url: url+'?id='+id+'&status='+status,
    });
  }