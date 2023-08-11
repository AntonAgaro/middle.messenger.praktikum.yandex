import { ChatApi } from '../../api/chat.api'
import Store from '../../classes/Store'
import Component from '../../classes/Component'
import Validator from '../../classes/Validator'
import { UserApi } from '../../api/User.api'
import { TUser } from '../../types/TUser'

export default class ChatPageController {
  static getUserChats() {
    ChatApi.getUserChats().then((res) => {
      const result = res as XMLHttpRequest
      if (result.status === 200) {
        Store.set('chats', result.response)
      }
    })
    console.log(Store.getState())
  }

  static handleFormData(e: Event, input: Component, inputGroup: Component): Record<string, FormDataEntryValue> {
    e.preventDefault()
    const target = e.target as HTMLElement
    const form = target.closest('form')
    const isInput = Validator.validate(input, Validator.checkIsNotEmpty, inputGroup)
    if (!form || !isInput) {
      return {}
    }
    const formData = new FormData(form)
    return Object.fromEntries(formData)
  }

  static async createChat(e: Event, modalInput: Component, modalInputGroup: Component, chatsModal: Component) {
    const data = ChatPageController.handleFormData(e, modalInput, modalInputGroup)
    if (!Object.keys(data).length) {
      return
    }
    const createChatRes = (await ChatApi.create(data)) as XMLHttpRequest
    if (createChatRes.status !== 200) {
      chatsModal.setProps({
        serverError: createChatRes.response.reason,
      })
      return
    }
    chatsModal.hide()
    ChatPageController.getUserChats()
  }

  static async addUserToChat(e: Event, modalInput: Component, modalInputGroup: Component, chatsModal: Component) {
    const data = ChatPageController.handleFormData(e, modalInput, modalInputGroup)
    if (!Object.keys(data).length) {
      return
    }
    const userSearchRequest = (await UserApi.getUserByLogin(data)) as XMLHttpRequest
    if (userSearchRequest.status !== 200) {
      modalInputGroup.setProps({
        error: userSearchRequest.response.reason,
      })
      return
    }
    const userArr = userSearchRequest.response
    if (!userArr.length) {
      modalInputGroup.setProps({
        error: 'Пользователь не найден',
      })
      return
    }
    const activeChatId = Store.getState().activeChatId ?? 0
    const usersIdArr = userArr.map((user: TUser) => user.id)
    const addUserToChatRes = (await ChatApi.addUserToChat(usersIdArr, activeChatId)) as XMLHttpRequest
    if (addUserToChatRes.status !== 200) {
      modalInputGroup.setProps({
        error: userSearchRequest.response.reason,
      })
      return
    }
    chatsModal.hide()
  }
}
