import { getPageContent } from "app/content/utils";
import { CustomMDX } from "app/components/mdx";

export const metadata = {
  title: "Blog",
  description:
    "Blog posts by euanlimzx - thoughts on software engineering, technology, and life.",
};

export default function Page() {
  const content = getPageContent("blog");
  return (
    <section>
      <CustomMDX source={content} />
    </section>
  );
}
