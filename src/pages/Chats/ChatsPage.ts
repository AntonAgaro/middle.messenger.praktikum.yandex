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
import Modal from '../../components/modal/Modal'
import ChatBody from '../../components/chatBody/ChatBody'
import ChatPageController from './ChatPageController'

export default class ChatsPage extends Component {
  constructor(props: Props) {
    let modalInputGroup: Component
    // const { user } = Store.getState()
    // Получаем чаты юзера
    ChatPageController.getUserChats()

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
      label: 'Название чата',
      input: modalInput,
    })

    const modalBtn = new Button({
      text: 'Добавить чат',
      attrs: {
        class: 'button',
        type: 'submit',
      },
    })

    const chatsModal = new Modal({
      attrs: {
        class: 'modal-bg',
      },
      title: 'Добавить чат',
      input: modalInputGroup,
      button: modalBtn,
    })

    const addChatBtn = new Button({
      text: 'Добавить чат',
      attrs: {
        class: 'button xs',
        type: 'button',
      },
      events: {
        click: () => {
          chatsModal.setProps({
            title: 'Добавить чат',
          })
          modalInput.setProps({
            attrs: {
              name: 'title',
            },
          })
          modalInputGroup.setProps({
            label: 'Название чата',
            error: '',
          })
          modalBtn.setProps({
            text: 'Добавить чат',
            events: {
              click: async (e: Event) => {
                await ChatPageController.createChat(e, modalInput, modalInputGroup, chatsModal)
              },
            },
          })
          chatsModal.show()
        },
      },
    })

    const chatsList = new ChatsList({
      attrs: {
        class: 'chats__list-container',
      },
      chats: Store.getState().chats,
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
      chatId: Store.getState().activeChatId,
      addUserToChatBtn: new Button({
        text: 'Добавить пользователя',
        attrs: {
          class: 'button',
          type: 'submit',
        },
        events: {
          click: () => {
            chatsModal.setProps({
              title: 'Добавить пользователя',
            })
            modalInput.setProps({
              attrs: {
                name: 'login',
              },
            })
            modalInputGroup.setProps({
              label: 'Логин',
              error: '',
            })
            modalBtn.setProps({
              text: 'Добавить пользователя',
              events: {
                click: async (e: Event) => {
                  await ChatPageController.addUserToChat(e, modalInput, modalInputGroup, chatsModal)
                },
              },
            })
            chatsModal.show()
          },
        },
      }),
      removeUserToChatBtn: new Button({
        text: 'Удалить пользователя',
        attrs: {
          class: 'button',
          type: 'submit',
        },
        events: {
          click: () => {
            chatsModal.setProps({
              title: 'Удалить пользователя из чата',
            })
            modalInput.setProps({
              attrs: {
                name: 'login',
              },
            })
            modalInputGroup.setProps({
              label: 'Логин',
              error: '',
            })
            modalBtn.setProps({
              text: 'Удалить пользователя',
              events: {
                click: async (e: Event) => {
                  await ChatPageController.deleteUserFromChat(e, modalInput, modalInputGroup, chatsModal)
                },
              },
            })
            chatsModal.show()
          },
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
  }

  render() {
    return this.compile(chatsPageTmpl, this.props)
  }
}
