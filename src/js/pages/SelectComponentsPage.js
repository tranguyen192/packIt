import * as GlobalFunctions from '../functions/GlobalFunctions'
import Items from '../functions/Items'

export default class SelectComponentsPage {
  render(source, parent) {
    let data = {}
    let tripKey = null

    let keyManager = JSON.parse(localStorage.getItem('keyManager'))
    if (keyManager !== null) {
      tripKey = parseInt(keyManager[keyManager.length - 1])
      data = JSON.parse(localStorage.getItem('data_' + tripKey))
    }

    if (keyManager === null || data === null) {
      history.pushState({ page: 1 }, '', '/current-trips')
    } else {
      let kindOfTrip = []

      if (data.business === true) {
        kindOfTrip.push('business')
      }
      if (data.leisure === true) {
        kindOfTrip.push('leisure')
      }

      let items = new Items(localStorage.getItem('gender'), kindOfTrip)
      let selectedComponents = []

      // Check if all needed variables are set
      if (localStorage.getItem('gender') === null) {
        history.pushState({}, '', '/male-female')
      } else {
        let lists = {
          toDos: [],
          items: {},
        }

        parent.innerHTML = ''

        // show navItemBack
        GlobalFunctions.showBackButton()

        let currentPage = document.createElement('h1')
        currentPage.appendChild(document.createTextNode('Select Components'))

        let NextButton = document.createElement('button')
        NextButton.classList.add('button')
        NextButton.appendChild(document.createTextNode('Create Trip'))
        NextButton.onclick = () => {
          let tripToDos = items.getToDos()
          let generalItems = items.getGeneralItems()
          let tripItems = {
            toBuy: {
              clothes: [],
              toiletries: [],
              essentials: [],
            },
            toPack: {
              clothes: [],
              toiletries: [],
              essentials: [],
            },
          }

          for (let i = 0; i < generalItems.length; i++) {
            tripItems = this.sortItemsByCategory(generalItems[i], tripItems)
          }

          let varyingItems = items.getVaryingItems()

          for (let i = 0; i < varyingItems.length; i++) {
            if (
              selectedComponents.includes(
                varyingItems[i].component.replace(' ', '-'),
              )
            ) {
              tripItems = this.sortItemsByCategory(varyingItems[i], tripItems)
            }
          }

          lists.toDos = tripToDos
          lists.items = tripItems

          // Put the trip object back to the storage
          localStorage.setItem('lists_' + tripKey, JSON.stringify(lists))
          history.pushState({ page: 1 }, '', '/current-trips')
        }

        let activities = items.getComponentsActivities()
        let accomodation = items.getComponentsAccomodation()
        let transportation = items.getComponentsTransportation()
        let other = items.getComponentsOther()

        let ActivitiesList = this.createSection(
          activities,
          'Activities',
          selectedComponents,
        )
        let AccomodationList = this.createSection(
          accomodation,
          'Accomodation',
          selectedComponents,
        )
        let TransportationList = this.createSection(
          transportation,
          'Transportation',
          selectedComponents,
        )
        let OtherList = this.createSection(other, 'Other', selectedComponents)

        parent.appendChild(currentPage)
        parent.appendChild(ActivitiesList)
        parent.appendChild(AccomodationList)
        parent.appendChild(TransportationList)
        parent.appendChild(OtherList)
        parent.appendChild(NextButton)
      }
    }
  }

  selectComponent(ButtonElementID, selectedComponents) {
    if (selectedComponents.includes(ButtonElementID)) {
      var index = selectedComponents.indexOf(ButtonElementID)
      if (index > -1) {
        selectedComponents.splice(index, 1)
      }
    } else {
      selectedComponents.push(ButtonElementID)
    }
  }

  sortItemsByCategory(item, tripItems) {
    if (item.category === 'clothes') {
      tripItems.toPack.clothes.push(item)
    } else if (item.category === 'toiletries') {
      tripItems.toPack.toiletries.push(item)
    } else if (item.category === 'essentials') {
      tripItems.toPack.essentials.push(item)
    }
    return tripItems
  }

  createSection(array, headlineContent, selectedComponents) {
    let section = document.createElement('section')
    section.classList.add('select-components')
    let headline = document.createElement('h2')
    headline.appendChild(document.createTextNode(headlineContent))
    headline.classList.add('select-components__headline')
    section.appendChild(headline)
    console.log(array)
    for (let i = 0; i < array.length; i++) {
      let ItemElement = document.createElement('button')
      ItemElement.id = array[i].replace(' ', '-')
      ItemElement.onclick = () => {
        toggleColorButtonElement(ItemElement.id)
        this.selectComponent(ItemElement.id, selectedComponents)
      }
      ItemElement.classList.add('button-element')
      ItemElement.appendChild(document.createTextNode(array[i]))
      section.appendChild(ItemElement)
    }
    return section
  }
}

function toggleColorButtonElement(ButtonElementID) {
  var ButtonElement = document.getElementById(ButtonElementID).classList
  if (ButtonElement.contains('button-element--active')) {
    ButtonElement.remove('button-element--active')
  } else {
    ButtonElement.add('button-element--active')
  }
}
