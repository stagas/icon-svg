import { attrs, mixter, shadow } from 'mixter'
import { fetchIconSvg } from './fetch'
import { propsSatisfyTemplate } from './icon-svg'

const style = ({ strokeWidth }: { strokeWidth?: string | number | null }) => /*css*/ `
:host {
  ${strokeWidth ? `stroke-width: ${strokeWidth};` : ''}
  --stroke: currentColor;
  --fill: #9994;
  --fill-secondary: #9996;
  display: inline-flex;
  vertical-align: middle;
}

[part=svg] {
  width: 100%;
  height: 100%;
}`

/**
 * The `IconSvgElement` custom element.
 *
 * For a more complete example with typings check `playground/app.tsx`
 *
 * Browser needs to support `Constructible StyleSheets` ([polyfill](https://github.com/calebdwilliams/construct-style-sheets)).
 *
 * _JS / TS:_
 * ```ts
 * customElements.define('icon-svg', IconSvgElement)
 * ```
 *
 * _CSS:_
 * ```css
 * icon-svg {
 *   width: 32px;
 *   height: 32px;
 *   stroke-width: 2.5px;
 *   --stroke: #fff;
 *   --fill: #028;
 *   --fill-secondary: #468;
 * }
 * ```
 *
 * _HTML:_
 * ```html
 * <icon-svg set="boxicons" type="logos" icon="javascript"></icon-svg>
 * ```
 */
export class IconSvgElement extends mixter(
  HTMLElement,
  shadow(),
  attrs(
    class {
      icon = String
      set = String
      type = String
      kind = String
      raw = Boolean
      strokeWidth = Number
    }
  )
) {
  async updateSvg() {
    const props = {
      set: this.getAttribute('set'),
      icon: this.getAttribute('icon'),
      type: this.getAttribute('type'),
      kind: this.getAttribute('kind'),
      raw: this.hasAttribute('raw'),
      strokeWidth: this.getAttribute('stroke-width'),
    }
    if (!propsSatisfyTemplate(props)) return

    this.shadowRoot!.innerHTML = `<style>${style(props)}</style>${
      (await fetchIconSvg(props as never)).replace(/(<svg.*?)>/, '$1 part="svg">')
    }`
  }

  attributeChangedCallback() {
    this.updateSvg()
  }
}
