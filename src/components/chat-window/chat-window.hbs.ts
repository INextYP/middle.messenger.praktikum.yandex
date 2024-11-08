export const template = `<section class="chat-window">
    {{#if selectedChat }}
        <div class="chat-header">
            {{{Avatar onClick=onChangeAvatar src=selectedChat.avatar place="chat" alt=selectedChat.title}}}
            <p class="chat-user-name">{{selectedChat.title}}</p>

            {{{ Button content="Добавить пользователя" onClick=onOpenUserChatControlModal }}}
            {{{ Button content="Удалить пользователя" onClick=onOpenDeleteChatModal }}}
        </div>
        {{{ MessagesList messages=messages }}}
        <div class="chat-footer">
            <button class="chat-file-loader"></button>
            {{{ MessageInput key="new_message_input" onValidate=onValidate.message }}}
            <button key="sendButton" class="chat-send-button"></button>
        </div>
    {{/if}}
    {{#if isOpenUserChatControlModal }}
        {{{ UserChatControlModal onClose=onCloseUserChatControlModal onAddUser=onAddUser onDeleteUser=onDeleteUser }}}
    {{/if}}
    {{#if isOpenDeleteChatModal }}
        {{{ DeleteUserChatModal onClose=onCloseDeleteChatModal onDeleteUser=onDeleteUser }}}
    {{/if}}
    {{#if isOpenChangeAvatarModal}}
        {{{ Modal onSubmit=onChangeAvatarSubmit title="Загрузите файл" }}}
    {{/if}}
</section>
`
