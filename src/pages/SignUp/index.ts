import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import RouterLink from '../../components/routerLink/RouterLink'
import SignUpPage from './SignUpPage'
import { render } from '../../utils/functions'

export default function renderSignUp() {
  const emailInput = new Input({
    className: '',
    label: 'Почта',
    name: 'email',
    type: 'text',
    id: 'email',
    value: '',
  })
  const loginInput = new Input({
    className: '',
    label: 'Логин',
    name: 'login',
    type: 'text',
    id: 'login',
    value: '',
  })
  const nameInput = new Input({
    className: '',
    label: 'Имя',
    name: 'first_name',
    type: 'text',
    id: 'first_name',
    value: '',
  })
  const surnameInput = new Input({
    className: '',
    label: 'Фамилия',
    name: 'second_name',
    type: 'text',
    id: 'second_name',
    value: '',
  })
  const phoneInput = new Input({
    className: '',
    label: 'Телефон',
    name: 'phone',
    type: 'text',
    id: 'phone',
    value: '',
  })
  const passInput = new Input({
    className: '',
    label: 'Пароль',
    name: 'password',
    type: 'password',
    id: 'password',
    value: '',
  })
  const repeatPassInput = new Input({
    className: '',
    label: 'Пароль (еще раз)',
    name: 'repeat_password',
    type: 'password',
    id: 'repeat_password',
    value: '',
  })
  const authBtn = new Button({
    text: 'Зарегистрироваться',
    attrs: {
      class: 'button',
    },
  })
  const toLoginLink = new RouterLink({
    text: 'Войти',
    className: '',
    path: '/login',
  })
  const signUpPage = new SignUpPage({
    title: 'Регистрация',
    emailInput,
    loginInput,
    nameInput,
    surnameInput,
    phoneInput,
    passInput,
    repeatPassInput,
    authBtn,
    toLoginLink,
    attrs: {
      class: 'main',
    },
  })

  render('#app', signUpPage)
}
