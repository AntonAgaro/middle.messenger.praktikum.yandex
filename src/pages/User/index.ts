import UserDetails from '../../components/user/UserDetails'
import './user.scss'
import Button from '../../components/button/Button'
import User from './User'
import RouterLink from '../../components/routerLink/RouterLink'
import { render } from '../../utils/functions'
import Input from '../../components/input/Input'
import InputGroup from '../../components/inputGroup/InputGroup'

export default function renderUserPage() {
  const isEditing = false
  const inputClassName = isEditing ? '' : 'disable'
  const emailInput = new InputGroup({
    input: new Input({
      attrs: {
        class: 'input',
        id: 'email',
        name: 'email',
        type: 'text',
        value: 'pochta@yandex.ru',
      },
    }),
    noLabel: true,
    className: inputClassName,
  })
  const loginInput = new InputGroup({
    input: new Input({
      attrs: {
        class: 'input',
        id: 'login',
        name: 'login',
        type: 'text',
        value: 'ivanivanov',
      },
    }),
    noLabel: true,
    className: inputClassName,
  })
  const nameInput = new InputGroup({
    input: new Input({
      attrs: {
        class: 'input',
        id: 'first_name',
        name: 'first_name',
        type: 'text',
        value: 'Ivan',
      },
    }),
    noLabel: true,
    className: inputClassName,
  })
  const surnameInput = new InputGroup({
    input: new Input({
      attrs: {
        class: 'input',
        id: 'second_name',
        name: 'second_name',
        type: 'text',
        value: 'Ivanov',
      },
    }),
    noLabel: true,
    className: inputClassName,
  })
  const displayNameInput = new InputGroup({
    input: new Input({
      attrs: {
        class: 'input',
        id: 'display_name',
        name: 'display_name',
        type: 'text',
        value: 'Ivan',
      },
    }),
    noLabel: true,
    className: inputClassName,
  })
  const phoneInput = new InputGroup({
    input: new Input({
      attrs: {
        class: 'input',
        id: 'name',
        name: 'phone',
        type: 'text',
        value: 'Ivan',
      },
    }),
    noLabel: true,
    className: inputClassName,
  })

  const userDetails = new UserDetails({
    emailInput,
    loginInput,
    nameInput,
    surnameInput,
    displayNameInput,
    phoneInput,
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
  })

  const toChatsLink = new RouterLink({
    text: 'К чатам',
    path: '/chats',
    className: 'user__back-link',
  })

  const UserPage = new User({
    toChatsLink,
    userName: 'Ivan',
    userDetails,
    changeDataBtn,
    changePassBtn,
    logoutBtn,
    saveDataBtn,
    attrs: {
      class: 'main user',
    },
  })

  render('#app', UserPage)
}
