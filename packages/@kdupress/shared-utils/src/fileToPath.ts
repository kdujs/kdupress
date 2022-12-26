import { indexRE, isIndexFile } from './isIndexFile'

const extRE = /\.(kdu|md)$/

export = function fileToPath (file: string): string {
  if (isIndexFile(file)) {
    // README.md -> /
    // README.kdu -> /
    // foo/README.md -> /foo/
    // foo/README.kdu -> /foo/
    return file.replace(indexRE, '/$1')
  } else {
    // foo.md -> /foo.html
    // foo.kdu -> /foo.html
    // foo/bar.md -> /foo/bar.html
    // foo/bar.kdu -> /foo/bar.html
    return `/${file.replace(extRE, '').replace(/\\/g, '/')}.html`
  }
}
