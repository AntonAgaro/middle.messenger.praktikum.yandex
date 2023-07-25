import LoginPage from './LoginPage'
import { render } from '../../utils/functions'
// import LoginPage from '@/pages/Login/LoginPage.js'

export default function renderLoginPage() {
  // const inputsSettings = [
  //   { label: 'Логин', name: 'login', type: 'text' },
  //   { label: 'Пароль', name: 'password', type: 'password' },
  // ]
  //
  // let formButtons = ''
  // formButtons += render(buttonTmpl, { text: 'Авторизоваться' })
  // formButtons += render(routerLinkTmpl, { text: 'Нет аккаунта?', path: '/signup' })
  //
  // return loginTmpl({
  //   content: render(formTmpl, {
  //     title: 'Вход',
  //     inputs: createFormInputs(inputsSettings, inputTmpl),
  //     buttons: formButtons,
  //   }),
  // })
  const LoginPageEl = new LoginPage({})
  render('#app', LoginPageEl)
}
