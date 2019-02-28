import store from '@/store';
export default {
  beforeMount() {
    // 获取用户授权信息并设置标识位
    const self = this;
    const options = this.$root.$mp.query;
    const keys = Object.keys(options);
    let paramsStr = '';
    for (let i = 0, length = keys.length; i < length; i++) {
      paramsStr += `&${keys[i]}=${options[keys[i]]}`;
    }
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo'] || !store.state.user.info) {
          // 没有授权
          wx.redirectTo({
            url: `/pages/auth?__url=${self.$mp.appOptions.path}${paramsStr}`
          });
        }
      }
    });
  }
}
