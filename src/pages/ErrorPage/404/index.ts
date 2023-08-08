import ErrorPage from '../ErrorPage'
import { render } from '../../../utils/functions'

export default function render404Page() {
  const errorPage = new ErrorPage({
    title: '404',
    subtitle: 'Не туда попали',
  })

  render('#app', errorPage)
}
