import '@/scss/app.scss'
import Router from '@/utils/Router.js'
import routes from '@/utils/routes'
import Button from './src/components/button/Button'
import { render } from './src/utils/functions'

document.addEventListener('DOMContentLoaded', () => {
  // const root = document.getElementById('app')
  // if (!root) {
  //   return
  // }
  // new Router(root, routes)
  const button = new Button({
    attrs: {
      class: 'button',
    },
    text: 'button',
    events: {
      click: (e) => {
        console.log(e.target)
      },
    },
  })

  render('#app', button)
})
