import { v4 as makeUUID } from 'uuid'
import HandleBars from 'handlebars'
import EventBus from './EventBus'
import type { Props } from '../types/Props'

// TODO Переместить в enums
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

  public id: string

  protected props: Props

  protected children: Record<string, Component>

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
      child.dispatchComponentDidMount()
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

  // Может переопределять пользователь, необязательно трогать
  // @ts-ignore
  render(): DocumentFragment {}

  public compile(template, props: Props): DocumentFragment {
    const propsAndStubs = { ...props }
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`
    })

    const fragment = this.createDocumentElement('template') as HTMLTemplateElement

    const templateFunc = HandleBars.compile(template)
    fragment.innerHTML = templateFunc(propsAndStubs)
    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`)
      const childElement = child.getContent()
      if (stub && childElement) {
        stub.replaceWith(childElement)
      }
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
    const children: Record<string, Component> = {}
    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Component) {
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
      this.element.style.display = 'block'
    }
  }

  hide() {
    if (this.element) {
      this.element.style.display = 'none'
    }
  }
}
