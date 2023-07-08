import '@/scss/app.scss'
import Handlebars from 'handlebars/runtime'
import renderLoginPage from '@/pages/Login'
import renderSignUp from '@/pages/SignUp/index.js'
import errorPageTmpl from '@/pages/ErrorPage/error.hbs'
import routerLink from '@components/routerLink/routerLink.hbs'

import { render } from '@/utils/functions.js'
import renderErrorPage from '@/pages/ErrorPage'
import renderChatPage from '@/pages/Chats/index.js'
import renderUserPage from '@/pages/User/index.js'
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app')

  // root.innerHTML = renderLoginPage()
  // root.innerHTML = renderSignUp()
  // root.innerHTML = renderErrorPage(500)
  // root.innerHTML = renderChatPage()
  const userData = {
    userLogo: '',
    userName: 'Anton',
    userDetails: [
      { title: 'Почта', value: 'pochta@yandex.ru', inputName: 'email' },
      { title: 'Логин', value: 'ivanivanov', inputName: 'login' },
      { title: 'Имя', value: 'Ivan', inputName: 'first_name' },
      { title: 'Фамилия', value: 'Ivanov', inputName: 'second_name' },
      { title: 'Имя в чате', value: 'Ivan', inputName: 'display_name' },
      { title: 'Телефон', value: '+7 (909) 967 30 30', inputName: 'phone' },
    ],
  }
  root.innerHTML = renderUserPage(userData)
})
