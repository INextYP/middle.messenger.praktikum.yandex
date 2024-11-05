export const template = `{{#> modal }}
    {{#> form key="form" extraClass="modalForm" }}
        {{{ Input key="input" type="text" name="name" id="first_name" label="Название чата" placeholder="Введите название чата" onValidate=onValidate.first_name }}}
        {{{ Button type="submit" content="Сохранить" }}}
    {{/form }}
    <button key="close_button" class="modal-close-button">&times;</button>
{{/modal }}`
