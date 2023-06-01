import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone'
import createId from '@/lib/createId';
import router from '@/router';
import defaultTagList from '@/constants/defaultTagList'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined
  } as RootState,
  mutations: {
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0]
    },
    updateTag(state, payload: { id: string, value: string }) {
      const { id, value } = payload
      const idList = state.tagList.map(item => item.id)
      if (idList.indexOf(id) >= 0) {
        const values = state.tagList.map(item => item.value)
        if (values.indexOf(value) >= 0) {
          window.alert('重复了')
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0]
          tag.value = value
          store.commit('saveTags')
        }
      }
    },
    deleteTag(state, tag: Tag) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].value === tag.value) {
          state.tagList.splice(i, 1)
        }
      }
      store.commit('saveTags')
    },
    removeTag(state, id: string) {
      let index = -1
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break
        }
      } if (index >= 0) {
        state.tagList.splice(index, 1)
        store.commit('saveTags')
        router.back()
      } else {
        window.alert('删除失败')
      }

    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordList[];

    },
    createRecords(state, record) {
      const record2: RecordList = clone(record);
      record2.createdAt = new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecord')
    },
    saveRecord(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('setDefault')
      }
    },
    setDefault() {
      for (let i = 0; i < defaultTagList.length; i++) {
        store.commit('createTag', defaultTagList[i].value)
      }
    },
    createTag(state, names) {
      const itemValue = state.tagList.map(item => item.value)
      if (itemValue.indexOf(names) >= 0) {
        window.alert("重复了")
      }
      const id = createId().toString()
      state.tagList.push({ id, name: "other", value: names })
      store.commit('saveTags')
      // window.alert("成功了")
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
  },
  actions: {
  },
  modules: {
  }
});
export default store
