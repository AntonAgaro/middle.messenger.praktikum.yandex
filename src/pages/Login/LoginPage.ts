import Component from '../../classes/Component'
import type { Props } from '../../types/Props'
import loginTmpl from './login.tmpl'
import Input from '../../components/input/Input'
import Validator from '../../classes/Validator'
import InputGroup from '../../components/inputGroup/InputGroup'
import Button from '../../components/button/Button'
import RouterLink from '../../components/routerLink/RouterLink'
import { AuthApi } from '../../api/Auth.api'
import Store from '../../classes/Store'
import LoginController from './LoginController'

export default class LoginPage extends Component {
  constructor(props: Props) {
    let loginInputGroup: Component
    let passInputGroup: Component

    // Проверка, что нет текущего пользователя и надо редиректить
    if (!Store.getState().user) {
      AuthApi.getUser().then((res) => {
        const result = res as XMLHttpRequest
        if (result.status === 200) {
          Store.set('user', result.response)
        }
      })
    }

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
        click: async (e: Event) => {
          await LoginController.login(e, loginInput, loginInputGroup, passInput, passInputGroup, this)
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
