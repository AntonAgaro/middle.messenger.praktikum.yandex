export default `
<a class="routerLink {{ className }}" data-route="{{ path }}" data-router-link>
    {{ text }}
    {{#if withIcon }}
        <img class="routerLink__icon" src="/icons/right.svg" alt="right">
    {{/if}}
</a>

`
