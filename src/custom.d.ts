type RecordList = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: string;
};
type RootState = {
  recordList: RecordList[],
  tagList: Tag[],
  currentTag?: Tag
  budget:number|null
}
type Tag = { id: string, name: string, value: string ,type:string};
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (names: string) => 'success' | 'duplicated'
  update: (id: string, value: string) => 'success' | 'not found' | 'duplicated'
  remove: (id: string) => boolean
  save: () => void
}
interface Window {

}