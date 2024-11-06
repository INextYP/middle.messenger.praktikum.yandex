export const template = `
{{#> modal }}
    {{#> form key="form" extraClass="modalForm" }}
            {{{ Input key="add_user_input" type="text" name="name" id="login" label="Id пользователя" placeholder="Введите id пользователя" }}}
            {{{ Button type="submit" content="Добавить пользователя в чат" }}}
    {{/form }}
    <button key="close_button" class="modal-close-button">&times;</button>
{{/modal }}
`
