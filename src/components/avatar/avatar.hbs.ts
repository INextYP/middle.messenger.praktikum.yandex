export const template = `<div key="overlay" class="overlay {{#if place}}overlay_place_chat{{/if}}">
    <img class="avatar {{#if place}}avatar_place_chat{{/if}}" src="{{#if src}}https://ya-praktikum.tech/api/v2/resources{{src}}{{else}}https://i.pravatar.cc/100{{/if}}" alt="{{alt}}" />
</div>
`