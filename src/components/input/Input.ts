import HandleBars from 'handlebars'
import Component from '../../classes/Component'
import type { Props } from '../../types/Props'
import inputTmpl from './input.tmpl'
import './input.scss'

interface InputProps extends Props {
  className: string
  id: string
  name: string
  type: string
  value: string
  noLabel?: boolean
  label?: string
  withIcon?: boolean
}
export default class Input extends Component {
  constructor(props: InputProps) {
    super('div', props)
  }

  render(): string {
    const template = HandleBars.compile(inputTmpl)
    return template(this.props)
  }
}