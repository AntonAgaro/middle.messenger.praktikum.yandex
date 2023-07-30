import './button.scss'
import Component from '../../classes/Component'
import { Props } from '../../types/Props'
import ButtonTmpl from './button.tmpl'

export default class Button extends Component {
  constructor(props: Props) {
    super('button', props)
  }

  render(): DocumentFragment {
    return this.compile(ButtonTmpl, this.props)
  }
}
