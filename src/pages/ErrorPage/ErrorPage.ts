import errorPageTmpl from './errorPage.tmpl'
import type { Props } from '../../types/Props'
import Component from '../../classes/Component'
import './errorPage.scss'
import RouterLink from '../../components/routerLink/RouterLink'
import { Routes } from '../../enums/Routes'

export default class ErrorPage extends Component {
  constructor(props: Props) {
    const link = new RouterLink({
      path: Routes.Chats,
      text: 'К чатам',
    })
    super('main', {
      ...props,
      link,
      attrs: {
        class: 'main',
      },
    })
  }

  render() {
    return this.compile(errorPageTmpl, this.props)
  }
}
