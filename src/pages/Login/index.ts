import LoginPage from './LoginPage'
import { render } from '../../utils/functions'

export default function renderLoginPage() {
  render('#app', new LoginPage({}))
}
