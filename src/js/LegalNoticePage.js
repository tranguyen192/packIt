import * as GlobalFunctions from './GlobalFunctions'
export default class LegalNoticePage {
  render(source, parent) {
    parent.innerHTML = ''

    GlobalFunctions.showBackButton()

    let headline1 = document.createElement('h1')
    headline1.appendChild(document.createTextNode('Legal Notice'))

    let headlineMmp = document.createElement('h2')
    headlineMmp.appendChild(document.createTextNode('Multi Media Project 2a'))

    let textCreated = document.createElement('p')
    textCreated.classList.add('p--center')
    textCreated.appendChild(
      document.createTextNode(
        'This website was created as multi media project 2a, at Salzburg University of Applied Science (MultiMediaTechnology).',
      ),
    )

    let headlineGraphic = document.createElement('h2')
    headlineGraphic.appendChild(
      document.createTextNode('Graphic Design and Technical Implementation'),
    )

    let textTuE = document.createElement('p')
    textTuE.classList.add('p--center')
    textTuE.appendChild(
      document.createTextNode('Tra Nguyen & Eva-Maria Strumegger'),
    )

    headlineMmp.classList.add('center')
    headlineGraphic.classList.add('center')

    parent.appendChild(headline1)
    parent.appendChild(headlineMmp)
    parent.appendChild(textCreated)
    parent.appendChild(headlineGraphic)
    parent.appendChild(textTuE)
  }
}
