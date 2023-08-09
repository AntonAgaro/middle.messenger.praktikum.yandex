import HTTPTransport from '../classes/HTTPTransort'
import BaseApi from '../classes/BaseApi'

const chatMessagesApiInstanse = new HTTPTransport()
const id = 'test'
class ChatMessagesApi extends BaseApi {
  request() {
    return chatMessagesApiInstanse.get(`api/v1/messages/${id}`)
  }
}
