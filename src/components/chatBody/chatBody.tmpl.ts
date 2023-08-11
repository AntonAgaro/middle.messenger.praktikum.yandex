export default `
    <div class="chats__body-header">
        <div class="chat-user"></div>
    <div class="chats__more-dropdown">
        <div class="show-more-actions-btn" id="show-more-actions-btn">
            <img src="/icons/more.svg" alt="more">
        </div>
        <div class="chats__more-dropdown-wrapper" id="chats__more-dropdown-wrapper">
            {{{ addUserToChatBtn }}}
            {{{ removeUserToChatBtn }}}
        </div>
    </div>
    
    </div>
    <div class="chats__body-messages">
        <div class="chats__message chats__message--from">
            Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
    
            Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
        </div>
        <div class="chats__message chats__message--to">
        Привет! 
        </div>
    </div>
    
    <form class="chats__body-messages-inputs">
        {{{ messageInput }}}
        {{{ messageButton }}}
    </form>
`
