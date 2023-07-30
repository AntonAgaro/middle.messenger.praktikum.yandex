type EventHandler = (...args: any[]) => void
type Bus = Record<string, EventHandler[]>
export default class EventBus {
  private readonly listeners: Bus

  constructor() {
    this.listeners = {}
  }

  on(key: string, handler: EventHandler) {
    if (!this.listeners[key]) {
      this.listeners[key] = []
    }
    this.listeners[key].push(handler)
  }

  off(key: string, handler: EventHandler) {
    if (!this.listeners[key]) {
      throw new Error(`No such event ${key} registered!`)
    }
    this.listeners[key] = this.listeners[key].filter((f) => f !== handler)
  }

  emit(key: string, ...args: Parameters<EventHandler>) {
    if (!this.listeners[key]) {
      throw new Error(`No such event ${key} registered!`)
    }
    this.listeners[key].forEach((listener) => {
      listener(...args)
    })
  }
}
