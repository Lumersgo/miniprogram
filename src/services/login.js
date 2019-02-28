import store from '@/store';
const Fly = require('flyio/dist/npm/wx');
const fly = new Fly();
const loginFly = new Fly();
// 定义公共headers
const ajaxUrl = process.env.NODE_ENV === 'development' ? 'https://dev.gameinstitute.qq.com' : process.env.NODE_ENV === 'production' ? 'https://gameinstitute.qq.com' : 'https://test.gameinstitute.qq.com';
const headers = {
  Accept: 'application/json'
};
Object.assign(fly.config, {
  headers: headers,
  baseURL: ajaxUrl,
  timeout: 10000,
  withCredentials: true
});
loginFly.config = fly.config;
// session失效后本地重新登录
export default () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        loginFly.get(`/mobile/weixin/session?code=${res.code}`)
          .then(loginRes => {
            if (loginRes.data && loginRes.data.code === 0 && loginRes.data.data) {
              store.commit('USER_SAVE_TOKEN', {
                token: loginRes.data.data.token
              });
              if (loginRes.data.data.user) {
                store.commit('USER_SAVE', {
                  user: loginRes.data.data.user
                });
              }
              resolve();
            } else {
              reject(new Error('login return no data '));
            }
          })
          .catch((error) => {
            console.log(error);
            reject(res);
          });
      },
      fail: (res) => {
        console.error(res.errMsg);
      },
      complete: res => {
      }
    });
  });
};
