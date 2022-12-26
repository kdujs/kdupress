export const indexRE = /(^|.*\/)(index|readme)\.(md|kdu)$/i

export function isIndexFile (file: string): boolean {
  return indexRE.test(file)
}
