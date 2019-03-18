import Datepickk from 'datepickk/dist/datepickk.js'

import * as GlobalFunctions from './GlobalFunctions'
export default class CreateTripDataPage {
  render(source, parent) {
    parent.innerHTML = ''

    let tripData = {
      name: null,
      dates: null,
      business: false,
      leisure: false,
    }

    // Check if all needed variables are set
    if (localStorage.getItem('gender') === null) {
      history.pushState({}, '', '/male-female')
    } else {
      // show navItemBack
      GlobalFunctions.showBackButton()

      // Initialize datepicker
      var datepicker = new Datepickk()

      // Allows to select a range of two dates
      datepicker.range = true

      let currentPage = document.createElement('h1')
      currentPage.appendChild(document.createTextNode('Create a new Trip'))

      let NextButton = document.createElement('button')
      NextButton.classList.add('button')
      NextButton.appendChild(document.createTextNode('Next'))
      NextButton.onclick = () => {
        let tripName = document.getElementById('trip-name').value

        let inputError = false

        let warning = document.createElement('div')
        warning.id = 'warning'

        if (!tripData.leisure && !tripData.business) {
          let singleWarning = document.createElement('p')
          singleWarning.appendChild(
            document.createTextNode(
              'Travel type must be selected, either business or leisure.',
            ),
          )
          warning.appendChild(singleWarning)
          inputError = true
        }
        if (tripName.length <= 2) {
          let singleWarning = document.createElement('p')
          singleWarning.appendChild(
            document.createTextNode(
              'Trip name must not be empty and must be longer than two characters.',
            ),
          )
          warning.appendChild(singleWarning)
          inputError = true
        }
        if (datepicker.selectedDates.length !== 2) {
          let singleWarning = document.createElement('p')
          singleWarning.appendChild(
            document.createTextNode(
              'A date period (at least two dates) must be selected.',
            ),
          )
          warning.appendChild(singleWarning)
          inputError = true
        }
        if (!inputError) {
          tripData.name = tripName
          let keyManager
          let tripKey

          // If keyManager does not exist on the localStorage
          if (
            localStorage.getItem('keyManager') === null ||
            localStorage.getItem('keyManager') === '[]'
          ) {
            keyManager = [0]
            tripKey = 0
          }
          // If keyManager exist check lastTripKey
          else {
            keyManager = JSON.parse(localStorage.getItem('keyManager'))
            let lastTripKey = parseInt(keyManager[keyManager.length - 1])
            tripKey = lastTripKey + 1
            keyManager.push(tripKey)
          }

          let startDate = {
            day: datepicker.selectedDates[0].getDate(),
            month: datepicker.selectedDates[0].getMonth(),
            year: datepicker.selectedDates[0].getFullYear(),
          }
          let endDate = {
            day: datepicker.selectedDates[1].getDate(),
            month: datepicker.selectedDates[1].getMonth(),
            year: datepicker.selectedDates[1].getFullYear(),
          }
          let dates = [startDate, endDate]

          tripData.dates = dates

          // Put the data object on the local storage and save it with the tripKey
          localStorage.setItem('data_' + tripKey, JSON.stringify(tripData))

          // Put the current state of the keyManager on the local storage
          localStorage.setItem('keyManager', JSON.stringify(keyManager))

          // Go to the nex page
          history.pushState({ page: 1 }, '', '/select-components')
        } else {
          let oldWarning = document.getElementById('warning')
          if (oldWarning !== null) {
            oldWarning.remove()
          }
          parent.insertBefore(warning, NextButton)
        }
      }

      let calendar = document.createElement('div')
      calendar.id = 'calendar'

      let tripNameFieldset = document.createElement('fieldset')

      let tripNameLabel = document.createElement('label')
      tripNameLabel.setAttribute('for', 'trip-name')
      tripNameLabel.appendChild(document.createTextNode('Name of the Trip'))

      let tripNameInput = document.createElement('input')
      tripNameInput.setAttribute('type', 'text')
      tripNameInput.setAttribute('name', 'trip-name')
      tripNameInput.setAttribute('placeholder', 'e.g. Business trip to London')
      tripNameInput.id = 'trip-name'

      tripNameFieldset.appendChild(tripNameLabel)
      tripNameFieldset.appendChild(tripNameInput)

      let businessButton = document.createElement('button')
      businessButton.id = 'businessButton'
      businessButton.classList.add('button-element')
      businessButton.appendChild(document.createTextNode('Business'))
      businessButton.onclick = () => {
        if (tripData.business) {
          tripData.business = false
        } else {
          tripData.business = true
        }
        toggleColorButtonElement(businessButton.id)
      }

      let leisureButton = document.createElement('button')
      leisureButton.id = 'leisureButton'
      leisureButton.classList.add('button-element')
      leisureButton.appendChild(document.createTextNode('Leisure'))
      leisureButton.onclick = () => {
        if (tripData.leisure) {
          tripData.leisure = false
        } else {
          tripData.leisure = true
        }
        toggleColorButtonElement(leisureButton.id)
      }

      let kindOfTripButton = document.createElement('div')
      kindOfTripButton.appendChild(businessButton)
      kindOfTripButton.appendChild(leisureButton)
      kindOfTripButton.classList.add('kind-of-trip-buttons')

      parent.appendChild(currentPage)
      parent.appendChild(tripNameFieldset)
      parent.appendChild(calendar)

      // Displays the date picker into a specific container
      datepicker.container = document.getElementById('calendar')

      datepicker.show()

      parent.appendChild(kindOfTripButton)
      parent.appendChild(NextButton)
    }
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
