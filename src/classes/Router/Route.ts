import Component from '../Component'
import { Props } from '../../types/Props'
import { isEqual, routeRender } from '../../utils/functions'

export default class Route {
  private pathname: string

  private readonly componentClass: Component

  private block: Component | null = null

  private props: Props

  constructor(path: string, view: Component, props: Props) {
    this.pathname = path
    this.componentClass = view
    this.props = props
  }

  public navigate(path: string) {
    if (this.match(path)) {
      this.pathname = path
      this.render()
    }
  }

  public leave() {
    if (this.block) {
      this.block.hide()
    }
  }

  public match(path: string) {
    return isEqual(path, this.pathname)
  }

  public render() {
    if (!this.block) {
      this.block = new this.componentClass()
      // TODO подумамать как убрать КОСТЫЛЬ
      this.block?.setProps(this.props)
      routeRender(this.props.rootQuery, this.block as Component)
      return
    }

    this.block.show()
  }
}
