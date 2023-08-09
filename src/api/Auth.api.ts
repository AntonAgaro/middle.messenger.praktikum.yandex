import HTTPTransport from '../classes/HTTPTransort'
import BaseApi from '../classes/BaseApi'

const authApiInstance = new HTTPTransport()
export class AuthApi extends BaseApi {
  static getUser() {
    return authApiInstance.get('https://ya-praktikum.tech/api/v2/auth/user')
  }
}
