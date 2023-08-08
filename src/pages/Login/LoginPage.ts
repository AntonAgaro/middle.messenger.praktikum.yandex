import Component from '../../classes/Component'
import type { Props } from '../../types/Props'
import loginTmpl from './login.tmpl'
import Input from '../../components/input/Input'
import Validator from '../../classes/Validator'
import InputGroup from '../../components/inputGroup/InputGroup'
import Button from '../../components/button/Button'
import RouterLink from '../../components/routerLink/RouterLink'

export default class LoginPage extends Component {
  constructor(props: Props) {
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
        type: 'submit',
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
    super('main', {
      ...props,
      title: 'Вход:',
      loginInput: loginInputGroup,
      passInput: passInputGroup,
      authBtn,
      toRegLink,
      attrs: {
        class: 'main',
      },
    })
  }

  render() {
    return this.compile(loginTmpl, this.props)
  }
}
