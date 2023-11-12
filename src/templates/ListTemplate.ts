import FullList from "../model/FullList.ts";

interface DOMList {
    ul: HTMLUListElement,

    clear(): void,

    render(fullList: FullList): void,
}

export default class ListTemplate implements DOMList {
    static instance = new ListTemplate()
    ul: HTMLUListElement


    private constructor() {
        //check elementId in index.html, it's the id of the <ul> element
        this.ul = document.getElementById('listItems') as HTMLUListElement
    }

    clear(): void {
        this.ul.innerHTML = ''
    }

    render(fullList: FullList): void {
        this.clear()
        fullList.list.forEach(item => {
            const li = document.createElement('li') as HTMLLIElement
            li.className = "item"

            const check = document.createElement('input') as HTMLInputElement
            check.type = "checkbox"
            check.id = item.id //uses get id from ListItem.ts
            check.tabIndex = 0
            check.checked = item.checked
            li.append(check)

            check.addEventListener('change', () => {
                item.checked = !item.checked //click swaps state
                fullList.save()
            })
            const label = document.createElement('label') as HTMLLabelElement
            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)

            const button = document.createElement('button') as HTMLButtonElement
            button.className = 'button'
            button.textContent = 'X'
            li.append(button)

            button.addEventListener('click', () => {
                fullList.remove(item.id)
                // fullList.save() called in remove()
                this.render(fullList) //doesn't loop because of event listener
            })
            this.ul.append(li)
        })

    }
}