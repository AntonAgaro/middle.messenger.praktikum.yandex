import './routerLink.scss'
import type { Props } from '../../types/Props'
import Component from '../../classes/Component'
import routerLinkTmpl from './routerLink.tmpl'

interface RouterLinkProps extends Props {
  text: string
  withIcon?: boolean
  className: string
  path: string
}

export default class RouterLink extends Component {
  constructor(props: RouterLinkProps) {
    super('div', props)
  }

  render() {
    return this.compile(routerLinkTmpl, this.props)
  }
}
