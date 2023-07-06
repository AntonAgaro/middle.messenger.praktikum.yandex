import loginTmpl from './login.hbs'
import inputTmpl from '@components/input/input.hbs'
import formTmpl from '@components/form/form.hbs'
import buttonTmpl from '@components/button/button.hbs'
import routerLinkTmpl from '@components/routerLink/routerLink.hbs'
import { render } from '@/utils/functions.js'

export default function renderLoginPage() {
  const inputsSettings = [
    { label: 'Логин', name: 'login', type: 'text' },
    { label: 'Пароль', name: 'password', type: 'password' },
  ]

  let formInputs = ''
  inputsSettings.forEach((o) => {
    formInputs += render(inputTmpl, o)
  })

  let formButtons = ''
  formButtons += render(buttonTmpl, { text: 'Авторизоваться' })
  formButtons += render(routerLinkTmpl, { text: 'Нет аккаунта?', path: '#' })

  return loginTmpl({
    content: render(formTmpl, {
      title: 'Вход',
      inputs: formInputs,
      buttons: formButtons,
    }),
  })
}
