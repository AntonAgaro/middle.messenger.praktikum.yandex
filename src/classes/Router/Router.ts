import Component from '../Component'
import Route from './Route'
import { Props } from '../../types/Props'
import LoginPage from '../../pages/Login/LoginPage'
import SignUpPage from '../../pages/SignUp/SignUpPage'
import ChatsPage from '../../pages/Chats/ChatsPage'
import User from '../../pages/User/User'
import ErrorPage from '../../pages/ErrorPage/ErrorPage'
import { Routes } from '../../enums/Routes'
import Store from '../Store'
import { AuthApi } from '../../api/Auth.api'

export class Router {
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

  use(path: string, component: typeof Component, params: Props = {}): Router {
    const route = new Route(path, component, { rootQuery: this.rootSelector, ...params })
    this.routes.push(route)
    return this
  }

  async start() {
    window.onpopstate = (event) => {
      if (event.currentTarget) {
        this.onRoute((event.currentTarget as EventTarget & { location: Record<string, any> }).location.pathname)
      }
    }
    // Проверка, что нет текущего пользователя и надо редиректить
    if (!Store.getState().user) {
      try {
        const userRes = (await AuthApi.getUser()) as XMLHttpRequest
        if (userRes.status === 200) {
          Store.set('user', userRes.response)
        } else {
          this.history.pushState({}, '', Routes.Login)
          this.onRoute(Routes.Login)
          return
        }
      } catch (e) {
        console.log(e)
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
    if (!Store.getState().user && path !== Routes.SignUp) {
      this.history.pushState({}, '', Routes.Login)
      this.onRoute(Routes.Login)
      return
    }
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

const RouterClass = new Router('#app')
export const routes = [
  {
    path: Routes.Login,
    component: LoginPage,
  },
  {
    path: Routes.SignUp,
    component: SignUpPage,
  },
  {
    path: Routes.Chats,
    component: ChatsPage,
  },
  {
    path: Routes.User,
    component: User,
  },
  {
    path: Routes.Error404,
    component: ErrorPage,
    params: {
      title: '404',
      subtitle: 'Не туда попали',
    },
  },
  {
    path: Routes.Error500,
    component: ErrorPage,
    params: {
      title: '500',
      subtitle: 'Мы уже фиксим',
    },
  },
]
routes.forEach((route) => {
  RouterClass.use(route.path, <typeof Component>(<unknown>route.component), route.params ?? {})
})

export default RouterClass
