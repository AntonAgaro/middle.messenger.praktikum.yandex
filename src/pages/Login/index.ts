import LoginPage from './LoginPage'
import { render } from '../../utils/functions'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import RouterLink from '../../components/routerLink/RouterLink'

export default function renderLoginPage() {
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
    title: 'Вход:',
    loginInput,
    passInput,
    authBtn,
    toRegLink,
    attrs: {
      class: 'main',
    },
  })
  render('#app', LoginPageEl)
}
