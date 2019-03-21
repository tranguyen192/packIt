import Handlebars from 'handlebars/dist/handlebars.min.js'
import * as GlobalFunctions from '../functions/GlobalFunctions'

export default class ListsPage {
  render(source, parent) {
    parent.innerHTML = ''

    let tripName
    let data
    let currentTripItems
    let key = localStorage.getItem('currentTrip')

    if (key !== null) {
      tripName = JSON.parse(localStorage.getItem('data_' + key))
      currentTripItems = JSON.parse(localStorage.getItem('lists_' + key))
    }

    if (key === null || tripName === null || currentTripItems === null) {
      history.pushState({ page: 1 }, '', '/current-trips')
    } else {
      data = { currentPage: tripName.name }
      GlobalFunctions.showBackButton()

      let templateSource = '<h1>{{currentPage}}</h1>'
      let template = Handlebars.compile(templateSource)
      let currentPage = template(data)

      const newList = this.transformList(currentTripItems, key)

      let counter = 0
      let toDo = document.createElement('h2')
      toDo.appendChild(document.createTextNode('To Do'))
      toDo.setAttribute('id', 'btn1')
      toDo.setAttribute('class', 'list-type')

      let toBuy = document.createElement('h2')
      toBuy.appendChild(document.createTextNode('To Buy'))
      toBuy.setAttribute('id', 'btn2')
      toBuy.setAttribute('class', 'list-type')

      let toPack = document.createElement('h2')
      toPack.appendChild(document.createTextNode('To Pack'))
      toPack.setAttribute('id', 'btn3')
      toPack.setAttribute('class', 'list-type')

      let itemsToDo = document.createElement('ul')
      itemsToDo.setAttribute('id', 'list-todo')
      itemsToDo.setAttribute('class', 'list')

      let itemsToBuy = document.createElement('ul')
      itemsToBuy.setAttribute('id', 'list-tobuy')
      itemsToBuy.setAttribute('class', 'list')

      let itemsToPack = document.createElement('ul')
      itemsToPack.setAttribute('id', 'list-topack')
      itemsToPack.setAttribute('class', 'list')

      this.showItemsInList(newList.toDos, itemsToDo, key, currentTripItems)

      this.showItemsInList(
        newList.toPackClothes,
        itemsToPack,
        key,
        currentTripItems,
      )
      this.showItemsInList(
        newList.toPackEssentials,
        itemsToPack,
        key,
        currentTripItems,
      )
      this.showItemsInList(
        newList.toPackToiletries,
        itemsToPack,
        key,
        currentTripItems,
      )

      this.showItemsInList(
        newList.toBuyClothes,
        itemsToBuy,
        key,
        currentTripItems,
        (counter = 1),
      )
      this.showItemsInList(
        newList.toBuyEssentials,
        itemsToBuy,
        key,
        currentTripItems,
        (counter = 2),
      )
      this.showItemsInList(
        newList.toBuyToiletries,
        itemsToBuy,
        key,
        currentTripItems,
        (counter = 3),
      )

      parent.innerHTML = currentPage

      parent.appendChild(toDo)
      parent.appendChild(itemsToDo)

      parent.appendChild(toBuy)
      parent.appendChild(itemsToBuy)

      parent.appendChild(toPack)
      parent.appendChild(itemsToPack)
    }
  }

