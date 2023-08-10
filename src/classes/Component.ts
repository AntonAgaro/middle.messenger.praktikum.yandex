import { v4 as makeUUID } from 'uuid'
import HandleBars from 'handlebars'
import EventBus from './EventBus'
import type { Props } from '../types/Props'
import { ComponentEvents } from '../enums/ComponentEvents'

export default abstract class Component {
  private EventBus: EventBus

  private element: HTMLElement | null = null

  private tagName = 'div'

  public id: string

  public props: Props

  protected children: Record<string, Component | Component[]>

  constructor(tagName: string, propsAndChildren = {}) {
    this.EventBus = new EventBus()
    this.tagName = tagName
    // TODO сделать только если есть settings для id
    this.id = makeUUID()
    const { props, children } = this.separatePropsAndChildren(propsAndChildren)
    this.props = this.makePropsProxy({ ...props, _id: this.id })
    this.children = children

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
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((c) => {
          c.dispatchComponentDidMount()
        })
      } else {
        child.dispatchComponentDidMount()
      }
    })
  }

  public getContent() {
    return this.element
  }

  // param oldProps
  componentDidMount() {}

  dispatchComponentDidMount() {
    this.EventBus.emit(ComponentEvents.FLOW_CDM)
  }

  private baseComponentDidUpdate() {
    const isUpdated = this.componentDidUpdate()
    if (isUpdated) {
      this.EventBus.emit(ComponentEvents.FLOW_RENDER)
    }
  }

  // params oldProps: Props, newProps: Props
  // Сравнить реально ли новые пропсы "Новые"
  componentDidUpdate() {
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
    this.element.appendChild(block)
    this.addEvents()
    this.addAttributes()
  }

  render(): DocumentFragment {
    const fragment = this.createDocumentElement('template') as HTMLTemplateElement
    return fragment.content
  }

  public compile(template: string, props: Props): DocumentFragment {
    const propsAndStubs = { ...props }
    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = []
        child.forEach((c) => {
          propsAndStubs[key].push(`<div data-id="${c.id}"></div>`)
        })
        propsAndStubs[key] = propsAndStubs[key].join(' ')
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`
      }
    })

    const fragment = this.createDocumentElement('template') as HTMLTemplateElement

    const templateFunc = HandleBars.compile(template)
    fragment.innerHTML = templateFunc(propsAndStubs)
    Object.values(this.children).forEach((child) => {
      const arrayWithChildren = Array.isArray(child) ? child : [child]
      arrayWithChildren.forEach((c) => {
        const stub = fragment.content.querySelector(`[data-id="${c.id}"]`)
        const childElement = c.getContent()
        if (stub && childElement) {
          stub.replaceWith(childElement)
        }
      })
    })

    return fragment.content
  }

  private makePropsProxy = (props: Props) => {
    props = new Proxy(props, {
      get: (target, prop: any) => {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set: (target, prop: any, value) => {
        target[prop] = value
        this.EventBus.emit(ComponentEvents.FLOW_CDU)
        return true
      },
      deleteProperty() {
        throw new Error('нет доступа')
      },
    })
    return props
  }

  private separatePropsAndChildren(propsAndChildren: Props) {
    const props: Props = {}
    const children: Record<string, Component | Component[]> = {}
    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Component || Array.isArray(value)) {
        children[key] = value
      } else {
        props[key] = value
      }
    })
    return { props, children }
  }

  private createDocumentElement(tagName: string): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const element = document.createElement(tagName)
    element.setAttribute('data-id', this.id)
    return element
  }

  show() {
    if (this.element) {
      this.element.style.display = 'flex'
    }
  }

  hide() {
    if (this.element) {
      this.element.style.display = 'none'
    }
  }
}
