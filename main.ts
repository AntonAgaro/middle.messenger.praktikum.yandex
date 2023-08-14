import '@/scss/app.scss'
import HandleBars from 'handlebars'
import { Props } from './src/types/Props'
import RouterClass from './src/classes/Router/Router'
import Store from './src/classes/Store'
import { StoreEvent } from './src/enums/StoreEvents'

HandleBars.registerHelper('ifEquals', function (this: Props, a, b, options) {
  if (a === b) {
    return options.fn(this)
  }
  return options.inverse(this)
})
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app')
  if (!root) {
    return
  }

  Store.on(StoreEvent.Updated, () => {})

  RouterClass.start()

  document.addEventListener('click', (e: Event) => {
    e.stopPropagation()
    const target = e.target as HTMLElement
    if (target.matches('.modal-bg')) {
      target.style.display = 'none'
    }
  })
})
