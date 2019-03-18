import Handlebars from 'handlebars/dist/handlebars.min.js'

import * as GlobalFunctions from '../functions/GlobalFunctions'
import CreateToDo from '../functions/FunctionsToDo'
import CreateToBuyToPack from '../functions/FunctionsToBuyToPack'

// Import Handlebars to use it in JavaScript

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
      // show navItemBack
      GlobalFunctions.showBackButton()

      // Define source
      let templateSource = '<h1>{{currentPage}}</h1>'
      // Compile source and create template
      let template = Handlebars.compile(templateSource)
      // Get JSON data
      // let key = localStorage.getItem('currentTrip')
      // let tripName = JSON.parse(localStorage.getItem('data_' + key))
      // let data = { currentPage: tripName.name }
      // Call the handlebars template with data
      let currentPage = template(data)

      // let currentTripItems = JSON.parse(localStorage.getItem('lists_' + key))
      // let checkedItems = JSON.parse(localStorage.getItem('checkedItems_' + key))
      const newList = this.transformList(currentTripItems, key)

      //= ==========================================================

      // BUTTONS - TO DO - TO BUY - TO PACK
      let ItemsToPack = document.createElement('ul')
      ItemsToPack.setAttribute('id', 'list-topack')
      ItemsToPack.setAttribute('class', 'list')

      let ItemsToDo = document.createElement('ul')
      ItemsToDo.setAttribute('id', 'list-todo')
      ItemsToDo.setAttribute('class', 'list')

      let ItemsToBuy = document.createElement('ul')
      ItemsToBuy.setAttribute('id', 'list-tobuy')
      ItemsToBuy.setAttribute('class', 'list')

      let ToDoButton = document.createElement('h2')
      // ToDoButton.classList.add('accordion')
      ToDoButton.appendChild(document.createTextNode('To Do'))
      ToDoButton.setAttribute('id', 'btn1')
      ToDoButton.setAttribute('class', 'list-type')

      let clipboard = document.createElement('i')
      ToDoButton.appendChild(clipboard)

      let ToBuyButton = document.createElement('h2')
      // ToBuyButton.classList.add('accordion')
      ToBuyButton.appendChild(document.createTextNode('To Buy'))
      ToBuyButton.setAttribute('id', 'btn2')

      ToBuyButton.setAttribute('class', 'list-type')
      ToBuyButton.classList.add('list-type')

      let cart = document.createElement('i')
      ToBuyButton.appendChild(cart)

      let ToPackButton = document.createElement('h2')
      // ToPackButton.classList.add('accordion')
      ToPackButton.appendChild(document.createTextNode('To Pack'))
      ToPackButton.setAttribute('id', 'btn3')
      ToPackButton.setAttribute('class', 'list-type')

      let suitcase = document.createElement('i')
      ToPackButton.appendChild(suitcase)

      //= ==========================================================

      let createToDo = new CreateToDo()
      createToDo.createToDoList(
        newList.toDos,
        ItemsToDo,
        key,
        currentTripItems.toDos,
        currentTripItems,
      )

      //= ==========================================================

      let createToBuy = new CreateToBuyToPack()

      let headerClothesToBuy = document.createElement('h3')
      headerClothesToBuy.appendChild(document.createTextNode('Clothes'))
      ItemsToBuy.appendChild(headerClothesToBuy)
      createToBuy.createList(
        newList.toBuyClothes,
        ItemsToBuy,
        key,
        currentTripItems.items.toBuy.clothes,
        currentTripItems,
        'toBuyClothes',
        'clothes',
      )

      let headerToiletriesToBuy = document.createElement('h3')
      headerToiletriesToBuy.appendChild(document.createTextNode('Toiletries'))
      ItemsToBuy.appendChild(headerToiletriesToBuy)
      createToBuy.createList(
        newList.toBuyToiletries,
        ItemsToBuy,
        key,
        currentTripItems.items.toBuy.toiletries,
        currentTripItems,
        'toBuyToiletries',
        'toiletries',
      )

      let headerEssentialsToBuy = document.createElement('h3')
      headerEssentialsToBuy.appendChild(document.createTextNode('Essentials'))
      ItemsToBuy.appendChild(headerEssentialsToBuy)
      createToBuy.createList(
        newList.toBuyEssentials,
        ItemsToBuy,
        key,
        currentTripItems.items.toBuy.essentials,
        currentTripItems,
        'toBuyEssentials',
        'essentials',
      )

      //= ==========================================================

      let createToPack = new CreateToBuyToPack()

      let headerClothesToPack = document.createElement('h3')
      headerClothesToPack.appendChild(document.createTextNode('Clothes'))
      ItemsToPack.appendChild(headerClothesToPack)
      createToPack.createList(
        newList.toPackClothes,
        ItemsToPack,
        key,
        currentTripItems.items.toPack.clothes,
        currentTripItems,
        'toPackClothes',
        'clothes',
      )

      let headerToiletriesToPack = document.createElement('h3')
      headerToiletriesToPack.appendChild(document.createTextNode('Toiletries'))
      ItemsToPack.appendChild(headerToiletriesToPack)
      createToPack.createList(
        newList.toPackToiletries,
        ItemsToPack,
        key,
        currentTripItems.items.toPack.toiletries,
        currentTripItems,
        'toPackToiletries',
        'toiletries',
      )

      let headerEssentialsToPack = document.createElement('h3')
      headerEssentialsToPack.appendChild(document.createTextNode('Essentials'))
      ItemsToPack.appendChild(headerEssentialsToPack)
      createToPack.createList(
        newList.toPackEssentials,
        ItemsToPack,
        key,
        currentTripItems.items.toPack.essentials,
        currentTripItems,
        'toPackEssentials',
        'essentials',
      )

      parent.innerHTML = currentPage

      parent.appendChild(ToDoButton)
      parent.appendChild(ItemsToDo)

      parent.appendChild(ToBuyButton)
      parent.appendChild(ItemsToBuy)

      parent.appendChild(ToPackButton)
      parent.appendChild(ItemsToPack)
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
}

// function toggleVisibility(id) {
//   var e = document.getElementById(id)
//   if (e.style.display === 'block') e.style.display = 'none'
//   else e.style.display = 'block'
// }
