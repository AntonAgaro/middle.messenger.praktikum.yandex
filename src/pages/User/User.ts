import './user.scss'
import Component from '../../classes/Component'
import type { Props } from '../../types/Props'
import userTmpl from './user.tmpl'
import Input from '../../components/input/Input'
import Validator from '../../classes/Validator'
import InputGroup from '../../components/inputGroup/InputGroup'
import UserDetails from '../../components/user/UserDetails'
import Button from '../../components/button/Button'
import RouterLink from '../../components/routerLink/RouterLink'
import Store from '../../classes/Store'
import { StoreEvent } from '../../enums/StoreEvents'

export default class User extends Component {
  constructor(props: Props) {
    let user = null
    Store.on(StoreEvent.Updated, () => {
      user = Store.getState().user
    })
    const isEditing = false
    const inputClassName = isEditing ? '' : 'disable'
    let emailInputGroup: Component
    let loginInputGroup: Component
    let nameInputGroup: Component
    let surnameInputGroup: Component
    let displayNameInputGroup: Component
    let phoneInputGroup: Component
    const userPageInputs = {
      emailInput: new Input({
        attrs: {
          class: 'input',
          id: 'email',
          name: 'email',
          type: 'text',
          value: 'pochta@yandex.ru',
          disabled: true,
        },
        events: {
          blur() {
            Validator.validate(userPageInputs.emailInput, Validator.checkEmail, emailInputGroup)
          },
        },
      }),
      loginInput: new Input({
        attrs: {
          class: 'input',
          id: 'login',
          name: 'login',
          type: 'text',
          value: 'ivanivanov',
          disabled: true,
        },
        events: {
          blur() {
            Validator.validate(userPageInputs.loginInput, Validator.checkLogin, loginInputGroup)
          },
        },
      }),
      nameInput: new Input({
        attrs: {
          class: 'input',
          id: 'first_name',
          name: 'first_name',
          type: 'text',
          value: 'Ivan',
          disabled: true,
        },
        events: {
          blur() {
            Validator.validate(userPageInputs.nameInput, Validator.checkNames, nameInputGroup)
          },
        },
      }),
      surnameInput: new Input({
        attrs: {
          class: 'input',
          id: 'second_name',
          name: 'second_name',
          type: 'text',
          value: 'Ivanov',
          disabled: true,
        },
        events: {
          blur() {
            Validator.validate(userPageInputs.surnameInput, Validator.checkNames, surnameInputGroup)
          },
        },
      }),
      displayNameInput: new Input({
        attrs: {
          class: 'input',
          id: 'display_name',
          name: 'display_name',
          type: 'text',
          value: 'Ivan',
          disabled: true,
        },
        events: {
          blur() {
            Validator.validate(userPageInputs.displayNameInput, Validator.checkLogin, displayNameInputGroup)
          },
        },
      }),
      phoneInput: new Input({
        attrs: {
          class: 'input',
          id: 'name',
          name: 'phone',
          type: 'text',
          value: '+79033333333',
          disabled: true,
        },
        events: {
          blur() {
            Validator.validate(userPageInputs.phoneInput, Validator.checkPhone, phoneInputGroup)
          },
        },
      }),
    }
    emailInputGroup = new InputGroup({
      input: userPageInputs.emailInput,
      noLabel: true,
      className: inputClassName,
    })
    loginInputGroup = new InputGroup({
      input: userPageInputs.loginInput,
      noLabel: true,
      className: inputClassName,
    })
    nameInputGroup = new InputGroup({
      input: userPageInputs.nameInput,
      noLabel: true,
      className: inputClassName,
    })
    surnameInputGroup = new InputGroup({
      input: userPageInputs.surnameInput,
      noLabel: true,
      className: inputClassName,
    })
    displayNameInputGroup = new InputGroup({
      input: userPageInputs.displayNameInput,
      noLabel: true,
      className: inputClassName,
    })
    phoneInputGroup = new InputGroup({
      input: userPageInputs.phoneInput,
      noLabel: true,
      className: inputClassName,
    })

    const userDetails = new UserDetails({
      emailInput: emailInputGroup,
      loginInput: loginInputGroup,
      nameInput: nameInputGroup,
      surnameInput: surnameInputGroup,
      displayNameInput: displayNameInputGroup,
      phoneInput: phoneInputGroup,
      attrs: {
        class: 'user__details',
      },
    })

    const changeDataBtn = new Button({
      text: 'Изменить данные',
      attrs: {
        class: 'button no-bg',
        type: 'button',
      },
      events: {
        click: () => {
          Object.values(userPageInputs).forEach((input) => {
            input.getContent()?.removeAttribute('disabled')
          })
          this.setProps({
            isEditing: 'on',
          })
        },
      },
    })

    const changePassBtn = new Button({
      text: 'Изменить пароль',
      attrs: {
        class: 'button no-bg',
        type: 'button',
      },
    })

    const logoutBtn = new Button({
      text: 'Выйти',
      attrs: {
        class: 'button no-bg red',
        type: 'button',
      },
    })

    const saveDataBtn = new Button({
      text: 'Сохранить',
      attrs: {
        class: 'button align-center',
        type: 'submit',
      },
      events: {
        click: (e: Event) => {
          e.preventDefault()
          const target = e.target as HTMLElement
          const form = target.closest('form')
          const validationArray = [
            Validator.validate(userPageInputs.emailInput, Validator.checkEmail, emailInputGroup),
            Validator.validate(userPageInputs.loginInput, Validator.checkLogin, loginInputGroup),
            Validator.validate(userPageInputs.nameInput, Validator.checkNames, nameInputGroup),
            Validator.validate(userPageInputs.surnameInput, Validator.checkNames, surnameInputGroup),
            Validator.validate(userPageInputs.phoneInput, Validator.checkPhone, phoneInputGroup),
            Validator.validate(userPageInputs.displayNameInput, Validator.checkLogin, displayNameInputGroup),
          ]

          const isValid = validationArray.every((v) => v)
          if (!form || !isValid) {
            return
          }
          const formData = new FormData(form)

          for (const [name, value] of formData) {
            console.log(`${name} = ${value}`)
          }

          this.setProps({
            isEditing: 'off',
          })
          Object.values(userPageInputs).forEach((input) => {
            input.getContent()?.setAttribute('disabled', 'true')
          })
        },
      },
    })

    const toChatsLink = new RouterLink({
      text: 'К чатам',
      path: '/chats',
      className: 'user__back-link',
    })

    super('main', {
      ...props,
      toChatsLink,
      userName: 'Ivan',
      userDetails,
      changeDataBtn,
      changePassBtn,
      logoutBtn,
      saveDataBtn,
      isEditing: 'off',
      attrs: {
        class: 'main user',
      },
    })
    console.log(Store.getState())
  }

  render() {
    return this.compile(userTmpl, this.props)
  }
}
