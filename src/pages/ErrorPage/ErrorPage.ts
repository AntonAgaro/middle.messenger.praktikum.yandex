import errorPageTmpl from './errorPage.tmpl'
import type { Props } from '../../types/Props'
import Component from '../../classes/Component'
import './errorPage.scss'

export default class ErrorPage extends Component {
  constructor(props: Props) {
    super('main', props)
  }

  render() {
    return this.compile(errorPageTmpl, this.props)
  }
}
