import { Routes } from '../types/Router'

export default class Router {
  private root: HTMLElement

  private readonly routes: Routes

  constructor(root: HTMLElement, routes: Routes) {
    this.root = root
    this.routes = routes

    this.renderPage(window.location.pathname)

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.matches('[data-router-link]')) {
        e.preventDefault()
        this.onNavigate(target.getAttribute('data-route') as string)
      }
    })
  }

  onNavigate(route: string): void {
    window.history.pushState({}, route, window.location.origin + route)
    this.renderPage(route)
  }

  renderPage(route: string): void {
    const routeObj = this.routes[route] ?? this.routes['/404']
    const { payload } = routeObj
    this.root.innerHTML = payload ? routeObj.renderFunc(payload) : routeObj.renderFunc()
  }
}
