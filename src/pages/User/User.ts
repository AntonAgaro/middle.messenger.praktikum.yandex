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
import { AuthApi } from '../../api/Auth.api'
import Router from '../../classes/Router/Router'
import { Routes } from '../../enums/Routes'
import { TUser } from '../../types/TUser'
import { UserApi } from '../../api/User.api'

export default class User extends Component {
  constructor(props: Props) {
    let user: TUser
    if (!Store.getState().user) {
      AuthApi.getUser().then((res) => {
        const result = res as XMLHttpRequest
        if (result.status === 200) {
          Store.set('user', result.response)
        }
      })
    }
    user = Store.getState().user as TUser

    const isEditing = false
    const inputClassName = isEditing ? '' : 'disable'
    let emailInputGroup: Component
    let loginInputGroup: Component
    let nameInputGroup: Component
    let surnameInputGroup: Component
    let displayNameInputGroup: Component
    let phoneInputGroup: Component
    const userPageInputs: Record<string, Component> = {
      emailInput: new Input({
        attrs: {
          class: 'input',
          id: 'email',
          name: 'email',
          type: 'text',
          value: user.email,
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
          value: user.login,
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
          value: user.first_name,
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
          value: user.second_name,
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
          value: user.display_name ?? '',
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
          value: user.phone,
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

    const logoutBtn = new Button({
      text: 'Выйти',
      attrs: {
        class: 'button no-bg red',
        type: 'button',
      },
      events: {
        click: async () => {
          const logoutRes = (await AuthApi.logout()) as XMLHttpRequest
          if (logoutRes.status === 200) {
            Store.set('user', null)
            Router.go(Routes.Login)
          }
        },
      },
    })

    const saveDataBtn = new Button({
      text: 'Сохранить',
      attrs: {
        class: 'button align-center',
        type: 'submit',
      },
      events: {
        click: async (e: Event) => {
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
          const data = Object.fromEntries(formData)
          console.log(data)
          const changeUserDataRes = (await UserApi.update(data)) as XMLHttpRequest
          console.log(changeUserDataRes)
          if (changeUserDataRes.status === 200) {
            Store.set('user', changeUserDataRes.response)
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
      userName: user.display_name ?? '',
      userDetails,
      changeDataBtn,
      logoutBtn,
      saveDataBtn,
      isEditing: 'off',
      user,
      attrs: {
        class: 'main user',
      },
    })

    Store.on(StoreEvent.Updated, () => {
      user = Store.getState().user as TUser
      if (!user) {
        return
      }
      Object.keys(userPageInputs).forEach((inputName) => {
        this.setProps({
          user,
          userName: user.display_name,
        })
        console.log(inputName)
      })
    })
  }

  render() {
    return this.compile(userTmpl, this.props)
  }
}
