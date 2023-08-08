import './user.scss'
import User from './User'
import { render } from '../../utils/functions'

export default function renderUserPage() {
  render('#app', new User({}))
}
