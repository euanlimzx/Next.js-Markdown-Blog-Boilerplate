import { PolaroidList } from "app/components/polaroid-list";
import { getPageContent } from "app/content/utils";
import { CustomMDX } from "app/components/mdx";
import { grassPolaroids } from "app/config/links";

export default function Page() {
  const content = getPageContent("grass");
  return (
    <>
      <section>
        <CustomMDX source={content} />
      </section>
      <PolaroidList polaroids={grassPolaroids} />
    </>
  );
}
