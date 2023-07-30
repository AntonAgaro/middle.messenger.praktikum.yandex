export default `
<div class="chat-preview">
    <div class="chat-preview__left">
        <div class="chat-preview__user-img">
            {{#if userImg }}
                <img src="{{userImg}}" alt="user-avatar">
            {{/if}}
        </div>
        <div class="chat-preview__left-text">
            <div class="chat-preview__user-name">Андрей</div>
            <div class="chat-preview__message">И Human Interface Guidelines и Material Design рекомендуют  Human Interface Guidelines и Material Design рекомендуют  Human Interface Guidelines и Material Design рекомендуют</div>
        </div>
    </div>
    <div class="chat-preview__right">
        <div class="chat-preview__time">10:49</div>
        {{#if unreadMessages}}
            <div class="chat-preview__indicator">
                {{ unreadMessages }}
            </div>
        {{/if}}
    </div>
</div>
`
