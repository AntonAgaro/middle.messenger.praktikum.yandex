export default `
<form class="form">
<h1 class="form__title">{{title}}</h1>
    <div class="form__inputs">
        {{{ loginInput }}}
        {{{ passInput }}}
    </div>
    <div class="form__buttons">
        {{{ authBtn }}}
        {{{ toRegLink }}}
    </div>
</form>
`
