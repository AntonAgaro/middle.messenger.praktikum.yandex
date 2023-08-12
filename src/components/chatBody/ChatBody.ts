import Component from '../../classes/Component'
import { Props } from '../../types/Props'
import ChatBodyTmpl from './chatBody.tmpl'
import { StoreEvent } from '../../enums/StoreEvents'
import Store from '../../classes/Store'
import { ChatApi } from '../../api/chat.api'

export default class ChatBody extends Component {
  constructor(props: Props) {
    Store.on(StoreEvent.Updated, async () => {
      const chatId = Store.getState().activeChatId
      if (!chatId) {
        return
      }

      this.setProps({
        chatId,
      })
      const chatUsersRes = (await ChatApi.getChatUsers(chatId)) as XMLHttpRequest
      if (chatUsersRes.status !== 200) {
        return
      }

      this.setProps({
        users: chatUsersRes.response,
      })
      console.log(chatUsersRes)
    })
    super('div', {
      ...props,
      events: {
        click: (e: Event) => {
          const target = e.target as HTMLElement
          const dropdown = document.getElementById('chats__more-dropdown-wrapper')
          if (!target.closest('#show-more-actions-btn') || !dropdown) {
            return
          }
          dropdown.classList.toggle('active')
        },
      },
    })
  }

  render() {
    return this.compile(ChatBodyTmpl, this.props)
  }
}
