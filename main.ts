import '@/scss/app.scss'
import Router from './src/utils/Router'
import routes from './src/utils/routes'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app')
  if (!root) {
    return
  }
  new Router(root, routes)
})
