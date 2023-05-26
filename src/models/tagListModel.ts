import createId from "@/lib/createId";

const localStorageKeyName = 'tagList';
type sourceType = { id: string, name: string, value: string };
type TagListModel = {
    data: sourceType[]
    fetch: () => sourceType[]
    create: (names: string) => 'success' | 'duplicated'
    update: (id: string, value: string) => 'success' | 'not found' | 'duplicated'
    remove: (id: string) => boolean
    save: () => void
}

const tagListModel: TagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data;
    },
    create(names: string) {
        const itemValue = this.data.map(item => item.value)
        if (itemValue.indexOf(names) >= 0) {
            return 'duplicated'
        }
        const id=createId().toString()
        this.data.push({ id, name: "other", value: names })
        this.save()
        return 'success'
    },
    update(id: string, value: string) {
        const idList = this.data.map(item => item.id)
        if (idList.indexOf(id) >= 0) {
            const values = this.data.map(item => item.value)
            if (values.indexOf(value) >= 0) {
                return 'duplicated'
            } else {
                const tag = this.data.filter(item => item.id === id)[0]
                tag.value = value
                this.save()
                return 'success'
            }
        } else {
            return 'not found'
        }
    },
    remove(id: string) {
        let index = -1
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                index = i;
                break
            }
        }
        this.data.splice(index, 1)
        this.save()
        return true
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
};

export default tagListModel;