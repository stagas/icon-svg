import { memoize } from 'memoize-pure'
import { getIconUrl, IconSets, IconSetsNames, IconsWithTypes, Icons, IconTypes, IconKinds } from '.'

const fetchMemoized = memoize(async (url: string) => {
  const response = await fetch(url)
  const text = await response.text()
  if (response.ok) return text
  else {
    console.error(url + ': ' + text)
    return `<span title="Error loading icon: ${url}">⚠️</span>`
  }
})

export interface FetchProps {
  raw?: boolean
  strokeWidth?: string | number
}

/**
 * Fetches an SVG icon.
 *
 * The network request is memoized so when this is called multiple times
 * it will only access the network the first time (or the browser cache if there already).
 *
 * It also attempts to normalize the SVG to make all the icons consistent and
 * usable out of the box without any adjustments, i.e it normalizes various values.
 *
 * Use CSS variables `--stroke` `--fill` and `--fill-secondary` to manage
 * the colors if necessary.
 *
 * When used with `strokeWidth` you can achieve fine-control on how it's being displayed.
 *
 * Use the `raw` option to skip any post processing if you don't need it and simply get
 * the raw SVG data.
 *
 * ```ts
 * svg = await fetchIconSvg({ set: 'bytesize', icon: 'heart', strokeWidth: '2px' })
 * svg = await fetchIconSvg({ set: 'flags', icon: 'gr', kind: '4x3', raw: true })
 * svg = await fetchIconSvg({
 *   set: 'boxicons',
 *   icon: 'alarm',
 *   type: 'solid',
 *   strokeWidth: '' // passing `strokeWidth=''` allows it to be managed in CSS
 * })
 * ```
 *
 * @param props
 * @param props.set Icon set
 * @param props.icon Icon name
 * @param props.type Icon type - Most of the time an entirely different set of icons
 * @param props.kind Icon kind - These are variations of the same icon
 * @param props.raw Get the raw SVG without any post processing
 * @param props.strokeWidth Normalize `stroke-width` to this value.
 *  This also applies `vector-effect="non-scaling-stroke"` which will make the
 *  `stroke-width` absolute and not relative to the size of the icon
 *  Use this option for more control over the icon's appearance.
 *  Because every dimension of the icon will need a different `stroke-width`
 *  this can be set to `''` (empty string) which then allows it to be handled with CSS.
 *
 * @returns The SVG data as a string
 */
export const fetchIconSvg = async <P extends keyof IconSets<IconSetsNames>, T extends IconTypes[P & keyof IconTypes]>(
  props: FetchProps & {
    set: P
  } & (P extends keyof IconKinds
      ? {
          icon: Icons[P]
          kind: IconKinds[P & keyof IconKinds]
        }
      : P extends keyof IconTypes
      ? {
          icon: IconsWithTypes[P & keyof IconsWithTypes][T & keyof IconsWithTypes[P & keyof IconsWithTypes]]
          type: T
        }
      : {
          icon: Icons[P & keyof Icons]
        })
) => {
  const url = getIconUrl(props as never)
  let svg = (await fetchMemoized(url)).trim()

  if (props.raw || ['emojicc', 'flags'].includes(props.set)) return svg

  svg = svg
    .replace(/(?<=^<svg[^>]*)\s(width|height)="[\d.]+"(?=.*>)/gis, '')
    .replace(/(^<svg[^>]*?)>/gis, '$1 fill="var(--stroke)">')

    // these two are weird unnecessary squares in iconpark's icons
    .replace('<rect width="48" height="48" fill="white" fill-opacity="0.01"/>', '')
    .replace('<path d="M48 0H0V48H48V0Z" fill="white" fill-opacity="0.01"/>', '')

  // normalize stroke-width
  if (props.strokeWidth != null)
    svg = svg
      .replace(/(stroke-width=")([^"]*?)(")/gi, `$1${props.strokeWidth as string}$3`)
      .replace(/(<(?:path|circle|rect|polyline)[^>]*?)(\/?>)/gis, '$1 vector-effect="non-scaling-stroke"$2')

  svg = svg
    // these are iconpark's colors but could be extended further
    .replace(/"#2F88FF"/gis, '"var(--fill)"')
    .replace(/"#43CCF8"/gis, '"var(--fill-secondary)"')

    // inherit so we can style with css
    .replace(/"(currentColor|white|black)"/gis, '"var(--stroke)"')

  return svg
}
