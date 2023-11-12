import './style.css'
import FullList from "./model/FullList.ts";
import ListTemplate from "./templates/ListTemplate.ts";
import ListItem from "./model/ListItem.ts";

const initApp = () => {
    const fullList = FullList.instance
    const listTemplate = ListTemplate.instance
    const itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement

    // itemEntryForm.addEventListener('submit', (e) => {
    //     e.preventDefault()
    //     const input = document.getElementById('newItem') as HTMLInputElement
    //     const newEntryText : string = input.value.trim()
    //     if (!newEntryText) return
    //     //id = 1 + last id in list, or 1 if list is empty
    //     const itemId : number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1
    //
    //     const newItem = new ListItem(itemId.toString(), newEntryText)
    //
    //     fullList.add(newItem)
    //     listTemplate.render(fullList)
    //
    // })

    if (!itemEntryForm) {
        console.error('itemEntryForm is null');
        return;
    }

    itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
        event.preventDefault()

        // Get the new item value
        const input = document.getElementById("newItem") as HTMLInputElement
        const newEntryText: string = input.value.trim()
        if (!newEntryText.length) return

        // calculate item ID
        const itemId: number = fullList.list.length
            ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
            : 1

        // create new item
        const newItem = new ListItem(itemId.toString(), newEntryText)
        // Add new item to full list
        fullList.add(newItem)
        // Re-render list with new item included
        listTemplate.render(fullList)
    })

    const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement

    clearItems.addEventListener('click', () => {
        fullList.clear()
        listTemplate.clear()
    })

    fullList.load()
    listTemplate.render(fullList)
}

document.addEventListener('DOMContentLoaded', initApp)