import './modal.scss'
import Component from '../../classes/Component'
import { Props } from '../../types/Props'
import modalTmpl from './modal.tmpl'

export default class Modal extends Component {
  constructor(props: Props) {
    super('div', props)
  }

  render(): DocumentFragment {
    return this.compile(modalTmpl, this.props)
  }
}
