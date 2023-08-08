import ChatsPage from './ChatsPage'
import { render } from '../../utils/functions'

export default function renderChatsPage() {
  render('#app', new ChatsPage({}))
}
