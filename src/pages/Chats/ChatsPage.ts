import Component from '../../classes/Component'
import type { Props } from '../../types/Props'
import chatsPageTmpl from './chatsPage.tmpl'
import './chats.scss'

export default class ChatsPage extends Component {
  constructor(props: Props) {
    super('main', props)
  }

  render() {
    return this.compile(chatsPageTmpl, this.props)
  }
}
