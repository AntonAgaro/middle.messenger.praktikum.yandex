import Component from '../../classes/Component'
import type { Props } from '../../types/Props'
import userTmpl from './user.tmpl'

export default class User extends Component {
  constructor(props: Props) {
    super('main', props)
  }

  render() {
    return this.compile(userTmpl, this.props)
  }
}
