// 首个路由为首页
module.exports = [{
  path: 'pages/index',
  name: 'Index',
  meta: {
    auth: true
  },
  config: {
    navigationBarTitleText: 'Index'
  }
}, {
  path: 'pages/auth',
  name: 'Auth',
  config: {
    navigationBarTitleText: 'Auth'
  }
}];
