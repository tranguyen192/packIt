export default class CreateToBuyToPackList {
  createList(
    ListArray,
    ItemUL,
    key,
    currentTripItems,
    completeLists,
    textfieldID,
    category,
  ) {
    const checkedItems =
      JSON.parse(localStorage.getItem('checkedItems_' + key)) || []
    for (let i = 0; i < ListArray.length; i++) {
      let item = document.createElement('li')
      item.setAttribute('id', ListArray[i].name)
      item.classList.add('list-styling')
      ItemUL.appendChild(item)

      let divElement1 = document.createElement('div')
      divElement1.setAttribute('class', 'list-1__flex')
      item.appendChild(divElement1)

      let divElement2 = document.createElement('div')
      divElement2.setAttribute('class', 'list__flex')
      item.appendChild(divElement2)

      // Add checked icon
      let checkIcon = document.createElement('i')
      checkIcon.setAttribute('class', 'far fa-check-circle')
      checkIcon.setAttribute('tabindex', '0')
      checkIcon.setAttribute('aria-hidden', 'true')
      checkIcon.setAttribute('data-item', ListArray[i].id)
      checkIcon.onkeypress = e => {
        if (e.keyCode === 13) {
          // checkIcon.classList.toggle('fas')

          const itemId = e.currentTarget.dataset.item
          // let checkedItems = localStorage.getItem('checkedItems_' + key)
          // checkedItems = JSON.parse(checkedItems)

          // if (!checkedItems) checkedItems = []
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

      if (checkedItems.includes(ListArray[i].id))
        checkIcon.classList.toggle('fas')

      checkIcon.onclick = event => {
        const itemId = event.currentTarget.dataset.item
        // let checkedItems = localStorage.getItem('checkedItems_' + key)
        // checkedItems = JSON.parse(checkedItems)

        // if (!checkedItems) checkedItems = []
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
      divElement1.appendChild(checkIcon)

      // Add item
      divElement1.appendChild(document.createTextNode(ListArray[i].name))

      // Add delete icon
      let trashIcon = document.createElement('i')
      trashIcon.setAttribute('class', 'far fa-trash-alt')
      trashIcon.setAttribute('tabindex', '0')
      trashIcon.setAttribute('aria-hidden', 'true')
      trashIcon.onkeypress = e => {
        if (e.keyCode === 13) {
          deleteCheckedItemInLocalStorage(
            checkedItems,
            ListArray[i].id,
            ListArray[i].name,
            key,
          )

          deleteTodoInLocalStorage(
            currentTripItems,
            ListArray[i].name,
            key,
            completeLists,
          )
        }
      }
      trashIcon.onclick = () => {
        deleteCheckedItemInLocalStorage(
          checkedItems,
          ListArray[i].id,
          ListArray[i].name,
          key,
        )

        deleteTodoInLocalStorage(
          currentTripItems,
          ListArray[i].name,
          key,
          completeLists,
        )
      }
      divElement2.appendChild(trashIcon)
    }

    // Add user input items
    let liElement = document.createElement('li')
    liElement.setAttribute('class', 'add-item')
    // liElement.classList.add('list-styling')
    ItemUL.appendChild(liElement)

    let inputElement = document.createElement('input')
    inputElement.classList.add('userInput')
    inputElement.setAttribute('id', textfieldID)
    inputElement.setAttribute('for', 'user_input')
    inputElement.setAttribute('type', 'text')
    inputElement.setAttribute('onfocus', 'this.value=""')
    inputElement.setAttribute('placeholder', '+ Add Item')
    inputElement.setAttribute('maxlength', '30')
    liElement.appendChild(inputElement)

    let divElement1 = document.createElement('button')
    divElement1.appendChild(document.createTextNode('Save'))
    divElement1.setAttribute('class', 'button')
    divElement1.setAttribute('id', 'save')
    divElement1.onclick = () => {
      let newItems = document.createElement('li')
      newItems.classList.add('list-styling')
      let text = document.getElementById(textfieldID).value
      let uniqueID = text.replace(' ', '-')

      // WARNING
      let oldWarning = document.getElementById('item-warning1')
      if (oldWarning !== null) {
        oldWarning.remove()
      }

      if (text.length > 0) {
        let IsUnique = false
        for (let n = 0; n < currentTripItems.length; n++) {
          if (currentTripItems[n].item === text) {
            IsUnique = true
          }
        }

        // CHECK IF UNIQUE KEY ALREADY EXISTS
        if (!IsUnique) {
          if (category === 'clothes') {
            let newClothes = {
              category: 'clothes',
              item: text,
            }
            currentTripItems.push(newClothes)
            window.location.reload(false)
          } else if (category === 'toiletries') {
            let newToiletries = {
              category: 'Toiletries',
              item: text,
            }
            currentTripItems.push(newToiletries)
            window.location.reload(false)
          } else if (category === 'essentials') {
            let newEssentials = {
              category: 'Essentials',
              item: text,
            }
            currentTripItems.push(newEssentials)
            window.location.reload(false)
          }

          localStorage.setItem('lists_' + key, JSON.stringify(completeLists))

          newItems.setAttribute('id', uniqueID)
          document.getElementById(textfieldID).value = ''

          let divElement1 = document.createElement('div')
          divElement1.setAttribute('class', 'list-1__flex')
          newItems.appendChild(divElement1)

          let divElem2 = document.createElement('div')
          divElem2.setAttribute('class', 'list__flex')
          newItems.appendChild(divElem2)

          // Add checked icon
          let checkIcon = document.createElement('i')
          checkIcon.setAttribute('class', 'far fa-check-circle')
          checkIcon.setAttribute('data-item', uniqueID)
          checkIcon.onkeypress = e => {
            if (e.keyCode === 13) {
              // checkIcon.classList.toggle('fas')

              const itemId = e.currentTarget.dataset.item
              // let checkedItems = localStorage.getItem('checkedItems_' + key)
              // checkedItems = JSON.parse(checkedItems)

              // if (!checkedItems) checkedItems = []
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

          // if (checkedItems.includes(ListArray[i].id))
          //   checkIcon.classList.toggle('fas')

          checkIcon.onclick = event => {
            const itemId = event.currentTarget.dataset.item
            // let checkedItems = localStorage.getItem('checkedItems_' + key)
            // checkedItems = JSON.parse(checkedItems)

            // if (!checkedItems) checkedItems = []
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
          divElement1.appendChild(checkIcon)

          // To do item
          divElement1.appendChild(document.createTextNode(text))

          // Delete item
          let TrashIcon = document.createElement('i')
          TrashIcon.setAttribute('class', 'far fa-trash-alt')
          TrashIcon.onkeypress = e => {
            if (e.keyCode === 13) {
              deleteCheckedItemInLocalStorage(checkedItems, uniqueID, text, key)
              deleteTodoInLocalStorage(
                currentTripItems,
                text,
                key,
                completeLists,
              )
            }
          }
          TrashIcon.onclick = () => {
            deleteCheckedItemInLocalStorage(checkedItems, uniqueID, text, key)
            deleteTodoInLocalStorage(currentTripItems, text, key, completeLists)
          }
          divElem2.appendChild(TrashIcon)

          ItemUL.insertBefore(newItems, liElement)
        } else {
          errormessage(text, textfieldID)

          // let error = document.createElement('li')
          // error.appendChild(
          //   document.createTextNode(`"${text}" already exist in your list!`),
          // )
          // error.setAttribute('class', 'warning')
          // error.setAttribute('id', 'item-warning1')

          // liElement.appendChild(error)
        }
      } else {
        checkLenght()
      }
    }

    // DISPLAY INPUT FIELD FOR USER
    liElement.appendChild(divElement1)
  }
}

function checkLenght() {
  alert(`Hi you! Item cannot be empty.`)
}

function errormessage(text, textfieldID) {
  if (textfieldID === 'toBuyClothes') {
    alert(
      `Hi you! You have already added "${text}" in your ToBuy List for clothes.`,
    )
  } else if (textfieldID === 'toBuyToiletries') {
    alert(
      `Hi you! You have already added "${text}" in your ToBuy List for toiletries.`,
    )
  } else if (textfieldID === 'toBuyEssentials') {
    alert(
      `Hi you! You have already added "${text}" in your ToBuy List for essentials.`,
    )
  } else if (textfieldID === 'toPackClothes') {
    alert(
      `Hi you! You have already added "${text}" in your ToPack List for clothes.`,
    )
  } else if (textfieldID === 'toPackToiletries') {
    alert(
      `Hi you! You have already added "${text}" in your ToPack List for toiletries.`,
    )
  } else if (textfieldID === 'toPackEssentials') {
    alert(
      `Hi you! You have already added "${text}" in your ToPack List for essentials.`,
    )
  }
}

function checkItems(ID) {
  ID.classList.toggle('fas')
}

function deleteCheckedItemInLocalStorage(checkedItems, ListID, ID, key) {
  console.log(ListID)

  for (let k = 0; k < checkedItems.length; k++) {
    if (checkedItems[k] === ListID) {
      checkedItems.splice(k, 1)
    }
  }

  let elem = document.getElementById(ID)
  elem.style.display = 'none'
  // Put the trip object back to the storage
  localStorage.setItem('checkedItems_' + key, JSON.stringify(checkedItems))
}

function deleteTodoInLocalStorage(
  currentTripItems,
  itemName,
  key,
  completeLists,
) {
  let elem = document.getElementById(itemName)
  elem.style.display = 'none'

  for (let k = 0; k < currentTripItems.length; k++) {
    if (currentTripItems[k].item === itemName) {
      currentTripItems.splice(k, 1)
    }
  }

  console.log(completeLists)

  // Put the trip object back to the storage
  localStorage.setItem('lists_' + key, JSON.stringify(completeLists))
}
