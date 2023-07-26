import ErrorPage from '../ErrorPage'
import RouterLink from '../../../components/routerLink/RouterLink'
import { render } from '../../../utils/functions'

export default function render500Page() {
  const errorPage = new ErrorPage({
    title: '500',
    subtitle: 'Мы уже фиксим',
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
