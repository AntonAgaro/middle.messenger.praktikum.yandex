import HTTPTransport from '../classes/HTTPTransort'
import BaseApi from '../classes/BaseApi'

const signUpApiInstance = new HTTPTransport()
export class SignUpApi extends BaseApi {
  static create(data: Record<string, any>) {
    return signUpApiInstance.post('https://ya-praktikum.tech/api/v2/auth/signup', {
      data,
    })
  }
}
