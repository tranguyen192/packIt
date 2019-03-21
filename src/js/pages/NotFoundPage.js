import * as GlobalFunctions from '../functions/GlobalFunctions'

export default class NotFound {
  static render(source, parent) {
    parent.innerHTML = ''

    GlobalFunctions.showBackButton()

    let linksText = document.createElement('p')
    linksText.appendChild(
      document.createTextNode('Here are some helpful links:'),
    )

    let notFoundText = document.createElement('h2')
    notFoundText.appendChild(
      document.createTextNode("We couldn't find the page you're looking for."),
    )

    let notFound = document.createElement('h1')
    notFound.appendChild(document.createTextNode('404 Page not found 🧐'))

    let welcomePageButton = document.createElement('button')
    welcomePageButton.appendChild(document.createTextNode('Home Page'))
    welcomePageButton.onclick = () => {
      history.pushState({ page: 0 }, '', '/')
    }

    let currentTripsPageButton = document.createElement('button')
    currentTripsPageButton.appendChild(document.createTextNode('Current Trips'))
    currentTripsPageButton.onclick = () => {
      history.pushState({ page: 0 }, '', '/current-trips')
    }

    let createNewTripPageButton = document.createElement('button')
    createNewTripPageButton.appendChild(
      document.createTextNode('Create a new Trip'),
    )
    createNewTripPageButton.onclick = () => {
      history.pushState({ page: 0 }, '', '/create-new-trip')
    }

    notFoundText.classList.add('center')

    parent.appendChild(notFound)
    parent.appendChild(notFoundText)
    parent.appendChild(linksText)
    parent.appendChild(welcomePageButton)
    parent.appendChild(currentTripsPageButton)
    parent.appendChild(createNewTripPageButton)
  }
}
