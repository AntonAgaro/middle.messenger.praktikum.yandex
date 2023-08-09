import HTTPTransport from '../classes/HTTPTransort'
import BaseApi from '../classes/BaseApi'

const chatApiInstance = new HTTPTransport()
class ChatApi extends BaseApi {
  create() {
    return chatApiInstance.post('api/v1/chats', { title: 'title' })
  }

  request() {
    return chatApiInstance.get('api/v1/chats/full')
  }
}
