import './button.scss'
import HandleBars from 'handlebars'
import Component from '../../classes/Component'
import { Props } from '../../types/Props'
import ButtonTmpl from './button.tmpl'

export default class Button extends Component {
  constructor(props: Props) {
    super('button', props)
  }

  render(): string {
    const template = HandleBars.compile(ButtonTmpl)
    return template(this.props)
  }
}
