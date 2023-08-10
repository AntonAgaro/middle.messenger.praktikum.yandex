import HTTPTransport from '../classes/HTTPTransort'
import BaseApi from '../classes/BaseApi'

const UserApiInstance = new HTTPTransport()
export class UserApi extends BaseApi {
  static update(data: Record<string, any>) {
    return UserApiInstance.put('https://ya-praktikum.tech/api/v2/user/profile', {
      data,
    })
  }

  static changePassword(data: Record<string, any>) {
    return UserApiInstance.put('https://ya-praktikum.tech/api/v2/user/password', {
      data,
    })
  }
}
