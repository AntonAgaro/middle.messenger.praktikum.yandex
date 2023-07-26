import renderLoginPage from '@/pages/Login'
// import renderSignUp from '@/pages/SignUp'
// import renderChatPage from '@/pages/Chats'
// import renderUserPage from '@/pages/User'
// import renderErrorPage from '@/pages/ErrorPage'
import { Routes } from '../types/Router'
import renderSignUp from '../pages/SignUp'
import renderUserPage from '../pages/User'
import render404Page from '../pages/ErrorPage/404'
import render500Page from '../pages/ErrorPage/500'

const routes: Routes = {
  '/': {
    renderFunc: renderLoginPage,
  },
  '/login': {
    renderFunc: renderLoginPage,
  },
  '/signup': {
    renderFunc: renderSignUp,
  },
  // '/chats': {
  //   renderFunc: renderChatPage,
  // },
  '/user': {
    renderFunc: renderUserPage,
  },
  '/404': {
    renderFunc: render404Page,
  },
  '/500': {
    renderFunc: render500Page,
  },
}

export default routes
