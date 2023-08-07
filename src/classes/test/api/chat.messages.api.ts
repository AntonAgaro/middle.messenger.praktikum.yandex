import HTTPTransport from '../../HTTPTransort'
import BaseApi from '../BaseApi'

const chatMessagesApiInstanse = new HTTPTransport()
const id = 'test'
class ChatMessagesApi extends BaseApi {
  request() {
    return chatMessagesApiInstanse.get(`api/v1/messages/${id}`)
  }
}
