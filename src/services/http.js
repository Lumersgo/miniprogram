/**
 * http请求拦截器
 */
import store from '@/store';
import login from './login';
const Fly = require('flyio/dist/npm/wx');

const ajaxUrl = process.env.NODE_ENV === 'development' ? 'https://dev.gameinstitute.qq.com' : process.env.NODE_ENV === 'production' ? 'https://gameinstitute.qq.com' : 'https://test.gameinstitute.qq.com';

const fly = new Fly();
// 定义公共headers
const headers = {
  Accept: 'application/json'
};
Object.assign(fly.config, {
  headers: headers,
  baseURL: ajaxUrl,
  timeout: 10000,
  withCredentials: true
});

// 请求拦截器
fly.interceptors.request.use((request) => {
  const token = store.state.user.token;
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});
// 响应拦截器
fly.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    if (err.status === 401) {
      // 锁定响应拦截器
      fly.lock();
      return login()
        .then(() => {
          fly.unlock();
          // log(`重新请求：path:${response.request.url}，baseURL:${response.request.baseURL}`)
          return fly.request(err.request);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
);
export default fly;
