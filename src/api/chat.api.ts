import HTTPTransport from '../classes/HTTPTransort'
import BaseApi from '../classes/BaseApi'

const chatApiInstance = new HTTPTransport()
export class ChatApi extends BaseApi {
  static getUserChats() {
    return chatApiInstance.get('/chats')
  }

  static create(data: Record<string, any>) {
    return chatApiInstance.post('/chats', {
      data,
    })
  }

  static addUserToChat(users: number[], activeChatId: number) {
    return chatApiInstance.put('/chats/users', {
      data: {
        chatId: +activeChatId,
        users,
      },
    })
  }

  static deleteUserFromChat(users: number[], activeChatId: number) {
    return chatApiInstance.delete('/chats/users', {
      data: {
        chatId: +activeChatId,
        users,
      },
    })
  }

  static getChatUsers(id: number | string) {
    return chatApiInstance.get(`/chats/${id}/users`)
  }

  static getChatToken(chatId: string | number) {
    return chatApiInstance.post(`/chats/token/${chatId}`)
  }

  static deleteChat(chatId: string | number) {
    return chatApiInstance.delete('/chats', {
      data: {
        chatId,
      },
    })
  }

  static addChatLogo(data: FormData) {
    return chatApiInstance.put('/chats/avatar', {
      data,
    })
  }
}
