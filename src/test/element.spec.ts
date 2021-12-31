import 'construct-style-sheets-polyfill'
import { IconSvgElement } from '../element'

describe('IconSvgElement', () => {
  it('registers', () => {
    customElements.define('icon-svg', IconSvgElement)
    expect(customElements.get('icon-svg')).toBe(IconSvgElement)
  })

  it('can be created', () => {
    const iconSvg = document.createElement('icon-svg') as IconSvgElement
    expect(iconSvg).toBeInstanceOf(IconSvgElement)
  })

  it('creates icon svg when it has the necessary attributes', done => {
    let fetchUrl: string
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).fetch = async (url: string) => {
      fetchUrl = url
      return {
        ok: true,
        text: async () => `<svg><path stroke-width="1.33" /></svg>`,
      }
    }
    const iconSvg = document.createElement('icon-svg') as IconSvgElement
    iconSvg.setAttribute('set', 'feather')
    iconSvg.setAttribute('icon', 'award')
    iconSvg.setAttribute('stroke-width', '2px')
    queueMicrotask(() => {
      expect(fetchUrl).toMatchSnapshot()
      done()
    })
  })
})
