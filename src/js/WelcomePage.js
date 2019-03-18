import packitlogo from '../images/packitlogo.svg'

import * as GlobalFunctions from './GlobalFunctions'

export default class WelcomePage {
  render(source, parent) {
    parent.innerHTML = ''

    // hide navItemBack
    GlobalFunctions.hideBackButton()

    let getStartedButton = document.createElement('button')
    getStartedButton.appendChild(document.createTextNode('Get Started'))
    getStartedButton.onclick = () => {
      history.pushState({ page: 1 }, '', '/current-trips')
    }

    let logo = document.createElement('img')
    logo.setAttribute('src', packitlogo)
    logo.setAttribute('alt', 'PackIt Logo')
    logo.classList.add('packit-logo')

    let welcometext = document.createElement('p')
    welcometext.classList.add('p--center')
    welcometext.appendChild(
      document.createTextNode('Save time before going on an adventure.'),
    )
    let linebreak = document.createElement('br')
    welcometext.appendChild(linebreak)
    welcometext.appendChild(
      document.createTextNode(
        'PackIt will help you to pack your suitcase for each trip.',
      ),
    )

    parent.appendChild(logo)
    parent.appendChild(welcometext)
    parent.appendChild(getStartedButton)
  }
}
