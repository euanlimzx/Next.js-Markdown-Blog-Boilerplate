import fs from 'fs'
import path from 'path'

export function getPageContent(pageName: string): string {
  const filePath = path.join(process.cwd(), 'app', 'content', `${pageName}.md`)
  return fs.readFileSync(filePath, 'utf-8')
}
