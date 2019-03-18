import WelcomePage from './pages/WelcomePage'
import MaleFemalePage from './pages/MaleFemalePage'
import CurrentTripsPage from './pages/CurrentTripsPage'
import CreateNewTripPage from './pages/CreateNewTripPage'
import SelectComponentsPage from './pages/SelectComponentsPage'
import ListsPage from './pages/ListsPage'
import NotFoundPage from './pages/NotFoundPage'
import LegalNoticePage from './pages/LegalNoticePage'

export default class Routing {
  constructor() {
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
