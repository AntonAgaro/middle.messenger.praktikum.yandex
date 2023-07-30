import ChatsPage from './ChatsPage'
import RouterLink from '../../components/routerLink/RouterLink'
import ChartPreview from '../../components/chatPreview/ChartPreview'
import { render } from '../../utils/functions'
import Input from '../../components/input/Input'
import InputGroup from '../../components/inputGroup/InputGroup'
import Component from '../../classes/Component'
import Button from '../../components/button/Button'
import Validator from '../../classes/Validator'

export default function renderChatsPage() {
  const chatLists = []
  for (let i = 0; i < 10; i++) {
    chatLists.push(
      new ChartPreview({
        unreadMessages: 2,
        events: {
          click: () => {
            console.log('1')
          },
        },
      }),
    )
  }
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
  const chatsPage = new ChatsPage({
    linkToProfile: new RouterLink({
      path: '/user',
      text: 'В профиль',
      withIcon: true,
    }),
    searchInput: new InputGroup({
      input: new Input({
        attrs: {
          required: true,
          class: 'input chats-input',
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
    chatsList: chatLists,
    messageInput: messageInputGroup,
    attrs: {
      class: 'chats',
    },
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

  render('#app', chatsPage)
}
