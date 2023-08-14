import { UserApi } from '../../api/User.api'
import Store from '../../classes/Store'
import Component from '../../classes/Component'
import { AuthApi } from '../../api/Auth.api'
import Router from '../../classes/Router/Router'
import { Routes } from '../../enums/Routes'

export default class UserController {
  static async changeUserData(
    e: Event,
    validationArray: boolean[],
    mainComponent: Component,
    userPageInputs: Record<string, Component>,
  ) {
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
      const changeUserDataRes = (await UserApi.update(data)) as XMLHttpRequest
      if (changeUserDataRes.status === 200) {
        Store.set('user', changeUserDataRes.response)
      }

      mainComponent.setProps({
        isEditing: 'off',
      })
      Object.values(userPageInputs).forEach((input) => {
        input.getContent()?.setAttribute('disabled', 'true')
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async logout() {
    try {
      const logoutRes = (await AuthApi.logout()) as XMLHttpRequest
      if (logoutRes.status === 200) {
        Store.set('user', null)
        Router.go(Routes.Login)
      }
    } catch (error) {
      console.log(error)
    }
  }

  static async changeUserPass(e: Event, validationArray: boolean[], mainComponent: Component) {
    e.preventDefault()
    const target = e.target as HTMLElement
    const form = target.closest('form')

    const isValid = validationArray.every((v) => v)
    if (!form || !isValid) {
      return
    }
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    const changePassRes = (await UserApi.changePassword(data)) as XMLHttpRequest
    if (changePassRes.status === 200) {
      mainComponent.setProps({
        isPassEditing: 'off',
        error: '',
      })
    }
  }

  static async changeUserAvatar(
    e: Event,
    userAvatarInput: Component,
    userAvatarInputGroup: Component,
    modal: Component,
  ) {
    try {
      e.preventDefault()
      const target = e.target as HTMLElement
      const form = target.closest('form') as HTMLFormElement
      const input = userAvatarInput.getContent() as HTMLInputElement
      if (!input.value) {
        userAvatarInputGroup.setProps({
          error: 'Добавьте файл!',
        })
        return
      }
      const formData = new FormData(form)
      const userAvatarRes = (await UserApi.changeAvatar(formData)) as XMLHttpRequest
      if (userAvatarRes.status !== 200) {
        userAvatarInputGroup.setProps({
          error: userAvatarRes.response.reason,
        })
        return
      }
      Store.set('user', userAvatarRes.response)
      modal.hide()
    } catch (error) {
      console.log(error)
    }
  }
}
