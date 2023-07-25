import Component from '../../classes/Component'
import { Props } from '../../types/Props'
import './form.scss'
import formTmpl from './form.tmpl'

export default class Form extends Component {
  constructor(props: Props) {
    super('form', props)
  }

  render() {
    return this.compile(formTmpl, this.props)
  }
}
