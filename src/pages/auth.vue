<template>
  <div class="auth-container">
    <!--<div class="logo">-->
      <!--<image src="/sources/img/auth/logo.png"></image>-->
    <!--</div>-->
    <button class="btn" open-type="getUserInfo" @getuserinfo="getUserInfo">微信登录</button>
  </div>
</template>
<style lang="scss" src="@/styles/auth/index.scss" scoped></style>
<script>
  import { mapState, mapMutations } from 'vuex';
  import register from '@/services/register';
  // 映射授权状态
  export default {
    data() {
      return {
        pageUrl: '',
        pageCompleteUrl: ''
      };
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.info
      })
      //   isTabBar() {
      //     console.log(this);
      //     const self = this;
      //     const configTabBarObj = self.$parent.config.tabBar.list;
      //     return configTabBarObj.filter((item) => {
      //       return item.pagePath === self.pageUrl;
      //     }).length > 0;
      //   }
      // },
    },
    beforeMount() {
      const options = this.$root.$mp.query;
      if (options.__url) {
        this.pageUrl = options.__url;
        const keys = Object.keys(options);
        const params = [];
        for (let i = 0, length = keys.length; i < length; i++) {
          if (keys[i] !== '__url') {
            params.push(`${keys[i]}=${options[keys[i]]}`);
          }
        }
        const paramsStr = params.length > 0 ? `?${params.join('&')}` : '';
        this.pageCompleteUrl = `${options.__url}${paramsStr}`;
      } else {
        // this.pageUrl = this.$parent.config && this.$parent.config.pages.length > 0 ? this.$parent.config.pages[0] : 'pages/index/main';
        this.pageUrl = this.pageCompleteUrl = 'pages/index';
      }
    },
    methods: {
      ...mapMutations({
        'saveUserInfo': 'USER_SAVE_LOCAL',
        'saveUserInfoAuth': 'USER_SAVE_AUTH'
      }),
      async getUserInfo(e) {
        if (e.target.errMsg === 'getUserInfo:ok') {
          // 更新授权状态
          this.$store.commit('USER_SAVE_LOCAL', {
            status: true
          });
          // 保存用户本地信息
          this.$store.commit('USER_SAVE_LOCAL', {
            user: e.target.userInfo
          });
          console.log(this);
          if (!this.userInfo || !this.userInfo.id) {
            // 如果没有注册并且需要自动注册
            console.log('go to register');
            try {
              await register();
            } catch (e) {
              console.log('Register Error', e);
            }
          }
          // 是tabBar页面需要过滤参数
          // let url = this.isTabBar ? this.pageUrl : this.pageCompleteUrl;
          // url = `/${url}`;
          // if (this.isTabBar) {
          //   wx.switchTab({
          //     url: `${url}`
          //   });
          // } else {
          //   wx.redirectTo({
          //     url: url
          // }
          //   });
          const url = `/${this.pageCompleteUrl}`;
          wx.redirectTo({
            url: url
          });
        }
      }
    }
  };
</script>
