import ErrorPage from '../ErrorPage'
import { render } from '../../../utils/functions'

export default function render500Page() {
  const errorPage = new ErrorPage({
    title: '500',
    subtitle: 'Мы уже фиксим',
  })

  render('#app', errorPage)
}
