import Button from '../../components/button/Button'
import RouterLink from '../../components/routerLink/RouterLink'
import SignUpPage from './SignUpPage'
import { render } from '../../utils/functions'
import Input from '../../components/input/Input'
import InputGroup from '../../components/inputGroup/InputGroup'

export default function renderSignUp() {
  const emailInput = new InputGroup({
    input: new Input({
      attrs: {
        class: 'input',
        name: 'email',
        type: 'text',
        id: 'email',
        value: '',
        required: true,
      },
    }),
    name: 'email',
    label: 'Почта',
  })
  const loginInput = new InputGroup({
    input: new Input({
      attrs: {
        class: 'input',
        name: 'login',
        type: 'text',
        id: 'login',
        value: '',
        required: true,
      },
    }),
    label: 'Логин',
    name: 'login',
  })
  const nameInput = new InputGroup({
    input: new Input({
      attrs: {
        class: 'input',
        name: 'first_name',
        type: 'text',
        id: 'first_name',
        value: '',
        required: true,
      },
    }),
    label: 'Имя',
    name: 'first_name',
  })
  const surnameInput = new InputGroup({
    input: new Input({
      attrs: {
        class: 'input',
        name: 'second_name',
        type: 'text',
        id: 'second_name',
        value: '',
        required: true,
      },
    }),
    label: 'Фамилия',
    name: 'second_name',
  })
  const phoneInput = new InputGroup({
    input: new Input({
      attrs: {
        class: 'input',
        name: 'phone',
        type: 'text',
        id: 'phone',
        value: '',
        required: true,
      },
    }),
    label: 'Телефон',
    name: 'phone',
  })
  const passInput = new InputGroup({
    input: new Input({
      attrs: {
        class: 'input',
        name: 'password',
        type: 'password',
        id: 'password',
        value: '',
        required: true,
      },
    }),
    label: 'Пароль',
    name: 'password',
  })
  const repeatPassInput = new InputGroup({
    input: new Input({
      attrs: {
        class: 'input',
        name: 'repeat_password',
        type: 'password',
        id: 'repeat_password',
        value: '',
        required: true,
      },
    }),
    label: 'Пароль (еще раз)',
    name: 'repeat_password',
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
