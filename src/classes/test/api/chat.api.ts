import HTTPTransport from '../../HTTPTransort'
import BaseApi from '../BaseApi'

const chatApiInstanse = new HTTPTransport()
class ChatApi extends BaseApi {
  create() {
    return chatApiInstanse.post('api/v1/chats', { title: 'title' })
  }

  request() {
    return chatApiInstanse.get('api/v1/chats/full')
  }
}
