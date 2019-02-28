import store from '@/store';
import http from '@/services/http';
// 注册接口
export default function() {
  return new Promise((resolve, reject) => {
    try {
      wx.showLoading({
        title: '请稍等',
        mask: true
      });
      wx.getUserInfo({
        withCredentials: true,
        async success(res) {
          console.log(res);
          const { encryptedData, iv, signature } = res;
          const registerRes = await http.post('/mobile/weixin/user', {
            encryptedData,
            iv,
            signature
          });
          if (registerRes.code === 0) {
            // 保存注册返回的用户信息
            store.commit('USER_SAVE', registerRes.data.user);
          }
          wx.hideLoading();
          return resolve();
        },
        fail() {
          wx.hideLoading();
          return reject(new Error('wx.getUserInfo Api request fail.'));
        }
      });
    } catch (e) {
      wx.showToast({
        title: '自动注册失败，请稍后重试',
        icon: 'none'
      });
      return reject(new Error('register error in success try catch'));
    }
  });
}
