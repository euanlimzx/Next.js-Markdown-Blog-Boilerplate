import { getPageContent } from 'app/content/utils'
import { CustomMDX } from 'app/components/mdx'

export default function Page() {
  const content = getPageContent('home')
  return (
    <section>
      <CustomMDX source={content} />
    </section>
  )
}
