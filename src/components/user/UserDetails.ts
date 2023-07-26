import Component from '../../classes/Component'
import type { Props } from '../../types/Props'
import userDetailsTmpl from './userDetails.tmpl'

export default class UserDetails extends Component {
  constructor(props: Props) {
    super('ul', props)
  }

  render() {
    return this.compile(userDetailsTmpl, this.props)
  }
}
