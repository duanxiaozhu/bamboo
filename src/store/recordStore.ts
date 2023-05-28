import clone from "@/lib/clone";
const localStorageKeyName = 'recordList';
const recordStore = {
    recordList: [] as RecordItem[],
    createRecords(record: RecordItem) {
        const record2: RecordItem = clone(record);
        record2.createdAt = new Date();
        this.recordList.push(record2);
        recordStore.saveRecord()
    },
    fetchRecords() {
        this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.recordList
    },
    saveRecord() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
    }
};

export default recordStore;