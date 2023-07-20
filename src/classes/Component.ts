import EventBus from './EventBus'

type Props = Record<string, any>
enum ComponentEvents {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

export default class Component {
  private element: HTMLElement | null = null

  private tagName: string

  private props: Record<string, any> = {}

  private eventBus: EventBus

  constructor(tagName = 'div', props = {}) {
    this.eventBus = new EventBus()
    this.tagName = tagName
    this.props = this.makePropsProxy(props)

    this.registerEvents(this.eventBus)
    this.eventBus.emit(ComponentEvents.INIT)
  }

  private registerEvents(eventBus: EventBus): void {
    eventBus.on(ComponentEvents.INIT, this.init.bind(this))
    eventBus.on(ComponentEvents.FLOW_CDM, this.componentDidMount.bind(this))
    eventBus.on(ComponentEvents.FLOW_RENDER, this.render.bind(this))
  }

  private createResources(): void {
    this.element = this.createDocumentElement(this.tagName)
  }

  protected init() {
    this.createResources()
    this.eventBus.emit(ComponentEvents.FLOW_CDM)
    this.eventBus.emit(ComponentEvents.FLOW_RENDER)
  }

  protected componentDidMount() {}

  // Может переопределять пользователь, необязательно трогать
  // componentDidMount(oldProps) {}

  dispatchComponentDidMount() {
    this.eventBus.emit(ComponentEvents.FLOW_CDM)
  }

  protected componentDidUpdate() {
    this.eventBus.emit(ComponentEvents.FLOW_RENDER)
    // const response = this.componentDidUpdate(oldProps, newProps)
  }

  // Может переопределять пользователь, необязательно трогать
  // componentDidUpdate(oldProps, newProps) {
  //   return true
  // }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return
    }
    this.componentDidUpdate()

    Object.assign(this.props, nextProps)
  }

  // get element() {
  //   return this._element
  // }

  protected render() {
    // const block = this.render()
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    if (this.element) {
      this.element.innerHTML = this.compileTemplate()
    }
  }

  protected compileTemplate(): string {
    return ''
  }

  // Может переопределять пользователь, необязательно трогать
  // render() {}

  // protected getContent() {
  //   return this.element
  // }

  private makePropsProxy(props: Props): Props {
    const self = this
    return new Proxy(props, {
      get(target: Props, prop: any) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target: Props, prop: any, value: any) {
        target[prop] = value
        self.eventBus.emit(ComponentEvents.FLOW_CDU)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
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
