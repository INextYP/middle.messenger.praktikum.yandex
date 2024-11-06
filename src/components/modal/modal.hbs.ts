export const template = `{{#> modal }}
    {{#> form key="form" extraClass="modalForm" }}
        <input key="file_input" type='file' name='filename'/>
        {{{ ErrorText key="errorText" errorText=errorText }}}
        {{{ Button type="submit" content="Сохранить" }}}
    {{/form }}
    <button key="close_button" class="modal-close-button">&times;</button>
{{/modal }}
`
