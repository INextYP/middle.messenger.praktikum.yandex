export const template = `<div class="input-container">
    <label for="{{id}}" class="input-label {{#if variant}}input-label_type_{{variant}}{{/if}}">{{label}}</label>
    <input value="{{value}}" key="input" type="{{type}}" id="{{id}}" class="input-field {{#if variant}}input-field_type_{{variant}}{{/if}} {{#if errorText}}input-field-error{{/if}}" name="{{name}}" placeholder="{{placeholder}}" {{#if readonly}}readonly="{{readonly}}"{{/if}} />
    {{{ ErrorText key="errorText" errorText=errorText }}}
</div>`
