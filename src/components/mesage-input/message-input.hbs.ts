export const template = `<div class="chat-input-container">
    <label for="message">
        <input key="messageInput" type="text" class="chat-input-field" id="message" name="message"/>
    </label>
    {{{ ErrorText key="errorText" errorText=errorText }}}
</div>`
