export default class Router {
  constructor(root, routes) {
    this.root = root
    this.routes = routes

    this.renderPage(window.location.pathname)

    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-router-link]')) {
        e.preventDefault()
        this.onNavigate(e.target.getAttribute('data-route'))
      }
    })
  }
  onNavigate(route) {
    window.history.pushState({}, route, window.location.origin + route)
    this.renderPage(route)
  }
  renderPage(route) {
    let routeObj = this.routes[route] ?? this.routes['/404']
    const payload = routeObj.payload
    this.root.innerHTML = payload ? routeObj.renderFunc(payload) : routeObj.renderFunc()
  }
}
