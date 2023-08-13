import { SignUpApi } from '../../api/SignUp.api'
import { AuthApi } from '../../api/Auth.api'
import Store from '../../classes/Store'
import RouterClass from '../../classes/Router/Router'
import { Routes } from '../../enums/Routes'

export default class SignUpController {
  static async signUp(e: Event, validationArray: boolean[]) {
    try {
      e.preventDefault()
      const target = e.target as HTMLElement
      const form = target.closest('form')

      const isValid = validationArray.every((v) => v)
      if (!form || !isValid) {
        return
      }
      const formData = new FormData(form)
      const data = Object.fromEntries(formData)
      await SignUpApi.create(data)
      const userRes = (await AuthApi.getUser()) as XMLHttpRequest
      if (userRes.status === 200) {
        Store.set('user', userRes.response)
        RouterClass.go(Routes.Chats)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
