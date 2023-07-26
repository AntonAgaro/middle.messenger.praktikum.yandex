import Component from '../../classes/Component'
import { Props } from '../../types/Props'
import signUpTmpl from './signup.tmpl'

export default class SignUpPage extends Component {
  constructor(props: Props) {
    super('main', props)
  }

  render() {
    return this.compile(signUpTmpl, this.props)
  }
}
