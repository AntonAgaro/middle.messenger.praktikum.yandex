export default `<div class="input-group">
    <span class="error">{{error}}</span>
    {{{ input }}}
    {{#unless noLabel}}
        <label class="label" for="{{ name }}">
            {{#if withIcon }}
                <img class="label__icon" src="/icons/search.svg" alt="search">
            {{/if}}
            <span class="label__text">{{ label }}</span>
        </label>
    {{/unless}}
</div>`
