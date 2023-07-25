import Component from '../../classes/Component'
import type { Props } from '../../types/Props'
import loginTmpl from './login.tmpl'

export default class LoginPage extends Component {
  constructor(props: Props) {
    super('main', props)
  }

  render() {
    return this.compile(loginTmpl, this.props)
  }
}
