import type { Props } from '../../types/Props'
import Component from '../../classes/Component'

interface InputProps extends Props {
  className?: string
  attrs: {
    class: string
    id: string
    name: string
    type: string
    value?: string
    required?: boolean
    disabled?: boolean
  }
}

export default class Input extends Component {
  constructor(props: InputProps) {
    super('input', props)
  }

  render(): DocumentFragment {
    return this.compile('', this.props)
  }
}
