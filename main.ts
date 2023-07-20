import '@/scss/app.scss'
import Router from '@/utils/Router.js'
import routes from '@/utils/routes'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app')
  if (!root) {
    return
  }
  new Router(root, routes)
})
