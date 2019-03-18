import './sass/style.scss'
import Routing from './js/Routing'

const routing = new Routing()

const renderPage = path => {
  // ========= NAV ===========

  const navItemBack = document.getElementById('nav-back')
  navItemBack.onclick = e => {
    e.preventDefault()
    history.back()
  }

  const navItemLogo = document.getElementById('nav-logo')
  navItemLogo.onclick = e => {
    e.preventDefault()
    history.pushState({ page: 1 }, '', '/current-trips')
  }

  const navItemLegalNotice = document.getElementById('legal-notice')
  navItemLegalNotice.onclick = e => {
    e.preventDefault()
    history.pushState({ page: 1 }, '', '/legal-notice')
  }

  const navItemSelectGender = document.getElementById('select-gender')
  navItemSelectGender.onclick = e => {
    e.preventDefault()
    history.pushState({ page: 1 }, '', '/male-female')
  }

  // ========= END ===========

  const root = document.getElementById('root')
  routing.render(path, root)
}

window.addEventListener(
  'popstate',
  function(event) {
    renderPage(window.location.pathname)
  },
  false,
)

// Hack to create onpushstate listener for history changes
// DO NOT CHANGE THIS!
;(function(history) {
  var pushState = history.pushState
  history.pushState = function(state, title, path) {
    const returner = pushState.apply(history, arguments)
    if (typeof history.onpushstate === 'function') {
      history.onpushstate({ state, title, path })
    }
    return returner
  }
})(window.history)
// DO NOT CHANGE THIS!

history.onpushstate = props => {
  renderPage(props.path)
}

renderPage(window.location.pathname)
