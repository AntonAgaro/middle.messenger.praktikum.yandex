import ChatsPage from './ChatsPage'
import RouterLink from '../../components/routerLink/RouterLink'
import Input from '../../components/input/Input'
import ChartPreview from '../../components/chatPreview/ChartPreview'
import { render } from '../../utils/functions'

export default function renderChatsPage() {
  const chatsPage = new ChatsPage({
    linkToProfile: new RouterLink({
      path: '/user',
      text: 'В профиль',
      withIcon: true,
    }),
    searchInput: new Input({
      name: 'search',
      type: 'text',
      label: 'Поиск',
      withIcon: true,
      value: '',
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
