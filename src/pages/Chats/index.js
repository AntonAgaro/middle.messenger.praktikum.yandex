import chatsPageTmpl from './Chats.hbs'
import routeLinkTmpl from '@components/routerLink/routerLink.hbs'
import inputTmpl from '@components/input/input.hbs'
import chatPreviewTmpl from '@components/chatPreview/chatPreview.hbs'
import { render } from '@/utils/functions.js'
import './chats.scss'

export default function renderChatPage() {
  const lintToProfile = render(routeLinkTmpl, { path: '/user', text: 'В профиль', withIcon: true })
  const searchInput = render(inputTmpl, { name: 'search', type: 'text', label: 'Поиск', withIcon: true })
  let chatsList = ''
  for (let i = 0; i < 10; i++) {
    chatsList += render(chatPreviewTmpl, { unreadMessages: 2 })
  }

  return chatsPageTmpl({ lintToProfile, searchInput, chatsList })
}
