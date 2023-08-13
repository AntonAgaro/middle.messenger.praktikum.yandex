import Validator from '../../classes/Validator'
import { AuthApi } from '../../api/Auth.api'
import Store from '../../classes/Store'
import RouterClass from '../../classes/Router/Router'
import Component from '../../classes/Component'
import { Routes } from '../../enums/Routes'

export default class LoginController {
  static async login(
    e: Event,
    loginInput: Component,
    loginInputGroup: Component,
    passInput: Component,
    passInputGroup: Component,
    loginPage: Component,
  ) {
    try {
      e.preventDefault()
      const target = e.target as HTMLElement
      const form = target.closest('form')
      const isLoginInputValid = Validator.validate(loginInput, Validator.checkLogin, loginInputGroup)
      const isPassInputValid = Validator.validate(passInput, Validator.checkPass, passInputGroup)
      if (!form || !isLoginInputValid || !isPassInputValid) {
        return
      }
      const formData = new FormData(form)
      const data = Object.fromEntries(formData)
      const loginRes = (await AuthApi.login(data)) as XMLHttpRequest

      if (loginRes.status !== 200) {
        loginPage.setProps({
          serverError: loginRes.response.reason,
        })
      }
      const userRes = (await AuthApi.getUser()) as XMLHttpRequest

      if (userRes.status === 200) {
        loginPage.setProps({
          serverError: '',
        })
        Store.set('user', userRes.response)
        RouterClass.go(Routes.Chats)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
