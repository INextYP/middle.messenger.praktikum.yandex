export const template = `
    <button key="button" type="{{#if type}}{{type}}{{else}}button{{/if}}" class="button {{#if fullWidth}}button_type_fullWidth{{/if}}" to="{{to}}">
    {{content}}
</button>
`
