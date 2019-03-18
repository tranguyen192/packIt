const navItemBack = document.getElementById('nav-back')
const nav = document.getElementById('nav')

export function hideBackButton() {
  navItemBack.setAttribute('style', 'display: none;')
  nav.setAttribute('style', 'justify-content: flex-end;')
}
export function showBackButton() {
  navItemBack.removeAttribute('style')
  nav.removeAttribute('style')
}
