import { Indexed } from '../types/Indexed'
import { set } from '../utils/functions'
import EventBus from './EventBus'
import { StoreEvent } from '../enums/StoreEvents'

class Store extends EventBus {
  private state: Indexed = {}

  public getState() {
    return this.state
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value)
    this.emit(StoreEvent.Updated)
  }
}

export default new Store()
