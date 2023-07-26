import ChatsPage from './ChatsPage'
import RouterLink from '../../components/routerLink/RouterLink'
import ChartPreview from '../../components/chatPreview/ChartPreview'
import { render } from '../../utils/functions'
import Input from '../../components/input/Input'
import InputGroup from '../../components/inputGroup/InputGroup'

export default function renderChatsPage() {
  const chatsPage = new ChatsPage({
    linkToProfile: new RouterLink({
      path: '/user',
      text: 'В профиль',
      withIcon: true,
    }),
    searchInput: new InputGroup({
      input: new Input({
        attrs: {
          class: 'input',
          name: 'search',
          type: 'text',
          value: '',
          id: 'search',
        },
      }),
      label: 'Поиск',
      name: 'search',
      withIcon: true,
    }),
    chatsList: new ChartPreview({
      unreadMessages: 2,
    }),
    attrs: {
      class: 'chats',
    },
  })

  render('#app', chatsPage)
}
