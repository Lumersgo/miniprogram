import store from 'store';
import expire from 'store/plugins/expire';

const plugins = [expire];
const storage = {
  name: 'gadStorage',
  read: (key) => wx.getStorageSync(key),
  write: (key, value) => wx.setStorageSync(key, value),
  remove: (key) => wx.removeStorageSync(key),
  clearAll: () => wx.clearStorageSync()
};
const lsStore = store.createStore(storage, plugins);
lsStore.getOnce = (key) => {
  const value = lsStore.get(key);
  lsStore.remove(key);
  return value;
};
export default lsStore;
