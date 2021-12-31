import 'construct-style-sheets-polyfill'
import { inspectWithPreamble } from '@n1kk/intspector'
import { fetchIconSvg } from '../fetch'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any

const typeTest = (fn: string) => {
  try {
    inspectWithPreamble(`
      import { fetchIconSvg } from '../fetch'
      ;(window as any).fetch = async () => ({
        ok: true,
        text: async () => 'cool'
      })
      const result = ${fn}
    `)({ result: 'typeof result' })
    return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error[0].messageText.next[0].messageText
  }
}

describe('fetchIconSvg', () => {
  it('fetches icon', async () => {
    window.fetch = async () => ({
      ok: true,
      text: async () => `<svg><path stroke-width="1.33" /></svg>`,
    })
    const svg = await fetchIconSvg({ set: 'boxicons', icon: 'alarm', type: 'regular' })
    expect(svg).toMatchSnapshot()
  })

  it('raw', async () => {
    window.fetch = async () => ({
      ok: true,
      text: async () => `<svg><path stroke-width="1.33" /></svg>`,
    })
    const svg = await fetchIconSvg({ raw: true, set: 'boxicons', icon: 'alarm', type: 'regular' })
    expect(svg).toMatchSnapshot()
  })

  it('error', async () => {
    const consoleError = console.error
    let errorMessage
    console.error = (s: string) => {
      errorMessage = s
    }
    window.fetch = async () => ({
      ok: false,
      text: async () => `some error`,
    })
    const svg = await fetchIconSvg({ set: 'boxicons', icon: 'airbnb', type: 'logos' })
    expect(svg).toMatchSnapshot()
    expect(errorMessage).toMatchSnapshot()
    console.error = consoleError
  })

  it('memoizes fetch', async () => {
    window.fetch = async () => ({
      ok: true,
      text: async () => `<svg><path stroke-width="1.33" /></svg>`,
    })
    let svg
    svg = await fetchIconSvg({ set: 'boxicons', icon: 'alarm', type: 'regular' })
    expect(svg).toMatchSnapshot()
    window.fetch = async () => ({
      ok: true,
      text: async () => `something else`,
    })
    svg = await fetchIconSvg({ set: 'boxicons', icon: 'alarm', type: 'regular' })
    expect(svg).toMatchSnapshot()
    svg = await fetchIconSvg({ set: 'boxicons', icon: 'alarm', type: 'solid' })
    expect(svg).toMatchSnapshot()
  })

  it('applies strokeWidth', async () => {
    window.fetch = async () => ({
      ok: true,
      text: async () => `<svg><path stroke-width="1.33" /></svg>`,
    })
    const svg = await fetchIconSvg({ strokeWidth: '2px', set: 'boxicons', icon: 'alarm', type: 'regular' })
    expect(svg).toMatchSnapshot()
  })

  it('missing type when required', () => {
    expect(typeTest(`fetchIconSvg({ set: 'boxicons', type: 'logos', icon: '99designs' })`)).toEqual(true)
    expect(typeTest(`fetchIconSvg({ set: 'boxicons', icon: '99designs' })`)).toContain("'type' is missing")
  })

  it('missing kind when required', () => {
    expect(typeTest(`fetchIconSvg({ set: 'flags', icon: 'gr', kind: '4x3' })`)).toEqual(true)
    expect(typeTest(`fetchIconSvg({ set: 'flags', icon: 'gr' })`)).toContain("'kind' is missing")
  })
})
