import { IconSets, iconSets, IconSetsNames, IconsWithTypes, prefixes } from './data'
import { IconKinds, Icons, IconTypes } from './types'

const origin = 'https://cdn.jsdelivr.net'

/**
 * Gets the SVG CDN url of an icon.
 *
 * ```ts
 * getIconUrl({ set: 'bytesize', icon: 'heart' })
 * getIconUrl({ set: 'boxicons', icon: 'alarm', type: 'solid' })
 * getIconUrl({ set: 'flags', icon: 'gr', kind: '4x3' })
 * ```
 *
 * @param props
 * @param props.set Icon set
 * @param props.icon Icon name
 * @param props.type Icon type - Most of the time an entirely different set of icons
 * @param props.kind Icon kind - These are variations of the same icon
 * @returns The SVG CDN url
 */
export const getIconUrl = <P extends keyof IconSets<IconSetsNames>, T extends IconTypes[P & keyof IconTypes]>(
  props:
    & {
      set: P
    }
    & (P extends keyof IconKinds ? {
        icon: Icons[P]
        kind: IconKinds[P & keyof IconKinds]
      }
      : P extends keyof IconTypes ? {
          icon: IconsWithTypes[P & keyof IconsWithTypes][T & keyof IconsWithTypes[P & keyof IconsWithTypes]]
          type: T
        }
      : {
        icon: Icons[P & keyof Icons]
      }),
) => {
  if (!propsSatisfyTemplate(props)) throw new TypeError('IconSvg: Missing properties')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prefix = prefixes[props.set as never]?.[(props as any).type]
  const values = Object.assign({}, props, { prefix })
  let url = origin + '/' + iconSets[props.set].replace(/{(.*?)}/g, (_, key) => values[key as never] as string)
  if ((props as any).set === 'phosphor' && (props as any).type === 'regular') url = url.replace('-regular', '')
  return url
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const propsSatisfyTemplate = (props: any) => {
  if (!('set' in props) || props.set == null) return false
  const template = iconSets[props.set as never] as string
  const keys = [...template.matchAll(/{(.*?)}/g)].map(x => x[1])
  for (const key of keys) {
    if (key === 'prefix') continue
    if (!(key in props) || props[key] == null) return false
  }
  return true
}
