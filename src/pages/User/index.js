import UserTmpl from './User.hbs'
import userDetailTmpl from '@components/user/userDetail.hbs'
import buttonTmpl from '@components/button/button.hbs'
import routerLinkTmpl from '@components/routerLink/routerLink.hbs'
import inputTmpl from '@components/input/input.hbs'
import './user.scss'
import { render } from '@/utils/functions.js'

export default function renderUserPage(userData, isEditing) {
  const { userLogo, userName, userDetails } = userData
  const toChatsLink = render(routerLinkTmpl, { path: '/chats', text: 'К чатам', className: 'user__back-link' })
  let userDetailsContent = ''
  const inputClassName = isEditing ? '' : 'disable'
  userDetails.forEach((detail) => {
    userDetailsContent += render(userDetailTmpl, {
      title: detail.title,
      value: render(inputTmpl, {
        name: detail.title,
        type: 'text',
        noLabel: true,
        className: inputClassName,
        value: detail.value,
      }),
    })
  })

  let userButtons = ''
  if (isEditing) {
    userButtons = render(buttonTmpl, { text: 'Сохранить', className: 'align-center' })
  } else {
    const btnsText = ['Изменить данные', 'Изменить пароль', 'Выйти']
    btnsText.forEach((text, idx) => {
      const className = idx === 2 ? 'no-bg red' : 'no-bg'
      userButtons += render(buttonTmpl, { text, className })
    })
  }

  return render(UserTmpl, {
    toChatsLink,
    userLogo,
    userName,
    userDetails: userDetailsContent,
    userButtons,
  })
}
