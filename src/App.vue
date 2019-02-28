<script>
  import login from '@/services/login';

  export default {
    created() {
    },
    onLaunch() {
      const self = this;
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            self.$store.commit('USER_SAVE_AUTH', {
              status: true
            });
          } else {
            self.$store.commit('USER_SAVE_AUTH', {
              status: false
            });
          }
        },
        fail: function() {
          self.$store.commit('USER_SAVE_AUTH', {
            status: false
          });
        }
      });
    },
    onShow() {
      const self = this;
      // 如果session未过期， 说明已经建立了链接
      wx.checkSession({
        success() {
          console.log('session未过期');
          if (!wx.getStorageSync('_token')) {
            login();
          }
        },
        fail() {
          console.log('session过期了！');
          // 建立连接
          login();
        }
      });

      // 获取用户授权信息并设置标识位
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            self.$store.commit('USER_SAVE_AUTH', {
              status: true
            });
            wx.getUserInfo({
              success: function(res) {
                self.$store.commit('USER_SAVE_LOCAL', {
                  user: res.userInfo
                });
              }
            });
          } else {
            self.$store.commit('USER_SAVE_AUTH', {
              status: false
            });
          }
        },
        fail: function() {
          self.$store.commit('USER_SAVE_AUTH', {
            status: false
          });
        }
      });

      // 清除storage中无用数据
      const res = wx.getStorageInfoSync();
      const keys = res.keys;
      keys.forEach(key => {
        const expireTime = wx.getStorageSync(`_expire_${key}`);
        if (expireTime && expireTime < (new Date()).getTime()) {
          // 移除过期的storage
          wx.removeStorageSync(key);
          wx.removeStorageSync(`_expire_${key}`);
        }
      });
    }
  };
</script>

<style>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200 rpx 0;
    box-sizing: border-box;
  }

  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }
</style>