  showItemsInList(newList, itemsListUL, key, completeList, counter) {
    let whatToPack

    const checkedItems =
      JSON.parse(localStorage.getItem('checkedItems_' + key)) || []

    newList.forEach(element => {
      whatToPack = element.category
    })

    if (whatToPack == 'clothes' || counter == 1) {
      let clothes = document.createElement('h3')
      clothes.appendChild(document.createTextNode('Clothes'))
      itemsListUL.appendChild(clothes)
    } else if (whatToPack == 'essentials' || counter == 2) {
      let essentials = document.createElement('h3')
      essentials.appendChild(document.createTextNode('Essentials'))
      itemsListUL.appendChild(essentials)
    } else if (whatToPack == 'toiletries' || counter == 3) {
      let toiletries = document.createElement('h3')
      toiletries.appendChild(document.createTextNode('Toiletries'))
      itemsListUL.appendChild(toiletries)
    }

    newList.forEach(element => {
      let item = document.createElement('li')
      item.setAttribute('id', element.name)
      item.classList.add('list-styling')
      itemsListUL.appendChild(item)

      let divElement1 = document.createElement('div')
      divElement1.setAttribute('class', 'list-1__flex')
      item.appendChild(divElement1)

      let divElement2 = document.createElement('div')
      divElement2.setAttribute('class', 'list__flex')
      item.appendChild(divElement2)

      let checkIcon = document.createElement('i')
      checkIcon.setAttribute('class', 'far fa-check-circle')
      checkIcon.setAttribute('tabindex', '0')
      checkIcon.setAttribute('aria-hidden', 'true')
      checkIcon.setAttribute('data-item', element.id)
      checkIcon.onkeypress = e => {
        if (e.keyCode === 13) {
          const itemId = e.currentTarget.dataset.item
          if (checkedItems) {
            if (!checkedItems.includes(itemId)) {
              checkedItems.push(itemId)
            } else {
              const index = checkedItems.indexOf(itemId)
              checkedItems.splice(index, 1)
            }
          }
          localStorage.setItem(
            'checkedItems_' + key,
            JSON.stringify(checkedItems),
          )
          checkItems(checkIcon)
        }
      }

      if (checkedItems.includes(element.id)) checkIcon.classList.toggle('fas')

      checkIcon.onclick = event => {
        const itemId = event.currentTarget.dataset.item

        if (checkedItems) {
          if (!checkedItems.includes(itemId)) {
            checkedItems.push(itemId)
          } else {
            const index = checkedItems.indexOf(itemId)
            checkedItems.splice(index, 1)
          }
        }
        localStorage.setItem(
          'checkedItems_' + key,
          JSON.stringify(checkedItems),
        )
        this.checkItems(checkIcon)
      }

      divElement1.appendChild(checkIcon)
      divElement1.appendChild(document.createTextNode(element.name))

      let trashIcon = document.createElement('i')
      trashIcon.setAttribute('class', 'far fa-trash-alt')
      trashIcon.setAttribute('tabindex', '0')
      trashIcon.setAttribute('aria-hidden', 'true')
      trashIcon.onkeypress = e => {
        if (e.keyCode === 13) {
          this.deleteItemInLocalStorage(
            element.name,
            key,
            completeList,
            itemsListUL.id,
          )
          this.deleteCheckedItemInLocalStorage(
            checkedItems,
            element.id,
            element.name,
            key,
          )
        }
      }
      trashIcon.onclick = () => {
        this.deleteItemInLocalStorage(
          element.name,
          key,
          completeList,
          itemsListUL.id,
        )
        this.deleteCheckedItemInLocalStorage(
          checkedItems,
          element.id,
          element.name,
          key,
        )
      }
      divElement2.appendChild(trashIcon)
    })

    let liElement = document.createElement('li')
    liElement.setAttribute('class', 'add-item')
    itemsListUL.appendChild(liElement)

    let inputElement = document.createElement('input')
    inputElement.classList.add('userInput')
    inputElement.setAttribute('id', whatToPack + itemsListUL.id + counter)
    inputElement.setAttribute('for', 'user_input')
    inputElement.setAttribute('type', 'text')
    inputElement.setAttribute('onfocus', 'this.value=""')
    inputElement.setAttribute('placeholder', '+ Add Item')
    inputElement.setAttribute('maxlength', '30')
    liElement.appendChild(inputElement)

    let button = document.createElement('button')
    button.appendChild(document.createTextNode('Save'))
    button.setAttribute('class', 'button')
    button.setAttribute('id', 'save')
    button.onclick = () => {
      let newItems = document.createElement('li')
      newItems.classList.add('list-styling')
      let text = document.getElementById(whatToPack + itemsListUL.id + counter)
        .value
      let uniqueID = text.replace(' ', '-')

      if (text.length > 0) {
        let IsUnique = false
        newList.forEach(item => {
          if (item.name === text) {
            IsUnique = true
          }
        })

        if (!IsUnique) {
          if (itemsListUL.id == 'list-todo') {
            completeList.toDos.push(text)
          } else if (itemsListUL.id == 'list-topack') {
            if (whatToPack === 'clothes') {
              let newClothes = {
                category: 'clothes',
                item: text,
              }
              completeList.items.toPack.clothes.push(newClothes)
            } else if (whatToPack === 'toiletries') {
              let newToiletries = {
                category: 'toiletries',
                item: text,
              }
              completeList.items.toPack.toiletries.push(newToiletries)
            } else if (whatToPack === 'essentials') {
              let newEssentials = {
                category: 'essentials',
                item: text,
              }
              completeList.items.toPack.essentials.push(newEssentials)
            }
          } else if (itemsListUL.id == 'list-tobuy') {
            if (counter == 1) {
              let newClothes = {
                category: 'clothes',
                item: text,
              }
              completeList.items.toBuy.clothes.push(newClothes)
            } else if (counter == 2) {
              let newEssentials = {
                category: 'essentials',
                item: text,
              }
              completeList.items.toBuy.essentials.push(newEssentials)
            } else if (counter == 3) {
              let newToiletries = {
                category: 'toiletries',
                item: text,
              }
              completeList.items.toBuy.toiletries.push(newToiletries)
            }
          }
          localStorage.setItem('lists_' + key, JSON.stringify(completeList))
          location.reload()
        } else {
          this.errormessage(text, itemsListUL.id)
        }
      } else {
        this.isEmpty()
      }
    }
    liElement.appendChild(button)
  }

