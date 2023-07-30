import ErrorPage from '../ErrorPage'
import RouterLink from '../../../components/routerLink/RouterLink'
import { render } from '../../../utils/functions'

export default function render404Page() {
  const errorPage = new ErrorPage({
    title: '404',
    subtitle: 'Не туда попали',
    attrs: {
      class: 'main',
    },
    link: new RouterLink({
      path: '/chats',
      text: 'К чатам',
    }),
  })

  render('#app', errorPage)
}
