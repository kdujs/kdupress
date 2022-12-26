import { parse as _parse } from '@kdujs/component-compiler-utils'
import parseFrontmatter from './parseFrontmatter'

export function parseStrippedFrontmatter (src: string) {
  src = `---\n${src}\n---`
  return parseFrontmatter(src)
}

export function parse (src: string) {
  const output = _parse({
    source: src,
    compiler: require('kdu-template-compiler'),
    needMap: false
  })
  const find = output.customBlocks.find(block => block.type === 'frontmatter')
  const frontmatterRaw = find && find.content
  if (frontmatterRaw) {
    return parseStrippedFrontmatter(frontmatterRaw)
  }
  return {}
}
