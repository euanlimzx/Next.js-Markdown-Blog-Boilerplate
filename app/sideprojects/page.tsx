import { getPageContent } from "app/content/utils";
import { CustomMDX } from "app/components/mdx";

export const metadata = {
  title: "Side Projects",
  description:
    "Side projects by euanlimzx - building tools, platforms, and applications.",
};

export default function Page() {
  const content = getPageContent("sideprojects");
  return (
    <section>
      <CustomMDX source={content} />
    </section>
  );
}
