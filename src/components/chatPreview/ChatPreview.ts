import Component from '../../classes/Component'
import type { Props } from '../../types/Props'
import chartPreviewTmpl from './chatPreview.tmpl'
import './chatPreview.scss'

export default class ChatPreview extends Component {
  constructor(props: Props) {
    super('div', props)
  }

  render() {
    return this.compile(chartPreviewTmpl, this.props)
  }
}
