import { Routes } from '../types/Router'
import renderSignUp from '../pages/SignUp'
import renderUserPage from '../pages/User'
import render404Page from '../pages/ErrorPage/404'
import render500Page from '../pages/ErrorPage/500'
import renderLoginPage from '../pages/Login'
import renderChatsPage from '../pages/Chats'

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
  '/chats': {
    renderFunc: renderChatsPage,
  },
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
