/** @jsxImportSource sigl */
import $ from 'sigl'

import { IconKinds, Icons, IconSets, IconSetsNames, IconsWithTypes, IconTypes } from './'
import { IconSvgElement } from './element'

const IconSvgTag = $.element(IconSvgElement)

export const IconSvg = <P extends keyof IconSets<IconSetsNames>, T extends IconTypes[P & keyof IconTypes]>(
  props:
    & (P extends keyof IconKinds ? {
        set: P
        icon: Icons[P]
        kind: IconKinds[P & keyof IconKinds]
      }
      : P extends keyof IconTypes ? {
          set: P
          icon: IconsWithTypes[P & keyof IconsWithTypes][T & keyof IconsWithTypes[P & keyof IconsWithTypes]]
          type: T
        }
      : {
        set: P
        icon: Icons[P & keyof Icons]
      })
    & $.HTMLAttributes<IconSvgElement>,
): JSX.Element => <IconSvgTag {...props}></IconSvgTag>

IconSvg.toString = IconSvgTag.toString
