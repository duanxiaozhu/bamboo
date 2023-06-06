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
    currentTag: undefined,
    budget: null,
    currentRecord: undefined
  } as RootState,
  mutations: {
    //budget
    removeBudget(state) {
      state.budget = null;
      store.commit('saveBudget');
    },
    fetchBudget(state) {
      state.budget = JSON.parse(window.localStorage.getItem('budget') || '0');
    },
    createBudget(state, money: number) {
      state.budget = money;
      store.commit('saveBudget');
    },
    saveBudget(state) {
      window.localStorage.setItem('budget', JSON.stringify(state.budget));
    },
    //currentRecord
    setCurrentRecord(state, id: string) {
      state.currentRecord = state.recordList.filter(r => r.id === id)[0]
    },
    //recordList
    updateRecord(state, payload: { id: string, amount: number, notes: string }) {
      const { id, amount, notes } = payload
        const record = state.recordList.filter(item => item.id === id)[0]
        record.amount = amount
        record.notes = notes
        store.commit('saveRecord')
    },
    removeRecord(state, id: string) {
      let index = -1
      for (let i = 0; i < state.recordList.length; i++) {
        if (state.recordList[i].id === id) {
          index = i;
          break
        }
      } if (index >= 0) {
        state.recordList.splice(index, 1)
        store.commit('saveRecord')
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
      record2.id = createId().toString()
      state.recordList.push(record2);
      store.commit('saveRecord')
    },
    saveRecord(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },

    //setCurrentTag
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0]
    },
    //tagList
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
    deleteTag(state, tag: Tag) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].value === tag.value) {
          state.tagList.splice(i, 1)
        }
      }
      store.commit('saveTags')
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('setDefault')
      }
    },
    setDefault() {
      for (let i = 0; i < defaultTagList.length; i++) {
        store.commit('createTag', defaultTagList[i])
      }
    },
    createTag(state, newTag: Tag) {
      const id = createId().toString()
      state.tagList.push({ id, name: newTag.name, value: newTag.value, type: newTag.type })
      store.commit('saveTags')
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
