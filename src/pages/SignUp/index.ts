import SignUpPage from './SignUpPage'
import { render } from '../../utils/functions'

export default function renderSignUp() {
  render('#app', new SignUpPage({}))
}
