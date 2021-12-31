import { Icons, IconTypes } from './types'

export const iconSets = {
  bootstrap: 'npm/bootstrap-icons@1/icons/{icon}.svg',
  boxicons: 'npm/boxicons@2/svg/{type}/{prefix}-{icon}.svg',
  bytesize: 'npm/bytesize-icons@1/dist/icons/{icon}.svg',
  cssgg: 'npm/css.gg@2/icons/svg/{icon}.svg',
  emojicc: 'npm/emoji-cc@1/svg/{icon}.svg',
  eos: 'gh/lekoala/eos-icons-mirror/{type}/{icon}.svg',
  feather: 'npm/feather-icons@4/dist/icons/{icon}.svg',
  flags: 'npm/flag-svg-collection@1/flags/{kind}/{icon}.svg',
  fontawesome: 'npm/@fortawesome/fontawesome-free@5/svgs/{type}/{icon}.svg',
  iconoir: 'gh/lucaburgio/iconoir/icons/{icon}.svg',
  iconpark: 'gh/bytedance/IconPark/source/{type}/{icon}.svg',
  material: 'npm/@material-icons/svg@1/svg/{icon}/{kind}.svg',
  supertiny: 'npm/super-tiny-icons@0.4.0/images/svg/{icon}.svg',
  tabler: 'npm/@tabler/icons@1/icons/{icon}.svg',
}

export const prefixes = {
  boxicons: {
    solid: 'bxs',
    regular: 'bx',
    logos: 'bxl',
  },
}

export type IconSetsNames = keyof typeof iconSets
export type IconSets<T extends IconSetsNames> = { [k in T]: string }
export type IconsWithTypes = Pick<Icons, keyof IconTypes>
