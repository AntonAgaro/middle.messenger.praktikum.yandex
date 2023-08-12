import Component from '../../classes/Component'
import type { Props } from '../../types/Props'
import chatsListTmpl from './chatsList.tmpl'
import './chatsList.scss'
import Store from '../../classes/Store'
import { StoreEvent } from '../../enums/StoreEvents'

export default class ChatsList extends Component {
  constructor(props: Props) {
    Store.on(StoreEvent.Updated, () => {
      const chats = Store.getState().chats ?? []
      const activeChat = Store.getState().activeChatId ?? 0
      chats.forEach((chat) => {
        if (chat.id === +activeChat) {
          chat.active = true
        } else {
          delete chat.active
        }
      })
      this.setProps({
        chats,
      })
      document.querySelectorAll('.chat-preview').forEach((el) => {
        const elId = el.getAttribute('data-chat-id')
        if (elId && +elId === (Store.getState().activeChatId as number)) {
          el.classList.add('active')
        }
      })
    })
    // if (Store.getState().chats && (Store.getState().chats as TChat[]).length > 0 && !Store.getState().activeChatId) {
    //   console.log('eqwq')
    //   Store.set('activeChatId', (Store.getState().chats as TChat[])[0])
    // }
    super('ul', {
      ...props,
      events: {
        click: (e: Event) => {
          const target = e.target as HTMLElement
          const chatPreview = target.closest('.chat-preview')
          if (!chatPreview) {
            return
          }
          Store.set('activeChatId', chatPreview.getAttribute('data-chat-id'))
          console.log(Store.getState())
        },
      },
    })
  }

  render() {
    return this.compile(chatsListTmpl, this.props)
  }
}
