import Input from '../../components/input/Input'
import UserDetails from '../../components/user/UserDetails'
import './user.scss'
import Button from '../../components/button/Button'
import User from './User'
import RouterLink from '../../components/routerLink/RouterLink'
import { render } from '../../utils/functions'

export default function renderUserPage() {
  const isEditing = false
  const inputClassName = isEditing ? '' : 'disable'
  const emailInput = new Input({
    name: 'email',
    type: 'text',
    noLabel: true,
    className: inputClassName,
    value: 'pochta@yandex.ru',
  })
  const loginInput = new Input({
    name: 'login',
    type: 'text',
    noLabel: true,
    className: inputClassName,
    value: 'ivanivanov',
  })
  const nameInput = new Input({
    name: 'first_name',
    type: 'text',
    noLabel: true,
    className: inputClassName,
    value: 'Ivan',
  })
  const surnameInput = new Input({
    name: 'second_name',
    type: 'text',
    noLabel: true,
    className: inputClassName,
    value: 'Ivanov',
  })
  const displayNameInput = new Input({
    name: 'display_name',
    type: 'text',
    noLabel: true,
    className: inputClassName,
    value: 'Ivan',
  })
  const phoneInput = new Input({
    name: 'phone',
    type: 'text',
    noLabel: true,
    className: inputClassName,
    value: 'Ivan',
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
    },
  })

  const changePassBtn = new Button({
    text: 'Изменить пароль',
    attrs: {
      class: 'button no-bg',
    },
  })

  const logoutBtn = new Button({
    text: 'Выйти',
    attrs: {
      class: 'button no-bg red',
    },
  })

  const saveDataBtn = new Button({
    text: 'Сохранить',
    attrs: {
      class: 'button align-center',
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
