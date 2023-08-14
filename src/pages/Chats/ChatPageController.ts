import { ChatApi } from '../../api/chat.api'
import Store from '../../classes/Store'
import Component from '../../classes/Component'
import Validator from '../../classes/Validator'
import { UserApi } from '../../api/User.api'
import { TUser } from '../../types/TUser'
import { StoreEvent } from '../../enums/StoreEvents'

export default class ChatPageController {
  static getUserChats() {
    try {
      ChatApi.getUserChats().then((res) => {
        const result = res as XMLHttpRequest
        if (result.status === 200) {
          Store.set('chats', result.response)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  static handleFormData(e: Event, input: Component, inputGroup: Component): Record<string, FormDataEntryValue> {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const isInput = Validator.validate(input, Validator.checkIsNotEmpty, inputGroup)
    if (!target || !isInput) {
      return {}
    }
    const formData = new FormData(target)
    target.reset()
    return Object.fromEntries(formData)
  }

  static async createChat(e: Event, modalInput: Component, modalInputGroup: Component, chatsModal: Component) {
    try {
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
    } catch (error) {
      console.log(error)
    }
  }

  static async getUserIdByLogin(data: Record<string, FormDataEntryValue>, inputGroup: Component): Promise<TUser[]> {
    try {
      if (!Object.keys(data).length) {
        return []
      }
      const userSearchRequest = (await UserApi.getUserByLogin(data)) as XMLHttpRequest
      if (userSearchRequest.status !== 200) {
        inputGroup.setProps({
          error: userSearchRequest.response.reason,
        })
        return []
      }
      const userArr = userSearchRequest.response
      if (!userArr.length) {
        inputGroup.setProps({
          error: 'Пользователь не найден',
        })
        return []
      }
      return userArr
    } catch (error) {
      console.log(error)
      return []
    }
  }

  static async addUserToChat(e: Event, modalInput: Component, modalInputGroup: Component, chatsModal: Component) {
    try {
      const data = ChatPageController.handleFormData(e, modalInput, modalInputGroup)
      if (!Object.keys(data).length) {
        return
      }
      const userArr = await ChatPageController.getUserIdByLogin(data, modalInputGroup)
      if (!userArr) {
        return
      }
      const activeChatId = Store.getState().activeChatId ?? 0
      const usersIdArr = userArr.map((user: TUser) => user.id)
      const addUserToChatRes = (await ChatApi.addUserToChat(usersIdArr, activeChatId)) as XMLHttpRequest
      if (addUserToChatRes.status !== 200) {
        modalInputGroup.setProps({
          error: addUserToChatRes.response.reason,
        })
        return
      }
      Store.emit(StoreEvent.Updated)
      chatsModal.hide()
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteUserFromChat(e: Event, modalInput: Component, modalInputGroup: Component, chatsModal: Component) {
    try {
      const data = ChatPageController.handleFormData(e, modalInput, modalInputGroup)

      const userArr = await ChatPageController.getUserIdByLogin(data, modalInputGroup)
      if (!userArr) {
        return
      }
      const activeChatId = Store.getState().activeChatId ?? 0
      const usersIdArr = userArr.map((user: TUser) => user.id)

      const deleteUserFromChatRes = (await ChatApi.deleteUserFromChat(usersIdArr, activeChatId)) as XMLHttpRequest
      if (deleteUserFromChatRes.status !== 200) {
        modalInputGroup.setProps({
          error: deleteUserFromChatRes.response.reason,
        })
        return
      }
      Store.emit(StoreEvent.Updated)
      chatsModal.hide()
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteChat() {
    try {
      const activeChatId = Store.getState().activeChatId ?? 0
      await ChatApi.deleteChat(activeChatId)
      const actualUserChatsRes = (await ChatApi.getUserChats()) as XMLHttpRequest
      const actualUserChats = actualUserChatsRes.response
      Store.set('activeChatId', null)
      Store.set('chats', actualUserChats)
      const newActiveChatId = actualUserChats && actualUserChats.length ? actualUserChats[0].id : null
      Store.set('activeChatId', newActiveChatId)
    } catch (error) {
      console.log(error)
    }
  }

  static async addChatLogo(e: Event, fileInput: Component, fileInputGroup: Component, modal: Component) {
    try {
      e.preventDefault()
      const target = e.target as HTMLElement
      const form = target.closest('form') as HTMLFormElement
      const input = fileInput.getContent() as HTMLInputElement
      if (!input.value) {
        fileInputGroup.setProps({
          error: 'Добавьте файл!',
        })
        return
      }
      const formData = new FormData(form)
      formData.append('chatId', String(Store.getState().activeChatId as number))
      const chatLogoRes = (await ChatApi.addChatLogo(formData)) as XMLHttpRequest
      if (chatLogoRes.status !== 200) {
        fileInputGroup.setProps({
          error: chatLogoRes.response.reason,
        })
        return
      }
      await ChatPageController.getUserChats()
      modal.hide()
    } catch (error) {
      console.log(error)
    }
  }
}
