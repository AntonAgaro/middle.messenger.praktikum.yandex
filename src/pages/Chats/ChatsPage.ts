import Component from '../../classes/Component'
import type { Props } from '../../types/Props'
import chatsPageTmpl from './chatsPage.tmpl'
import './chats.scss'
import ChatsList from '../../components/chatsList/ChatsList'
import Input from '../../components/input/Input'
import Validator from '../../classes/Validator'
import InputGroup from '../../components/inputGroup/InputGroup'
import RouterLink from '../../components/routerLink/RouterLink'
import Button from '../../components/button/Button'
import Store from '../../classes/Store'
import { ChatApi } from '../../api/chat.api'
import Modal from '../../components/modal/Modal'
import { getUserChats } from './chatPageUtils'
import { StoreEvent } from '../../enums/StoreEvents'
import ChatBody from '../../components/chatBody/ChatBody'

export default class ChatsPage extends Component {
  constructor(props: Props) {
    let chatsModal: Component
    let modalInputGroup: Component
    // const { user } = Store.getState()
    // Получаем чаты юзера
    getUserChats()

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
      events: {
        click: async (e: Event) => {
          e.preventDefault()
          const target = e.target as HTMLElement
          const form = target.closest('form')
          const isModalInputValid = Validator.validate(modalInput, Validator.checkIsNotEmpty, modalInputGroup)
          if (!form || !isModalInputValid) {
            return
          }
          const formData = new FormData(form)
          const data = Object.fromEntries(formData)
          const createChatRes = (await ChatApi.create(data)) as XMLHttpRequest
          if (createChatRes.status !== 200) {
            chatsModal.setProps({
              serverError: createChatRes.response.reason,
            })
            return
          }
          chatsModal.hide()
          getUserChats()
        },
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

    const chatsList = new ChatsList({
      attrs: {
        class: 'chats__list-container',
      },
      chats: Store.getState().chats,
      events: {
        click: (e: Event) => {
          const target = e.target as HTMLElement
          const chatPreview = target.closest('.chat-preview')
          if (!chatPreview) {
            return
          }
          document.querySelectorAll('.chat-preview').forEach((el) => el.classList.remove('active'))
          chatPreview.classList.add('active')
        },
      },
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

    const chatBody = new ChatBody({
      attrs: {
        class: 'chats__body',
      },
      addUserToChatBtn: new Button({
        text: 'Добавить пользователя',
        attrs: {
          class: 'button',
          type: 'submit',
        },
      }),
      removeUserToChatBtn: new Button({
        text: 'Удалить пользователя',
        attrs: {
          class: 'button',
          type: 'submit',
        },
      }),
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
      chatsList,
      chatBody,
      attrs: {
        class: 'chats',
      },
    })

    Store.on(StoreEvent.Updated, () => {
      chatsList.setProps({
        chats: Store.getState().chats,
      })
    })
  }

  render() {
    return this.compile(chatsPageTmpl, this.props)
  }
}
