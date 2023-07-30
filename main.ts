import '@/scss/app.scss'
import HandleBars from 'handlebars'
import Router from './src/utils/Router'
import routes from './src/utils/routes'
import { Props } from './src/types/Props'

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
  new Router(root, routes)
})
