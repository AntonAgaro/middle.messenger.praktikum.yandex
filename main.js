import '@/scss/app.scss'
import Handlebars from 'handlebars/runtime'
import renderLoginPage from '@/pages/Login'
import renderSignUp from '@/pages/SignUp/index.js'
import errorPageTmpl from '@/pages/ErrorPage/error.hbs'
import routerLink from '@components/routerLink/routerLink.hbs'

Handlebars.registerPartial('routerLink', routerLink)

import { render } from '@/utils/functions.js'
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app')

  // root.innerHTML = renderLoginPage()
  // root.innerHTML = renderSignUp()
  root.innerHTML = render(errorPageTmpl, { title: 404, subtitle: 'Не туда попали' })
})
