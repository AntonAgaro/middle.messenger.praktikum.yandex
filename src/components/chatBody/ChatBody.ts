import Component from '../../classes/Component'
import { Props } from '../../types/Props'
import ChatBodyTmpl from './chatBody.tmpl'
import { StoreEvent } from '../../enums/StoreEvents'
import Store from '../../classes/Store'
import { ChatApi } from '../../api/chat.api'
import Button from '../button/Button'
import Validator from '../../classes/Validator'
import Input from '../input/Input'
import InputGroup from '../inputGroup/InputGroup'
import WSS from '../../classes/WSS'
import { TUser } from '../../types/TUser'

export default class ChatBody extends Component {
  constructor(props: Props) {
    let socket: WSS
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

      const chatTokenRes = (await ChatApi.getChatToken(chatId)) as XMLHttpRequest
      const chatToken = chatTokenRes.response.token
      if (socket) {
        socket.closeConnection()
      }
      socket = new WSS((Store.getState().user as TUser).id, chatId, chatToken)
    })

    let messageInputGroup: Component
    const messageInput = new Input({
      attrs: {
        required: true,
        class: 'input chats-input',
        name: 'message',
        type: 'text',
        value: '',
        id: 'message',
      },
      events: {
        blur() {
          Validator.validate(messageInput, Validator.checkIsNotEmpty, messageInputGroup)
        },
      },
    })
    messageInputGroup = new InputGroup({
      input: messageInput,
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
      messageInput: messageInputGroup,
      messageButton: new Button({
        text: '',
        withIcon: true,
        attrs: {
          class: 'button round',
          type: 'submit',
        },
        events: {
          click: (e: Event) => {
            e.preventDefault()
            const target = e.target as HTMLElement
            const form = target.closest('form')
            const isMessageInputValid = Validator.validate(messageInput, Validator.checkIsNotEmpty, messageInputGroup)
            if (!form || !isMessageInputValid) {
              return
            }
            const formData = new FormData(form)
            for (const [name, value] of formData) {
              console.log(`${name} = ${value}`)
            }
          },
        },
      }),
    })
  }

  render() {
    return this.compile(ChatBodyTmpl, this.props)
  }
}
