import Component from '../../classes/Component'
import type { Props } from '../../types/Props'
import chatsPageTmpl from './chatsPage.tmpl'
import './chats.scss'
import ChatPreview from '../../components/chatPreview/ChatPreview'
import Input from '../../components/input/Input'
import Validator from '../../classes/Validator'
import InputGroup from '../../components/inputGroup/InputGroup'
import RouterLink from '../../components/routerLink/RouterLink'
import Button from '../../components/button/Button'
import Store from '../../classes/Store'
import { ChatApi } from '../../api/chat.api'
import Modal from '../../components/modal/Modal'

export default class ChatsPage extends Component {
  constructor(props: Props) {
    let chatsModal: Component
    let modalInputGroup: Component
    // const { user } = Store.getState()
    // Получаем чаты юзера
    ChatApi.getUserChats().then((res) => {
      const result = res as XMLHttpRequest
      if (result.status === 200) {
        Store.set('chats', result.response)
      }
    })
    console.log(Store.getState())

    const addChatBtn = new Button({
      text: 'Добавить чат',
      attrs: {
        class: 'button xs',
        type: 'button',
      },
      events: {
        click: () => {
          chatsModal.show()
        },
      },
    })

    const modalInput = new Input({
      className: 'input',
      attrs: {
        class: 'input',
        name: 'title',
        type: 'title',
        id: 'title',
        required: true,
      },
      events: {
        blur: () => {
          Validator.validate(modalInput, Validator.checkIsNotEmpty, modalInputGroup)
        },
      },
    })

    modalInputGroup = new InputGroup({
      input: modalInput,
    })

    const modalBtn = new Button({
      text: 'Добавить чат',
      attrs: {
        class: 'button',
        type: 'submit',
      },
    })

    chatsModal = new Modal({
      attrs: {
        class: 'modal-bg',
      },
      title: 'Добавить чат',
      input: modalInputGroup,
      button: modalBtn,
    })
    const chatLists = []
    for (let i = 0; i < 10; i++) {
      chatLists.push(
        new ChatPreview({
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

    super('main', {
      ...props,
      modal: chatsModal,
      linkToProfile: new RouterLink({
        path: '/user',
        text: 'В профиль',
        withIcon: true,
      }),
      addChatBtn,
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
  }

  render() {
    return this.compile(chatsPageTmpl, this.props)
  }
}
