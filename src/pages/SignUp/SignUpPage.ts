import Component from '../../classes/Component'
import { Props } from '../../types/Props'
import signUpTmpl from './signup.tmpl'
import Input from '../../components/input/Input'
import Validator from '../../classes/Validator'
import InputGroup from '../../components/inputGroup/InputGroup'
import Button from '../../components/button/Button'
import RouterLink from '../../components/routerLink/RouterLink'
import { SignUpApi } from '../../api/SignUp.api'
import { AuthApi } from '../../api/Auth.api'
import Store from '../../classes/Store'
import RouterClass from '../../classes/Router/Router'

export default class SignUpPage extends Component {
  constructor(props: Props) {
    let emailInputGroup: Component
    let loginInputGroup: Component
    let nameInputGroup: Component
    let surnameInputGroup: Component
    let phoneInputGroup: Component
    let passInputGroup: Component
    let repeatPassInputGroup: Component

    const emailInput = new Input({
      attrs: {
        class: 'input',
        name: 'email',
        type: 'text',
        id: 'email',
        value: '',
        required: true,
      },
      events: {
        blur() {
          Validator.validate(emailInput, Validator.checkEmail, emailInputGroup)
        },
      },
    })
    emailInputGroup = new InputGroup({
      input: emailInput,
      name: 'email',
      label: 'Почта',
    })

    const loginInput = new Input({
      attrs: {
        class: 'input',
        name: 'login',
        type: 'text',
        id: 'login',
        value: '',
        required: true,
      },
      events: {
        blur() {
          Validator.validate(loginInput, Validator.checkLogin, loginInputGroup)
        },
      },
    })
    loginInputGroup = new InputGroup({
      input: loginInput,
      label: 'Логин',
      name: 'login',
    })

    const nameInput = new Input({
      attrs: {
        class: 'input',
        name: 'first_name',
        type: 'text',
        id: 'first_name',
        value: '',
        required: true,
      },
      events: {
        blur() {
          Validator.validate(nameInput, Validator.checkNames, nameInputGroup)
        },
      },
    })
    nameInputGroup = new InputGroup({
      input: nameInput,
      label: 'Имя',
      name: 'first_name',
    })

    const surnameInput = new Input({
      attrs: {
        class: 'input',
        name: 'second_name',
        type: 'text',
        id: 'second_name',
        value: '',
        required: true,
      },
      events: {
        blur() {
          Validator.validate(surnameInput, Validator.checkNames, surnameInputGroup)
        },
      },
    })
    surnameInputGroup = new InputGroup({
      input: surnameInput,
      label: 'Фамилия',
      name: 'second_name',
    })

    const phoneInput = new Input({
      attrs: {
        class: 'input',
        name: 'phone',
        type: 'text',
        id: 'phone',
        value: '',
        required: true,
      },
      events: {
        blur() {
          Validator.validate(phoneInput, Validator.checkPhone, phoneInputGroup)
        },
      },
    })
    phoneInputGroup = new InputGroup({
      input: phoneInput,
      label: 'Телефон',
      name: 'phone',
    })

    const passInput = new Input({
      attrs: {
        class: 'input',
        name: 'password',
        type: 'password',
        id: 'password',
        value: '',
        required: true,
      },
      events: {
        blur() {
          Validator.validate(passInput, Validator.checkPass, passInputGroup)
        },
      },
    })
    passInputGroup = new InputGroup({
      input: passInput,
      label: 'Пароль',
      name: 'password',
    })

    const repeatPassInput = new Input({
      attrs: {
        class: 'input',
        name: 'repeat_password',
        type: 'password',
        id: 'repeat_password',
        value: '',
        required: true,
      },
      events: {
        blur() {
          Validator.validate(repeatPassInput, Validator.checkPass, repeatPassInputGroup)
        },
      },
    })
    repeatPassInputGroup = new InputGroup({
      input: repeatPassInput,
      label: 'Пароль (еще раз)',
      name: 'repeat_password',
    })
    const authBtn = new Button({
      text: 'Зарегистрироваться',
      attrs: {
        class: 'button',
        type: 'submit',
      },
      events: {
        click: async (e: Event) => {
          e.preventDefault()
          const target = e.target as HTMLElement
          const form = target.closest('form')
          const validationArray = [
            Validator.validate(emailInput, Validator.checkEmail, emailInputGroup),
            Validator.validate(loginInput, Validator.checkLogin, loginInputGroup),
            Validator.validate(nameInput, Validator.checkNames, nameInputGroup),
            Validator.validate(surnameInput, Validator.checkNames, surnameInputGroup),
            Validator.validate(phoneInput, Validator.checkPhone, phoneInputGroup),
            Validator.validate(passInput, Validator.checkPass, passInputGroup),
            Validator.validate(repeatPassInput, Validator.checkPass, repeatPassInputGroup),
          ]

          const isValid = validationArray.every((v) => v)
          if (!form || !isValid) {
            return
          }
          const formData = new FormData(form)
          const data = Object.fromEntries(formData)
          const signUpResponse = (await SignUpApi.create(data)) as XMLHttpRequest
          if (signUpResponse.status !== 200) {
            throw new Error(signUpResponse.response.reason)
          }
          const userRes = (await AuthApi.getUser()) as XMLHttpRequest
          if (userRes.status === 200) {
            Store.set('user', userRes.response)
            RouterClass.go('/chats')
          }
          console.log(userRes.response)
        },
      },
    })
    const toLoginLink = new RouterLink({
      text: 'Войти',
      className: '',
      path: '/login',
    })

    super('main', {
      ...props,
      title: 'Регистрация',
      emailInput: emailInputGroup,
      loginInput: loginInputGroup,
      nameInput: nameInputGroup,
      surnameInput: surnameInputGroup,
      phoneInput: phoneInputGroup,
      passInput: passInputGroup,
      repeatPassInput: repeatPassInputGroup,
      authBtn,
      toLoginLink,
      attrs: {
        class: 'main',
      },
    })
  }

  render() {
    return this.compile(signUpTmpl, this.props)
  }
}
