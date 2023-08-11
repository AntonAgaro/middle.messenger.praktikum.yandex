import HTTPTransport from '../classes/HTTPTransort'
import BaseApi from '../classes/BaseApi'

const chatApiInstance = new HTTPTransport()
export class ChatApi extends BaseApi {
  static getUserChats() {
    return chatApiInstance.get('https://ya-praktikum.tech/api/v2/chats')
  }
}
