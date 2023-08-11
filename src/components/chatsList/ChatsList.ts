import Component from '../../classes/Component'
import type { Props } from '../../types/Props'
import chatsListTmpl from './chatsList.tmpl'
import './chatsList.scss'

export default class ChatsList extends Component {
  constructor(props: Props) {
    super('ul', props)
  }

  render() {
    return this.compile(chatsListTmpl, this.props)
  }
}
