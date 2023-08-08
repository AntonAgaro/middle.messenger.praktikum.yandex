import Component from '../Component'
import Route from './Route'

export default class Router {
  private static instance: Router

  private routes: Route[] = []

  private history = window.history

  private currentRoute: Route | null = null

  private readonly rootSelector: string = ''

  constructor(root: string) {
    if (Router.instance) {
      return Router.instance
    }
    this.rootSelector = root
    Router.instance = this
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.matches('[data-router-link]')) {
        e.preventDefault()
        this.go(target.getAttribute('data-route') as string)
      }
    })
  }

  use(path: string, components: Component): Router {
    const route = new Route(path, components, { rootQuery: this.rootSelector })
    this.routes.push(route)
    return this
  }

  start(): void {
    window.onpopstate = (event) => {
      if (event.currentTarget) {
        this.onRoute(event.currentTarget.location.pathname)
      }
    }

    this.onRoute(window.location.pathname)
  }

  private onRoute(path: string): void {
    const route = this.getRoute(path)
    if (!route) {
      return
    }
    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave()
    }
    this.currentRoute = route
    // route.render(route, path)
    route.render()
  }

  go(path: string): void {
    this.history.pushState({}, '', path)
    this.onRoute(path)
  }

  private getRoute(path: string) {
    return this.routes.find((route) => route.match(path))
  }

  back(): void {
    this.history.back()
    // this.history.go(-1)
  }

  forward(): void {
    this.history.forward()
    // this.history.go(1)
  }
}
