import createId from "@/lib/createId";

const localStorageKeyName = 'tagList';

const tagStore = {
    tagList: [] as Tag[],
    fetchTags() {
        this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.tagList;
    },
    findTag(id: string) {
        return this.tagList.filter(t => t.id === id)[0]
    },
    createTag(names: string) {
        const itemValue = this.tagList.map(item => item.value)
        if (itemValue.indexOf(names) >= 0) {
            window.alert("重复了")
            return 'duplicated'
        }
        const id = createId().toString()
        this.tagList.push({ id, name: "other", value: names })
        this.saveTags()
        window.alert("成功了")
        return 'success'
    },
    updateTag(id: string, value: string) {
        const idList = this.tagList.map(item => item.id)
        if (idList.indexOf(id) >= 0) {
            const values = this.tagList.map(item => item.value)
            if (values.indexOf(value) >= 0) {
                return 'duplicated'
            } else {
                const tag = this.tagList.filter(item => item.id === id)[0]
                tag.value = value
                this.saveTags()
                return 'success'
            }
        } else {
            return 'not found'
        }
    },
    removeTag(id: string) {
        let index = -1
        for (let i = 0; i < this.tagList.length; i++) {
            if (this.tagList[i].id === id) {
                index = i;
                break
            }
        }
        this.tagList.splice(index, 1)
        this.saveTags()
        return true
    },
    saveTags() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
    }
};
tagStore.fetchTags()
export default tagStore
