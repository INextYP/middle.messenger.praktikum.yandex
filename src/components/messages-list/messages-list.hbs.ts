export const template = `<ul class="messageList">
    {{#each messages }}
        {{{ ChatMessage userId=user_id content=content time=time }}}
    {{/each}}
</ul>`