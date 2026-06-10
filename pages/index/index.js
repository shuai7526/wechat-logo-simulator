Page({
  data: {
    logoSrc: '', // 存放选中的图片路径
    appName: '测试小程序' // 默认名字，你可以直接在这改成你正在开发的意考通
  },

  // 监听输入框，实时改名
  onNameChange(e) {
    this.setData({
      appName: e.detail.value
    });
  },

  // 调起手机相册
  // 调起手机相册并配合原生裁剪
  chooseLogo() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const originalPath = res.tempFiles[0].tempFilePath;

        // 获取图片后，立刻调起微信原生裁剪
        wx.cropImage({
          src: originalPath,
          cropScale: '1:1', // 强制设定裁剪比例为正方形
          success: (cropRes) => {
            // 将裁剪后的新图片路径存入 data 触发页面渲染
            this.setData({
              logoSrc: cropRes.tempFilePath
            });
          },
          fail: (cropErr) => {
            console.log('用户取消裁剪', cropErr);
            // 这里可以不做处理，取消裁剪就不更新 Logo
          }
        });
      },
      fail: (err) => {
        console.log('用户取消选图或发生错误', err);
      }
    });
  }
});