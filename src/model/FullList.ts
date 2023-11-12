import ListItem from "./ListItem.ts";

interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clear(): void,
    add(itemObj: ListItem): void,
    remove(id: string): void,
}

export default class FullList implements List{
    // singleton list, so private constructor
    static instance: FullList = new FullList()
    private constructor(private _list: ListItem[] = []) {}

    get list(): ListItem[] {
        return this._list
    }

    load(): void {
        const storedList : string | null = localStorage.getItem("list")
        if (typeof storedList !== 'string') {
            return
        }
        const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(storedList)
        // this._list = parsedList.map(item => new ListItem(item._id, item._item, item._checked))
        parsedList.forEach(item => {
            const newItem = new ListItem(item._id, item._item, item._checked)
            FullList.instance.add(newItem)
        })
    }
    save(): void {
        localStorage.setItem('list', JSON.stringify(this._list))
    }
    clear(): void {
        this._list = []
        this.save()
    }
    add(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }
    remove(id: string): void {
        //danger: this will remove all items with the same id, not just the first one
        // this._list = this._list.filter(item => item.id !== id)
        //remove the first item with the given id instead
        const index = this._list.findIndex(item => item.id === id)
        this._list.splice(index, 1)
        this.save()
    }


}