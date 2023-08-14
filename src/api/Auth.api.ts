import HTTPTransport from '../classes/HTTPTransort'
import BaseApi from '../classes/BaseApi'

const authApiInstance = new HTTPTransport()
export class AuthApi extends BaseApi {
  static getUser() {
    return authApiInstance.get('/auth/user')
  }

  static login(data: Record<string, any>) {
    return authApiInstance.post('/auth/signin', {
      data,
    })
  }

  static logout() {
    return authApiInstance.post('/auth/logout')
  }
}
