import '@/scss/app.scss'
import Handlebars from 'handlebars/runtime'
import renderLoginPage from '@/pages/Login'
import renderSignUp from '@/pages/SignUp/index.js'
// Handlebars.registerPartial('form', form)
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app')

  // root.innerHTML = renderLoginPage()
  root.innerHTML = renderSignUp()
})
