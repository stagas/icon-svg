import { inspectWithPreamble, setOptions } from '@n1kk/intspector'
import { getIconUrl } from '../src/icon-svg'

setOptions(require('../tsconfig.json'), true)

const typeTest = (fn: string) => {
  try {
    inspectWithPreamble(`
      import { getIconUrl } from '../'
      const result = ${fn}
    `)({ result: 'typeof result' })
    return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error[0].messageText.next[0].messageText
  }
}

describe('getIconUrl', () => {
  it('only package + name', () => {
    expect(getIconUrl({ set: 'feather', icon: 'award' })).toMatchSnapshot()
    expect(getIconUrl({ set: 'bytesize', icon: 'heart' })).toMatchSnapshot()
  })

  it('package + name + type', () => {
    expect(getIconUrl({ set: 'flags', icon: 'gr', kind: '4x3' })).toMatchSnapshot()
  })

  it('package + name + type adjusts prefix', () => {
    expect(getIconUrl({ set: 'boxicons', icon: 'alarm', type: 'solid' })).toMatchSnapshot()
  })

  it('throws when missing properties', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getIconUrl({})
    }).toThrow('Missing properties')
  })

  it('missing type when required', () => {
    expect(typeTest(`getIconUrl({ set: 'boxicons', type: 'logos', icon: '99designs' })`)).toEqual(true)
    expect(typeTest(`getIconUrl({ set: 'boxicons', icon: '99designs' })`)).toContain('\'type\' is missing')
  })

  it('missing kind when required', () => {
    expect(typeTest(`getIconUrl({ set: 'flags', icon: 'gr', kind: '4x3' })`)).toEqual(true)
    expect(typeTest(`getIconUrl({ set: 'flags', icon: 'gr' })`)).toContain('\'kind\' is missing')
  })
})
