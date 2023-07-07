import '@/scss/app.scss'
import Handlebars from 'handlebars/runtime'
import renderLoginPage from '@/pages/Login'
import renderSignUp from '@/pages/SignUp/index.js'
import errorPageTmpl from '@/pages/ErrorPage/error.hbs'
import routerLink from '@components/routerLink/routerLink.hbs'

import { render } from '@/utils/functions.js'
import renderErrorPage from '@/pages/ErrorPage'
import renderChatPage from '@/pages/Chats/index.js'
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app')

  // root.innerHTML = renderLoginPage()
  // root.innerHTML = renderSignUp()
  // root.innerHTML = renderErrorPage(500)
  root.innerHTML = renderChatPage()
})
