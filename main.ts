import '@/scss/app.scss'
import Router from './src/utils/Router'
import routes from './src/utils/routes'
import LoginPage from './src/pages/Login/LoginPage'
import { render } from './src/utils/functions'
import Form from './src/components/form/Form'
import Input from './src/components/input/Input'
import Button from './src/components/button/Button'
import RouterLink from './src/components/routerLink/RouterLink'

document.addEventListener('DOMContentLoaded', () => {
  // const root = document.getElementById('app')
  // if (!root) {
  //   return
  // }
  // new Router(root, routes)
  const loginInput = new Input({
    label: 'Логин',
    name: 'login',
    type: 'text',
    value: '',
    className: 'input',
    id: 'login',
  })
  const passInput = new Input({
    label: 'Пароль',
    name: 'password',
    type: 'password',
    value: '',
    className: 'input',
    id: 'password',
  })
  const authBtn = new Button({
    text: 'Авторизоваться',
    attrs: {
      class: 'button',
    },
  })
  const toRegLink = new RouterLink({
    text: 'Нет аккаунта?',
    className: '',
    path: '/signup',
  })

  const LoginPageEl = new LoginPage({
    loginInput,
    passInput,
    authBtn,
    toRegLink,
    attrs: {
      class: 'main',
    },
  })
  render('#app', LoginPageEl)
})
