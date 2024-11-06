export const template = `<div key="chat" class="message {{#if mainMessage}}message_type_main{{/if}}">
    {{{Avatar place="chat" src=avatar alt=name }}}
    <p class="message-user-name">{{name}}</p>
    <p class="message-text">{{message}}</p>
    {{#if date}}<p class="message-date">{{date}}</p>{{/if}}
    {{#if notificationCount}}<button class="message-notification-count">{{notificationCount}}</button>{{/if}}
</div>`
