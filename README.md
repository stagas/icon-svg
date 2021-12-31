<h1 align="center">icon-svg</h1>

<p align="center">
memoized fetch svg icons from many popular icon sets with editor autocomplete and a custom html element ready to use
</p>

<p align="center">
   <a href="#install">        🔧 <strong>Install</strong></a>
 · <a href="#example">        🧩 <strong>Example</strong></a>
 · <a href="#api">            📜 <strong>API docs</strong></a>
 · <a href="https://github.com/stagas/icon-svg/releases"> 🔥 <strong>Releases</strong></a>
 · <a href="#contribute">     💪🏼 <strong>Contribute</strong></a>
 · <a href="https://github.com/stagas/icon-svg/issues">   🖐️ <strong>Help</strong></a>
</p>

***

## Install

```sh
$ npm i icon-svg
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

*   [IconSvgElement](#iconsvgelement)
*   [fetchIconSvg](#fetchiconsvg)
    *   [Parameters](#parameters)
*   [getIconUrl](#geticonurl)
    *   [Parameters](#parameters-1)

### IconSvgElement

[src/element.ts:67-96](https://github.com/stagas/icon-svg/blob/01ef1b233d0c94d322260ef72d8a559f1f467ed0/src/element.ts#L67-L96 "Source code on GitHub")

**Extends HTMLElement**

The `IconSvgElement` custom element.

For a more complete example with typings check `playground/app.tsx`

Browser needs to support `Constructible StyleSheets` ([polyfill](https://github.com/calebdwilliams/construct-style-sheets)).

*JS / TS:*

```ts
customElements.define('icon-svg', IconSvgElement)
```

*CSS:*

```css
icon-svg {
  width: 32px;
  height: 32px;
  stroke-width: 2.5px;
  --stroke: #fff;
  --fill: #028;
  --fill-secondary: #468;
}
```

*HTML:*

```html
<icon-svg set="boxicons" type="logos" icon="javascript"></icon-svg>
```

### fetchIconSvg

[src/fetch.ts:62-107](https://github.com/stagas/icon-svg/blob/01ef1b233d0c94d322260ef72d8a559f1f467ed0/src/fetch.ts#L62-L107 "Source code on GitHub")

Fetches an SVG icon.

The network request is memoized so when this is called multiple times
it will only access the network the first time (or the browser cache if there already).

It also attempts to normalize the SVG to make all the icons consistent and
usable out of the box without any adjustments, i.e it normalizes various values.

Use CSS variables `--stroke` `--fill` and `--fill-secondary` to manage
the colors if necessary.

When used with `strokeWidth` you can achieve fine-control on how it's being displayed.

Use the `raw` option to skip any post processing if you don't need it and simply get
the raw SVG data.

```ts
svg = await fetchIconSvg({ set: 'bytesize', icon: 'heart', strokeWidth: '2px' })
svg = await fetchIconSvg({ set: 'flags', icon: 'gr', kind: '4x3', raw: true })
svg = await fetchIconSvg({
  set: 'boxicons',
  icon: 'alarm',
  type: 'solid',
  strokeWidth: '' // passing `strokeWidth=''` allows it to be managed in CSS
})
```

#### Parameters

*   `props` **any**&#x20;

    *   `props.set`  Icon set
    *   `props.icon`  Icon name
    *   `props.type`  Icon type - Most of the time an entirely different set of icons
    *   `props.kind`  Icon kind - These are variations of the same icon
    *   `props.raw`  Get the raw SVG without any post processing
    *   `props.strokeWidth`  Normalize `stroke-width` to this value.
        This also applies `vector-effect="non-scaling-stroke"` which will make the
        `stroke-width` absolute and not relative to the size of the icon
        Use this option for more control over the icon's appearance.
        Because every dimension of the icon will need a different `stroke-width`
        this can be set to `''` (empty string) which then allows it to be handled with CSS.

Returns **any** The SVG data as a string

### getIconUrl

[src/index.ts:27-49](https://github.com/stagas/icon-svg/blob/01ef1b233d0c94d322260ef72d8a559f1f467ed0/src/index.ts#L27-L49 "Source code on GitHub")

Gets the SVG CDN url of an icon.

```ts
getIconUrl({ set: 'bytesize', icon: 'heart' })
getIconUrl({ set: 'boxicons', icon: 'alarm', type: 'solid' })
getIconUrl({ set: 'flags', icon: 'gr', kind: '4x3' })
```

#### Parameters

*   `props` **any**&#x20;

    *   `props.set`  Icon set
    *   `props.icon`  Icon name
    *   `props.type`  Icon type - Most of the time an entirely different set of icons
    *   `props.kind`  Icon kind - These are variations of the same icon

Returns **any** The SVG CDN url

## Credits

*   All the people behind all the lovely icon sets.
*   [last-icon](https://github.com/lekoala/last-icon) by [lekoala](https://github.com/lekoala) which was the inspiration for this plus providing the icon sets resources.

## Contribute

[Fork](https://github.com/stagas/icon-svg/fork) or
[edit](https://github.dev/stagas/icon-svg) and submit a PR.

All contributions are welcome!

## License

MIT © 2021
[stagas](https://github.com/stagas)
