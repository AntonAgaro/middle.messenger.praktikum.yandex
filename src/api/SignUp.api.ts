import HTTPTransport from '../classes/HTTPTransort'
import BaseApi from '../classes/BaseApi'

const signUpApiInstance = new HTTPTransport()
export class SignUpApi extends BaseApi {
  static create(data: Record<string, any>) {
    return signUpApiInstance.post('/auth/signup', {
      data,
    })
  }
}
