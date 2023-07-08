import '@/scss/app.scss'
import renderLoginPage from '@/pages/Login'
import renderSignUp from '@/pages/SignUp/index.js'
import renderErrorPage from '@/pages/ErrorPage'
import renderChatPage from '@/pages/Chats/index.js'
import renderUserPage from '@/pages/User/index.js'
import Router from '@/utils/Router.js'

const testUserData = {
  userLogo: '',
  userName: 'Ivan',
  userDetails: [
    { title: 'Почта', value: 'pochta@yandex.ru', inputName: 'email' },
    { title: 'Логин', value: 'ivanivanov', inputName: 'login' },
    { title: 'Имя', value: 'Ivan', inputName: 'first_name' },
    { title: 'Фамилия', value: 'Ivanov', inputName: 'second_name' },
    { title: 'Имя в чате', value: 'Ivan', inputName: 'display_name' },
    { title: 'Телефон', value: '+7 (909) 967 30 30', inputName: 'phone' },
  ],
}
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app')
  const routes = {
    '/': {
      renderFunc: renderLoginPage,
    },
    '/login': {
      renderFunc: renderLoginPage,
    },
    '/signup': {
      renderFunc: renderSignUp,
    },
    '/chats': {
      renderFunc: renderChatPage,
    },
    '/user': {
      renderFunc: renderUserPage,
      payload: testUserData,
    },
    '/test/404': {
      renderFunc: renderErrorPage,
      payload: 404,
    },
    '/test/500': {
      renderFunc: renderErrorPage,
      payload: 500,
    },
  }

  new Router(root, routes)
})
