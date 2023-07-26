export default `
<form class="form">
<h1 class="form__title">{{title}}</h1>
    <div class="form__inputs">
        {{{emailInput}}}
        {{{loginInput}}}
        {{{nameInput}}}
        {{{surnameInput}}}
        {{{phoneInput}}}
        {{{ passInput }}}
        {{{ repeatPassInput }}}
    </div>
    <div class="form__buttons">
        {{{ authBtn }}}
        {{{ toLoginLink }}}
    </div>
</form>
`
