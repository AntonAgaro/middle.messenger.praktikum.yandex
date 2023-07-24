import EventBus from './EventBus'
import type { Props } from '../types/Props'

enum ComponentEvents {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}
export default class Component {
  private EventBus: EventBus

  private element: HTMLElement | null = null

  private tagName = 'div'

  protected props: Props

  constructor(tagName: string, props = {}) {
    this.EventBus = new EventBus()
    this.tagName = tagName
    this.props = this.makePropsProxy(props)

    this.registerEvents(this.EventBus)
    this.EventBus.emit(ComponentEvents.INIT)
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(ComponentEvents.INIT, this.init.bind(this))
    eventBus.on(ComponentEvents.FLOW_CDM, this.baseComponentDidMount.bind(this))
    eventBus.on(ComponentEvents.FLOW_RENDER, this.baseRender.bind(this))
    eventBus.on(ComponentEvents.FLOW_CDU, this.baseComponentDidUpdate.bind(this))
  }

  private createResources() {
    this.element = this.createDocumentElement(this.tagName)
  }

  private addAttributes() {
    const { attrs = {} } = this.props
    Object.entries(attrs).forEach(([key, value]) => {
      this.element?.setAttribute(key, value as string)
    })
  }

  init() {
    this.createResources()
    this.EventBus.emit(ComponentEvents.FLOW_CDM)
    this.EventBus.emit(ComponentEvents.FLOW_RENDER)
  }

  private baseComponentDidMount() {
    this.componentDidMount()
  }

  public getContent() {
    return this.element
  }

  // param oldProps
  componentDidMount() {}

  dispatchComponentDidMount() {
    this.EventBus.emit(ComponentEvents.FLOW_CDM)
  }

  private baseComponentDidUpdate(oldProps: Props, newProps: Props) {
    const isUpdated = this.componentDidUpdate(oldProps, newProps)
    if (isUpdated) {
      this.EventBus.emit(ComponentEvents.FLOW_RENDER)
    }
  }

  // params oldProps: Props, newProps: Props
  // Сравнить реально ли новые пропсы "Новые"
  // @ts-ignore
  componentDidUpdate(oldProps: Props, newProps: Props) {
    return true
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
    this.EventBus.emit(ComponentEvents.FLOW_CDU)
  }

  private addEvents(): void {
    const { events = {} } = this.props
    Object.keys(events).forEach((eventName) => {
      this.element?.addEventListener(eventName, events[eventName])
    })
  }

  private removeEvents(): void {
    console.log('remove')
    const { events = {} } = this.props
    Object.keys(events).forEach((eventName) => {
      this.element?.removeEventListener(eventName, events[eventName])
    })
  }

  private baseRender() {
    if (!this.element) {
      return
    }
    const block = this.render()
    this.removeEvents()
    this.element.innerHTML = ''
    this.element.innerHTML = block
    this.addEvents()
    this.addAttributes()
  }

  // Может переопределять пользователь, необязательно трогать
  render() {
    return ''
  }

  private makePropsProxy(props: Props) {
    const self = this
    props = new Proxy(props, {
      get(target, prop: any) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop: any, value) {
        target[prop] = value
        self.EventBus.emit(ComponentEvents.FLOW_CDU)
        return true
      },
      deleteProperty() {
        throw new Error('нет доступа')
      },
    })
    return props
  }

  private createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName)
  }

  show() {
    if (this.element) {
      this.element.style.display = 'block'
    }
  }

  hide() {
    if (this.element) {
      this.element.style.display = 'none'
    }
  }
}
