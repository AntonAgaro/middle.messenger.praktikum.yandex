import '@/scss/app.scss'
import HandleBars from 'handlebars'
import { Props } from './src/types/Props'
import Router from './src/classes/Router/Router'
import LoginPage from './src/pages/Login/LoginPage'
import SignUpPage from './src/pages/SignUp/SignUpPage'
import ChatsPage from './src/pages/Chats/ChatsPage'
import User from './src/pages/User/User'
import ErrorPage from './src/pages/ErrorPage/ErrorPage'

HandleBars.registerHelper('ifEquals', function (this: Props, a, b, options) {
  if (a === b) {
    return options.fn(this)
  }
  return options.inverse(this)
})
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app')
  if (!root) {
    return
  }

  const RouterClass = new Router('#app')
  const routes = [
    {
      path: '/',
      component: LoginPage,
    },
    {
      path: '/login',
      component: LoginPage,
    },
    {
      path: '/signup',
      component: SignUpPage,
    },
    {
      path: '/chats',
      component: ChatsPage,
    },
    {
      path: '/user',
      component: User,
    },
    {
      path: '/404',
      component: ErrorPage,
      params: {
        title: '404',
        subtitle: 'Не туда попали',
      },
    },
    {
      path: '/500',
      component: ErrorPage,
      params: {
        title: '500',
        subtitle: 'Мы уже фиксим',
      },
    },
  ]
  routes.forEach((route) => {
    RouterClass.use(route.path, route.component, route.params ?? {})
  })
  RouterClass.start()
})
