import { getPageContent } from "app/content/utils";
import { CustomMDX } from "app/components/mdx";
import Image from "next/image";

export default function Page() {
  const content = getPageContent("home");
  return (
    <section>
      <div className="mb-8 flex justify-start items-center gap-4 w-full">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-6 mb-4">
          Hi, I'm Euan.
        </h1>
      </div>
      <Image
        src="/profile.jpg"
        alt="Euan on a hike"
        width={1086}
        height={724}
        sizes="(max-width: 640px) 100vw, 576px"
        className="w-full h-auto rounded-lg mb-8"
        preload
      />
      <CustomMDX source={content} />
    </section>
  );
}
