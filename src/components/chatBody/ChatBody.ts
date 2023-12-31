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
import { WSSEvents } from '../../enums/WSSEvents'
import ChatPageController from '../../pages/Chats/ChatPageController'
import { TMessage } from '../../types/TMessage'
import Form from '../form/Form'

export default class ChatBody extends Component {
  constructor(props: Props) {
    let socket: WSS
    let messages: TMessage[] = []
    Store.on(StoreEvent.Updated, async () => {
      try {
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
        socket.on(WSSEvents.OldMessages, (data) => {
          messages = this.handleMessages([[], ...data.reverse()])
          this.setProps({
            messages,
          })
        })
        socket.on(WSSEvents.Message, (data) => {
          messages.push(data)
          this.setProps({
            messages: this.handleMessages(messages),
          })
        })
      } catch (error) {
        console.log(error)
      }
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

    const messageButton = new Button({
      text: '',
      withIcon: true,
      attrs: {
        class: 'button round',
        type: 'submit',
      },
    })

    const sendMessageForm = new Form({
      inputs: messageInputGroup,
      buttons: messageButton,
      attrs: {
        class: 'chats__body-messages-inputs',
      },
      events: {
        submit: (e: Event) => {
          const data = ChatPageController.handleFormData(e, messageInput, messageInputGroup)
          if (!Object.keys(data).length) {
            return
          }
          socket.sendMessage(data.message as string)
        },
      },
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
      messages,
      sendMessageForm,
    })
  }

  render() {
    return this.compile(ChatBodyTmpl, this.props)
  }

  private handleMessages(messages: TMessage[]): TMessage[] {
    if (!messages.length) {
      return messages
    }
    return messages.map((message) => {
      if (message.time) {
        message.time = new Date(message.time).toLocaleString()
      }
      if (message.user_id === (Store.getState().user as TUser).id) {
        message.className = 'current-user'
      }
      return message
    })
  }
}
