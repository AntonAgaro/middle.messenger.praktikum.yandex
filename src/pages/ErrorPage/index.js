import errorPageTmpl from './error.hbs'
import routerLinkTmpl from '@components/routerLink/routerLink.hbs'
import './errorPage.scss'

export default function renderErrorPage(status) {
  const pageTypes = {
    404: {
      title: '404',
      subtitle: 'Не туда попали',
    },
    500: {
      title: '500',
      subtitle: 'Мы уже фиксим',
    },
  }

  const link = routerLinkTmpl({ path: '#', text: 'Назад к чатам' })

  return errorPageTmpl({ ...pageTypes[status], link })
}
