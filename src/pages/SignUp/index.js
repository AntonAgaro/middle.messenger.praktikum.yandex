import SignUpTmpl from './SignUp.hbs'
import { createFormInputs, render } from '@/utils/functions.js'
import buttonTmpl from '@components/button/button.hbs'
import routerLinkTmpl from '@components/routerLink/routerLink.hbs'
import formTmpl from '@components/form/form.hbs'
import inputTmpl from '@components/input/input.hbs'

export default function renderSignUp() {
  const inputsSettings = [
    { label: 'Почта', name: 'email', type: 'text' },
    { label: 'Логин', name: 'login', type: 'text' },
    { label: 'Имя', name: 'first_name', type: 'text' },
    { label: 'Фамилия', name: 'second_name', type: 'text' },
    { label: 'Телефон', name: 'phone', type: 'text' },
    { label: 'Пароль', name: 'password', type: 'password' },
    { label: 'Пароль (еще раз)', name: 'repeat_password', type: 'password' },
  ]

  let formButtons = ''
  formButtons += render(buttonTmpl, { text: 'Зарегистрироваться' })
  formButtons += render(routerLinkTmpl, { text: 'Войти', path: '/login' })

  return SignUpTmpl({
    content: render(formTmpl, {
      title: 'Регистрация',
      inputs: createFormInputs(inputsSettings, inputTmpl),
      buttons: formButtons,
    }),
  })
}
