import * as GlobalFunctions from '../functions/GlobalFunctions'

export default class CurrentTripsPage {
  render(source, parent) {
    parent.innerHTML = ''

    // Check if all needed variables are set
    if (localStorage.getItem('gender') === null) {
      history.pushState({}, '', '/male-female')
    } else {
      // hide navItemBack
      GlobalFunctions.hideBackButton()

      let currentPage = document.createElement('h1')
      currentPage.appendChild(document.createTextNode('Current Trips'))
      parent.appendChild(currentPage)

      // Check if keyManager exists on the localStorage
      if (localStorage.getItem('keyManager') !== null) {
        let keyManager = JSON.parse(localStorage.getItem('keyManager'))
        let index = 1
        // Go through all trips in the keyManager
        for (let i = 0; i < keyManager.length; i++) {
          let tripKey = keyManager[i]
          // Check if trip data exist
          if (localStorage.getItem('data_' + tripKey) !== null) {
            // Check if trip lists exist
            if (localStorage.getItem('lists_' + tripKey) !== null) {
              let mediaBlock = this.ShowTrip(
                JSON.parse(localStorage.getItem('data_' + tripKey), tripKey),
                tripKey,
                index++,
                index++,
                keyManager,
              )
              parent.append(mediaBlock)
            } else {
              // remove data from local storage
              localStorage.removeItem('data_' + tripKey)
              // remove Key from keyManager
              let index = keyManager.indexOf(tripKey)
              if (index > -1) {
                keyManager.splice(index, 1)
              }
              // Put the current state of the keyManager on the local storage
              localStorage.setItem('keyManager', JSON.stringify(keyManager))
            }
          } else {
            // remove lists from local storage
            if (localStorage.getItem('lists_' + tripKey) !== null) {
              localStorage.removeItem('lists_' + tripKey)
            }
            let index = keyManager.indexOf(tripKey)
            if (index > -1) {
              keyManager.splice(index, 1)
            }
            // Put the current state of the keyManager on the local storage
            localStorage.setItem('keyManager', JSON.stringify(keyManager))
          }
        }
      }

      let CreateNewTripButton = document.createElement('button')
      CreateNewTripButton.classList.add('button')
      CreateNewTripButton.appendChild(
        document.createTextNode('Create a new Trip'),
      )
      CreateNewTripButton.onclick = () => {
        history.pushState({ page: 1 }, '', '/create-new-trip')
      }

      parent.appendChild(CreateNewTripButton)
    }
  }
  ShowTrip(tripData, tripKey, index1, index2, keyManager) {
    let mediaBlock = document.createElement('div')
    mediaBlock.classList.add('media-block')

    let mediaBlockContent = document.createElement('div')
    mediaBlockContent.classList.add('media-block__content')

    let headline = document.createElement('h2')
    headline.appendChild(document.createTextNode(tripData.name))
    headline.classList.add('media-block__content__headline')

    let startDate = document.createElement('p')
    startDate.appendChild(
      document.createTextNode('from: ' + this.FormatDate(tripData.dates[0])),
    )
    startDate.classList.add('media-block__content__date')

    let endDate = document.createElement('p')
    endDate.appendChild(
      document.createTextNode('to: ' + this.FormatDate(tripData.dates[1])),
    )
    endDate.classList.add('media-block__content__date')

    let deleteContainer = document.createElement('div')
    let deleteIcon = document.createElement('i')
    deleteIcon.classList.add('fas', 'fa-trash-alt', 'media-block__delete-icon')
    deleteContainer.appendChild(deleteIcon)

    mediaBlockContent.appendChild(headline)
    mediaBlockContent.appendChild(startDate)
    mediaBlockContent.appendChild(endDate)

    mediaBlockContent.onclick = () => {
      this.ShowLists(tripKey)
    }

    mediaBlockContent.onkeypress = e => {
      if (e.keyCode === 13) {
        this.ShowLists(tripKey)
      }
    }

    mediaBlockContent.tabIndex = index1

    mediaBlock.id = tripKey
    deleteIcon.onclick = () => {
      this.DeleteTrip(tripKey, keyManager, mediaBlock)
    }

    deleteIcon.onkeypress = e => {
      if (e.keyCode === 13) {
        this.DeleteTrip(tripKey, keyManager, mediaBlock)
      }
    }

    deleteIcon.tabIndex = index2

    mediaBlock.append(mediaBlockContent)
    mediaBlock.append(deleteContainer)
    return mediaBlock
  }

  DeleteTrip(tripKey, keyManager, mediaBlock) {
    console.log(keyManager)
    localStorage.removeItem('checkedItems_' + tripKey)
    localStorage.removeItem('data_' + tripKey)
    localStorage.removeItem('lists_' + tripKey)
    mediaBlock.setAttribute('style', 'display: none;')
    let index = keyManager.indexOf(tripKey)
    console.log(tripKey)
    if (index > -1) {
      keyManager.splice(index, 1)
    }
    // Put the current state of the keyManager on the local storage
    localStorage.setItem('keyManager', JSON.stringify(keyManager))
  }

  ShowLists(tripKey) {
    localStorage.setItem('currentTrip', tripKey)
    history.pushState({ page: 1 }, '', '/lists')
  }

  FormatDate(date) {
    let month

    switch (date.month) {
      case 0:
        month = 'January'
        break
      case 1:
        month = 'February'
        break
      case 2:
        month = 'March'
        break
      case 3:
        month = 'April'
        break
      case 4:
        month = 'May'
        break
      case 5:
        month = 'June'
        break
      case 6:
        month = 'July'
        break
      case 7:
        month = 'August'
        break
      case 8:
        month = 'September'
        break
      case 9:
        month = 'October'
        break
      case 10:
        month = 'November'
        break
      case 11:
        month = 'December'
        break
    }

    return month + ' ' + date.day + ', ' + date.year
  }
}
