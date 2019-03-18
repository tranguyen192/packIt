import * as GlobalFunctions from './GlobalFunctions'
export default class MaleFemalePage {
  render(source, parent) {
    parent.innerHTML = ''

    // show navItemBack
    GlobalFunctions.showBackButton()

    let currentPage = document.createElement('h1')
    currentPage.appendChild(document.createTextNode('Please Select'))

    let maleButton = document.createElement('button')
    maleButton.appendChild(document.createTextNode('Male'))
    maleButton.classList.add('button-element')
    maleButton.onclick = () => {
      this.SaveGenderAndNavigate('male')
    }

    let femaleButton = document.createElement('button')
    femaleButton.appendChild(document.createTextNode('Female'))
    femaleButton.classList.add('button-element')
    femaleButton.onclick = () => {
      this.SaveGenderAndNavigate('female')
    }

    let selectGenderButtons = document.createElement('div')
    selectGenderButtons.appendChild(femaleButton)
    selectGenderButtons.appendChild(maleButton)
    selectGenderButtons.classList.add('select-gender__buttons')

    let skipButton = document.createElement('button')
    skipButton.appendChild(document.createTextNode('Skip'))
    skipButton.classList.add('button')
    skipButton.onclick = () => {
      this.SaveGenderAndNavigate('unisex')
    }

    let information = document.createElement('p')
    information.classList.add('p--center')
    information.appendChild(
      document.createTextNode(
        'This information will be used to customize your packing list for your gender.',
      ),
    )

    let selectGender = document.createElement('div')
    selectGender.appendChild(selectGenderButtons)
    selectGender.classList.add('select-gender')

    selectGender.appendChild(currentPage)
    selectGender.appendChild(selectGenderButtons)
    selectGender.appendChild(information)
    selectGender.appendChild(skipButton)
    parent.appendChild(selectGender)
  }

  SaveGenderAndNavigate(gender) {
    // Put the gender string to the storage
    localStorage.setItem('gender', gender)
    history.pushState({ page: 1 }, '', '/current-trips')
  }
}