  isEmpty() {
    alert(`Hi you! Item cannot be empty.`)
  }

  errormessage(text, whatList) {
    if (whatList === 'list-todo') {
      alert(`Hi you! You have already added "${text}" in your To Do List.`)
    } else if (whatList == 'list-tobuy') {
      alert(`Hi you! You have already added "${text}" in your To Buy List.`)
    } else if (whatList == 'list-topack') {
      alert(`Hi you! You have already added "${text}" in your To Pack List.`)
    }
  }

  transformList(list) {
    let toBuyClothes = []
    let toBuyToiletries = []
    let toBuyEssentials = []
    let toPackClothes = []
    let toPackEssentials = []
    let toPackToiletries = []
    let newTodos = []

    const { toDos, items } = list
    toDos.map((todo, i) => {
      newTodos.push({ id: `${todo.replace(' ', '-')}`, name: todo })
    })

    items.toBuy.clothes.map((item, i) => {
      toBuyClothes.push({
        id: `${item.item.replace(' ', '-')}-${item.category.substr(0, 3)}`,
        name: item.item,
        category: item.category,
      })
    })
    items.toBuy.toiletries.map((item, i) => {
      toBuyToiletries.push({
        id: `${item.item.replace(' ', '-')}-${item.category.substr(0, 3)}`,
        name: item.item,
        category: item.category,
      })
    })
    items.toBuy.essentials.map((item, i) => {
      toBuyEssentials.push({
        id: `${item.item.replace(' ', '-')}-${item.category.substr(0, 3)}`,
        name: item.item,
        category: item.category,
      })
    })
    items.toPack.clothes.map((item, i) => {
      toPackClothes.push({
        id: `${item.item.replace(' ', '-')}-${item.category.substr(0, 3)}`,
        name: item.item,
        category: item.category,
      })
    })
    items.toPack.toiletries.map((item, i) => {
      toPackToiletries.push({
        id: `${item.item.replace(' ', '-')}-${item.category.substr(0, 3)}`,
        name: item.item,
        category: item.category,
      })
    })
    items.toPack.essentials.map((item, i) => {
      toPackEssentials.push({
        id: `${item.item.replace(' ', '-')}-${item.category.substr(0, 3)}`,
        name: item.item,
        category: item.category,
      })
    })

    return {
      toDos: newTodos,
      toBuyClothes,
      toBuyEssentials,
      toBuyToiletries,
      toPackClothes,
      toPackEssentials,
      toPackToiletries,
    }
  }

  checkItems(ID) {
    ID.classList.toggle('fas')
  }

  deleteCheckedItemInLocalStorage(checkedItems, ListID, ID, key) {
    for (let k = 0; k < checkedItems.length; k++) {
      if (checkedItems[k] === ListID) {
        checkedItems.splice(k, 1)
      }
    }

    localStorage.setItem('checkedItems_' + key, JSON.stringify(checkedItems))
  }

  deleteItemInLocalStorage(itemName, key, newList, whatList) {
    let elem = document.getElementById(itemName)
    elem.style.display = 'none'

    if (whatList == 'list-topack') {
      for (let i = 0; i < newList.items.toPack.clothes.length; i++) {
        if (newList.items.toPack.clothes[i].item == itemName) {
          newList.items.toPack.clothes.splice(i, 1)
        }
      }

      for (let i = 0; i < newList.items.toPack.essentials.length; i++) {
        if (newList.items.toPack.essentials[i].item == itemName) {
          newList.items.toPack.essentials.splice(i, 1)
        }
      }

      for (let i = 0; i < newList.items.toPack.toiletries.length; i++) {
        if (newList.items.toPack.toiletries[i].item == itemName) {
          newList.items.toPack.toiletries.splice(i, 1)
        }
      }
    } else if (whatList == 'list-tobuy') {
      for (let i = 0; i < newList.items.toBuy.clothes.length; i++) {
        if (newList.items.toBuy.clothes[i].item == itemName) {
          newList.items.toBuy.clothes.splice(i, 1)
        }
      }

      for (let i = 0; i < newList.items.toBuy.essentials.length; i++) {
        if (newList.items.toBuy.essentials[i].item == itemName) {
          newList.items.toBuy.essentials.splice(i, 1)
        }
      }

      for (let i = 0; i < newList.items.toBuy.toiletries.length; i++) {
        if (newList.items.toBuy.toiletries[i].item == itemName) {
          newList.items.toBuy.toiletries.splice(i, 1)
        }
      }
    } else if (whatList == 'list-todo') {
      for (let i = 0; i < newList.toDos.length; i++) {
        if (newList.toDos[i] === itemName) {
          newList.toDos.splice(i, 1)
        }
      }
    }
    localStorage.setItem('lists_' + key, JSON.stringify(newList))
  }
}
