interface WssEvent extends Event {
  message?: string
}
export default class WSS {
  public socket: WebSocket

  private userId: string | number

  private chatId: string | number

  private token: string

  private interval: NodeJS.Timer

  constructor(userId: string | number, chatId: string | number, token: string) {
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
    })

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто')
      } else {
        console.log('Обрыв соединения')
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`)
    })

    this.socket.addEventListener('message', (event) => {
      console.log('Получены данные', event.data)
    })

    this.socket.addEventListener('error', (event) => {
      console.log('Ошибка', (event as WssEvent).message)
    })

    this.interval = setInterval(() => {
      this.socket.send(
        JSON.stringify({
          content: '',
          type: 'message',
        }),
      )
    }, 5000)
  }

  public closeConnection() {
    this.socket.close()
    clearInterval(this.interval)
  }
}
