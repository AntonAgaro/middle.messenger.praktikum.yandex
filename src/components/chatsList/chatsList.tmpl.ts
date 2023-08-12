export default `
{{#each chats }}
{{ ../active }}
<li class="chat-preview {{#if active }}active{{/if}}" data-chat-id="{{ id }}">
    <div class="chat-preview__left">
        <div class="chat-preview__user-img">
            {{#if avatar }}
                <img src="{{avatar}}" alt="chat-avatar">
            {{/if}}
        </div>
        <div class="chat-preview__left-text">
            <div class="chat-preview__user-name">{{ title }}</div>
        </div>
    </div>
    <div class="chat-preview__right">
        <div class="chat-preview__time">10:49</div>
        {{#if unread_count}}
            <div class="chat-preview__indicator">
                {{ unread_count }}
            </div>
        {{/if}}
    </div>
</li>
{{/each}}
`
