type RecordList = {
  id:string;
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
  currentRecord?:RecordList
}
type Tag = { id: string, name: string, value: string ,type:string};

interface Window {

}