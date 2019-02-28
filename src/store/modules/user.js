import ls from '@/utils/localstorage-store';
export default {
  namespace: true,
  state: {
    auth: false,
    token: ls.get('_token') || '',
    info: ls.get('userInfo') || {},
    localInfo: ls.get('localUserInfo') || {}
  },
  mutations: {
    'USER_SAVE_TOKEN': (state, payload) => {
      state.token = payload.token;
      ls.set('_token', payload.token);
    },
    'USER_SAVE': (state, payload) => {
      state.info = payload.user;
      ls.set('userInfo', payload.user);
    },
    'USER_SAVE_LOCAL': (state, payload) => {
      state.localInfo = payload.user;
      ls.set('localUserInfo', payload.user);
    },
    'USER_SAVE_AUTH': (state, payload) => {
      state.auth = payload.status;
    }
  }
}
