import EventBus from './EventBus'
import { WSSEvents } from '../enums/WSSEvents'

interface WssEvent extends Event {
  message?: string
}
export default class WSS extends EventBus {
  public socket: WebSocket

  private userId: string | number

  private chatId: string | number

  private token: string

  private interval: NodeJS.Timer

  constructor(userId: string | number, chatId: string | number, token: string) {
    super()
    this.userId = userId
    this.chatId = chatId
    this.token = token
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}`)

    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено')

      this.socket.send(
        JSON.stringify({
          content: 'Моё первое сообщение миру!',
          type: 'message',
        }),
      )
      this.getOldMessages()
    })

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто')
      } else {
        console.log('Обрыв соединения')
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`)
    })

    this.socket.addEventListener('message', (message) => {
      try {
        const data = JSON.parse(message.data)
        if (Array.isArray(data)) {
          this.emit(WSSEvents.OldMessages, data)
          return
        }
        if (['pong', 'user connected'].includes(data.type)) {
          return
        }
        this.emit(WSSEvents.Message, data)
      } catch (e) {
        console.log(e)
      }
      // console.log('Получены данные', message.data)
    })

    this.socket.addEventListener('error', (event) => {
      console.log('Ошибка', (event as WssEvent).message)
    })

    this.interval = setInterval(() => {
      this.socket.send(
        JSON.stringify({
          content: '',
          type: 'ping',
        }),
      )
    }, 60000)
  }

  public closeConnection() {
    this.socket.close()
    clearInterval(this.interval)
  }

  public getOldMessages() {
    this.socket.send(
      JSON.stringify({
        content: '0',
        type: 'get old',
      }),
    )
  }

  public sendMessage(message: string) {
    this.socket.send(
      JSON.stringify({
        content: message,
        type: 'message',
      }),
    )
  }
}
