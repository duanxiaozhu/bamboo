import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue'
import Layout from '@/components/Layout.vue'
import Icon from '@/components/icon.vue'
import tagListModel from '@/models/tagListModel'
import recordListModel from '@/models/recordListModel'

Vue.config.productionTip = false

Vue.component('Nav', Nav)
Vue.component('Layout', Layout)
Vue.component('Icon', Icon)
//record store
window.recordList = recordListModel.fetch();
window.createRecord = (record: RecordItem) =>
  recordListModel.create(record)

//tag store
window.tagList = tagListModel.fetch()
window.findTag = (id: string) => {
  return window.tagList.filter(t => t.id === id)[0]
}
window.createTag = (names: string) => {
  const message = tagListModel.create(names);
  if (message === "duplicated") {
    window.alert("重复了");
  } else if (message === "success") {
    window.alert("成功了");
  }
}
window.removeTag = (id: string) => {
  return tagListModel.remove(id)
}
window.updateTag = (id: string, value: string) => {
  return tagListModel.update(id, value);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')