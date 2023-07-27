import LoginPage from './LoginPage'
import { render } from '../../utils/functions'
import Button from '../../components/button/Button'
import RouterLink from '../../components/routerLink/RouterLink'
import Input from '../../components/input/Input'
import InputGroup from '../../components/inputGroup/InputGroup'
import Validator from '../../classes/Validator'
import Component from '../../classes/Component'

export default function renderLoginPage() {
  let loginInputGroup: Component
  let passInputGroup: Component

  const loginInput = new Input({
    className: 'input',
    attrs: {
      class: 'input',
      name: 'login',
      type: 'text',
      id: 'login',
      required: true,
    },
    events: {
      blur() {
        Validator.validate(loginInput, Validator.checkLogin, loginInputGroup)
      },
    },
  })

  const passInput = new Input({
    className: 'input',
    attrs: {
      class: 'input',
      name: 'password',
      type: 'password',
      id: 'password',
      required: true,
    },
    events: {
      blur: () => {
        Validator.validate(passInput, Validator.checkPass, passInputGroup)
      },
    },
  })
  loginInputGroup = new InputGroup({
    input: loginInput,
    label: 'Логин',
    name: 'login',
  })
  passInputGroup = new InputGroup({
    input: passInput,
    label: 'Пароль',
    name: 'password',
  })
  const authBtn = new Button({
    text: 'Авторизоваться',
    attrs: {
      class: 'button',
    },
    events: {
      click: (e: Event) => {
        e.preventDefault()
        const target = e.target as HTMLElement
        const form = target.closest('form')
        const isLoginInputValid = Validator.validate(loginInput, Validator.checkLogin, loginInputGroup)
        const isPassInputValid = Validator.validate(passInput, Validator.checkPass, passInputGroup)
        if (!form || !isLoginInputValid || !isPassInputValid) {
          return
        }
        const formData = new FormData(form)
        // @ts-ignore
        // eslint-disable-next-line no-restricted-syntax
        for (const [name, value] of formData) {
          console.log(`${name} = ${value}`)
        }
      },
    },
  })
  const toRegLink = new RouterLink({
    text: 'Нет аккаунта?',
    className: '',
    path: '/signup',
  })

  const LoginPageEl = new LoginPage({
    title: 'Вход:',
    loginInput: loginInputGroup,
    passInput: passInputGroup,
    authBtn,
    toRegLink,
    attrs: {
      class: 'main',
    },
  })
  render('#app', LoginPageEl)
}
