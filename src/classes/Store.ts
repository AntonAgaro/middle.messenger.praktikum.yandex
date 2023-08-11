import { set } from '../utils/functions'
import EventBus from './EventBus'
import { StoreEvent } from '../enums/StoreEvents'
import { TChat } from '../types/TChat'
import { TUser } from '../types/TUser'

type State = {
  chats?: TChat[]
  user?: TUser
}
class Store extends EventBus {
  private state: State = {}

  public getState() {
    return this.state
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value)
    this.emit(StoreEvent.Updated)
  }
}

export default new Store()
