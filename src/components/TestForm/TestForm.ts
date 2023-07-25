import Component from '../../classes/Component'
import type { Props } from '../../types/Props'
import testFormTmpl from './testForm.tmpl'

export default class TestForm extends Component {
  constructor(props: Props) {
    super('form', props)
  }

  render() {
    return this.compile(testFormTmpl, this.props)
  }
}
