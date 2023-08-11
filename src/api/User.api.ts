import HTTPTransport from '../classes/HTTPTransort'
import BaseApi from '../classes/BaseApi'

const UserApiInstance = new HTTPTransport()
export class UserApi extends BaseApi {
  static update(data: Record<string, FormDataEntryValue>) {
    return UserApiInstance.put('https://ya-praktikum.tech/api/v2/user/profile', {
      data,
    })
  }

  static changePassword(data: Record<string, FormDataEntryValue>) {
    return UserApiInstance.put('https://ya-praktikum.tech/api/v2/user/password', {
      data,
    })
  }

  static changeAvatar(data: FormData) {
    return UserApiInstance.put('https://ya-praktikum.tech/api/v2/user/profile/avatar', {
      data,
    })
  }

  static getUserByLogin(data: Record<string, FormDataEntryValue>) {
    return UserApiInstance.post('https://ya-praktikum.tech/api/v2/user/search', {
      data,
    })
  }
}
