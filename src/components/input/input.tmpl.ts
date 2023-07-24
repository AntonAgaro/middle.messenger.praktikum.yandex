export default `<div class="input-group">
    <input class="input {{ className }}" id="{{ name }}" name="{{ name }}" type="{{ type }}" value="{{value}}" required>
    {{#unless noLabel}}
        <label class="label" for="{{ name }}">
            {{#if withIcon }}
                <img class="label__icon" src="/icons/search.svg" alt="search">
            {{/if}}
            <span class="label__text">{{ label }}</span>
        </label>
    {{/unless}}
</div>`
