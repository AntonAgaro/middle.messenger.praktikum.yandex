import Component from '../../classes/Component'
import type { Props } from '../../types/Props'
import './input.scss'
import inputGroupTmpl from './inputGroup.tmpl'

interface InputGroupProps extends Props {
  input: Component
  noLabel?: boolean
  label?: string
  withIcon?: boolean
}
export default class InputGroup extends Component {
  constructor(props: InputGroupProps) {
    super('div', props)
  }

  render(): DocumentFragment {
    return this.compile(inputGroupTmpl, this.props)
  }
}
