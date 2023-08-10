export default `
    {{{toChatsLink}}}
    <form class="user__container">
        <div class="user__logo">
            {{#if userLogo}}
                <img src="{{userLogo}}" alt="logo">
            {{/if}}
        </div>
        <h1 class="user__name">{{ userName }}</h1>

        {{#ifEquals isPassEditing "off"}}
            {{{ userDetails }}}
        {{/ifEquals}}
        
        {{#ifEquals isPassEditing "on"}}
            {{{ oldPassInput }}}
            {{{ newPassInput }}}
            {{{ repeatNewPassInput }}}
            {{{ saveNewPassBtn }}}
        {{/ifEquals}}

        <ul class="user__btns">
        {{#ifEquals isPassEditing "off"}}
            {{#ifEquals isEditing "off"}}
               {{{ changeDataBtn }}}
               {{{ changePassBtn }}}
               {{{ logoutBtn }}}
            {{/ifEquals}}
            
            {{#ifEquals isEditing "on"}}
               {{{ saveDataBtn }}}
           {{/ifEquals}}
        {{/ifEquals}}
        
        </ul>
    </form>
`
