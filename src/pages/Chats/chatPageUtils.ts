import { ChatApi } from '../../api/chat.api'
import Store from '../../classes/Store'

export function getUserChats() {
  ChatApi.getUserChats().then((res) => {
    const result = res as XMLHttpRequest
    if (result.status === 200) {
      Store.set('chats', result.response)
    }
  })
  console.log(Store.getState())
}
