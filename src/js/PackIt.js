import WelcomePage from './WelcomePage'
import MaleFemalePage from './MaleFemalePage'
import CurrentTripsPage from './CurrentTripsPage'
import CreateNewTripPage from './CreateNewTripPage'
import SelectComponentsPage from './SelectComponentsPage'
import ListsPage from './ListsPage'
import NotFoundPage from './NotFoundPage'
import LegalNoticePage from './LegalNoticePage'

export default class PackIt {
  constructor() {
    this.test = 'PackIt'
    this.pages = {
      '/': new WelcomePage(),
      '/male-female': new MaleFemalePage(),
      '/current-trips': new CurrentTripsPage(),
      '/create-new-trip': new CreateNewTripPage(),
      '/select-components': new SelectComponentsPage(),
      '/lists': new ListsPage(),
      '/legal-notice': new LegalNoticePage(),
    }
  }

  render(path, parent) {
    if (!this.pages[path]) {
      NotFoundPage.render(this, parent)
    } else {
      this.pages[path].render(this, parent)
    }
  }
}
