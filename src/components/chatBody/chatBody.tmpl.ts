export default `
{{#if chatId}}
    <div class="chats__body-header">
    <div class="chat__users">
        {{#each users}}
            <div class="chat__user">
                {{#if avatar}}
                <img src="https://ya-praktikum.tech/api/v2/resources/{{avatar}}" alt="avatar">
                {{/if}}
                {{#if display_name}}
                <div class="chat__user__name">{{ display_name }}</div>
                {{ else }}
                <div class="chat__user__name">{{ first_name }}</div>
                {{/if}}
               
            </div>
        {{/each}}
    </div>
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
     
            {{#each messages}}
                <div class="chats__message {{#if className}}chats__message--from{{else}}chats__message--to{{/if}}">
                <div class="chats__message-text">
                    {{content}}
                </div>
                 <div class="chats__message-date">
                    {{ time }} 
                </div>   
                </div>
            {{/each}}
        
    
    <form class="chats__body-messages-inputs">
        {{{ messageInput }}}
        {{{ messageButton }}}
    </form>
{{/if}}    
`
