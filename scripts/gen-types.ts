/* eslint-disable @typescript-eslint/no-explicit-any */
import { memoize } from 'memoize-pure'
// @ts-ignore
import fetch from 'node-fetch'
import { iconSets } from '../src/data'

const parsePkgTemplate = (s: string) => {
  const [reg, ...parts] = s.split('/')

  if (reg === 'gh') {
    const [user, repoWithVersion, ...pathParts] = parts
    const [repo, versionRange] = repoWithVersion.split('@')
    const name = user + '/' + repo
    return { reg, name, versionRange, pathParts }
  } else {
    // eslint-disable-next-line prefer-const
    let [nameWithVersion, ...pathParts] = parts
    if (nameWithVersion[0] === '@') {
      nameWithVersion += '/' + pathParts.shift()
      const [, name, versionRange] = nameWithVersion.split('@')
      return { reg, name: '@' + name, versionRange, pathParts }
    } else {
      const [name, versionRange] = nameWithVersion.split('@')
      return { reg, name, versionRange, pathParts }
    }
  }
}

const API_URL = 'https://data.jsdelivr.com/v1/package/'

const headers = {
  Accept: 'application/json',
  'User-Agent': 'fetch-icon-svg gen-types',
}

const pickSvg = (x: any) => (x.type === 'file' ? x.name.endsWith('.svg') : true)
const cleanup = (s: string, t = '') => s.replace(/bx\w?-|\.svg/gm, '').replace(t ? '-' + t : '', '')

const print = (s: string) => process.stdout.write(s + '\n')

const getFiles = memoize(async (reg: string, name: string, versionRange: string) => {
  let url: string

  url = API_URL + 'resolve/' + reg + '/' + name + '@' + (versionRange ?? 'master')
  const { version } = (await (await fetch(url, { headers })).json()) as { version: string }

  url = API_URL + reg + '/' + name + '@' + (version ?? 'master')
  const dir = (await (await fetch(url, { headers })).json()) as any

  return dir
})

const getIcons = async (pkg: string) => {
  const template = (iconSets as any)[pkg]
  const { reg, name, versionRange, pathParts } = parsePkgTemplate(template)
  let dir = await getFiles(reg, name, versionRange)

  let hasTypes = false
  dir = dir.files
  for (const p of pathParts) {
    if (p.includes('{type}')) {
      hasTypes = true
      break
    }
    if (p.includes('{icon}')) break
    dir = (dir.find((x: any) => x.name === p) || dir[0]).files
  }

  if (hasTypes) {
    print(`  ${pkg}: {`)
    for (const t of dir) {
      if (t.type !== 'directory') continue
      print(
        `    ${t.name}: ${
          t.files
            .filter(pickSvg)
            .map((x: any) => JSON.stringify(cleanup(x.name, t.name)))
            .join(' | ')
        }`
      )
    }
    print(`  }`)
  } else {
    print(
      `  ${pkg}: ${
        dir
          .filter(pickSvg)
          .map((x: any) => JSON.stringify(cleanup(x.name)))
          .join(' | ')
      }`
    )
  }
}

const getIconTypes = async (pkg: string) => {
  const template = (iconSets as any)[pkg]
  if (!template.includes('{type}')) return

  const { reg, name, versionRange, pathParts } = parsePkgTemplate(template)
  let dir = await getFiles(reg, name, versionRange)

  dir = dir.files
  for (const p of pathParts) {
    if (p.includes('{type}')) break
    dir = (dir.find((x: any) => x.name === p) || dir[0]).files
  }

  print(
    `  ${pkg}: ${
      dir
        .filter((x: any) => x.type === 'directory')
        .map((x: any) => JSON.stringify(cleanup(x.name)))
        .join(' | ')
    }`
  )
}

const getIconKinds = async (pkg: string) => {
  const template = (iconSets as any)[pkg]
  if (!template.includes('{kind}')) return

  const { reg, name, versionRange, pathParts } = parsePkgTemplate(template)
  let dir = await getFiles(reg, name, versionRange)

  dir = dir.files
  for (const p of pathParts) {
    if (p.includes('{kind}')) break
    dir = (dir.find((x: any) => x.name === p) || dir[0]).files
  }

  print(
    `  ${pkg}: ${
      dir
        .filter((x: any) => x.type === (template.includes('{kind}.svg') ? 'file' : 'directory'))
        .filter((x: any) => (template.includes('{kind}.svg') ? x.name.endsWith('.svg') : true))
        .map((x: any) => JSON.stringify(cleanup(x.name)))
        .join(' | ')
    }`
  )
}

const main = async () => {
  print('export interface Icons {')
  for (const pkg in iconSets)
    await getIcons(pkg)
  print('}')
  print('')

  print('export interface IconTypes {')
  for (const pkg in iconSets)
    await getIconTypes(pkg)
  print('}')
  print('')

  print('export interface IconKinds {')
  for (const pkg in iconSets)
    await getIconKinds(pkg)
  print('}')
}

main()
