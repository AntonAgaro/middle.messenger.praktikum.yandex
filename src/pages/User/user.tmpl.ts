export default `
    {{{toChatsLink}}}
    <div class="user__container">
        <div class="user__logo">
            {{#if userLogo}}
                <img src="{{userLogo}}" alt="logo">
            {{/if}}
        </div>
        <h1 class="user__name">{{ userName }}</h1>

            {{{ userDetails }}}

        <ul class="user__btns">
           {{{ changeDataBtn }}}
           {{{ changePassBtn }}}
           {{{ logoutBtn }}}
           {{{ saveDataBtn }}}
        </ul>
    </div>
`
