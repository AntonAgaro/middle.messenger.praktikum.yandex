import '@/scss/app.scss'
import Handlebars from 'handlebars/runtime'
import renderLoginPage from '@/pages/Login'
// Handlebars.registerPartial('form', form)
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app')

  root.innerHTML = renderLoginPage()
})
