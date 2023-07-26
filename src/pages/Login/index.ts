import LoginPage from './LoginPage'
import { render } from '../../utils/functions'
import Button from '../../components/button/Button'
import RouterLink from '../../components/routerLink/RouterLink'
import Input from '../../components/input/Input'
import InputGroup from '../../components/inputGroup/InputGroup'

export default function renderLoginPage() {
  const loginInput = new InputGroup({
    input: new Input({
      className: 'input',
      attrs: {
        class: 'input',
        name: 'login',
        type: 'text',
        id: 'login',
        required: true,
      },
      events: {
        blur: () => {
          console.log('dasdad')
        },
        click: () => {
          console.log('fdsfsdf')
        },
      },
    }),
    label: 'Логин',
    name: 'login',
  })
  const passInput = new InputGroup({
    input: new Input({
      className: 'input',
      attrs: {
        class: 'input',
        name: 'password',
        type: 'password',
        id: 'password',
        required: true,
      },
    }),
    label: 'Пароль',
    name: 'password',
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
