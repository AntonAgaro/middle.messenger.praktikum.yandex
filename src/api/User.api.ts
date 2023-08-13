import HTTPTransport from '../classes/HTTPTransort'
import BaseApi from '../classes/BaseApi'

const UserApiInstance = new HTTPTransport()
export class UserApi extends BaseApi {
  static update(data: Record<string, FormDataEntryValue>) {
    return UserApiInstance.put('/user/profile', {
      data,
    })
  }

  static changePassword(data: Record<string, FormDataEntryValue>) {
    return UserApiInstance.put('/user/password', {
      data,
    })
  }

  static changeAvatar(data: FormData) {
    return UserApiInstance.put('/user/profile/avatar', {
      data,
    })
  }

  static getUserByLogin(data: Record<string, FormDataEntryValue>) {
    return UserApiInstance.post('/user/search', {
      data,
    })
  }
}
