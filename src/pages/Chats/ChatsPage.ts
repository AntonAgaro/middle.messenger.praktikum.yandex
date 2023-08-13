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
import { Routes } from '../../enums/Routes'

export default class ChatsPage extends Component {
  constructor(props: Props) {
    let modalInputGroup: Component
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
          })
          chatsModal.setProps({
            events: {
              submit: async (e: Event) => {
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
            })
            chatsModal.setProps({
              events: {
                submit: async (e: Event) => {
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
            })
            chatsModal.setProps({
              events: {
                submit: async (e: Event) => {
                  await ChatPageController.deleteUserFromChat(e, modalInput, modalInputGroup, chatsModal)
                },
              },
            })
            chatsModal.show()
          },
        },
      }),
      deleteChatBtn: new Button({
        text: 'Удалить чат',
        attrs: {
          class: 'button',
          type: 'button',
        },
        events: {
          click: async () => {
            await ChatPageController.deleteChat()
          },
        },
      }),
    })

    super('main', {
      ...props,
      modal: chatsModal,
      linkToProfile: new RouterLink({
        path: Routes.User,
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
