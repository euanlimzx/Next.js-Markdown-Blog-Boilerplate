import { getPageContent } from "app/content/utils";
import { CustomMDX } from "app/components/mdx";
import Image from "next/image";

export default function Page() {
  const content = getPageContent("home");
  return (
    <section>
      <div className="mb-8 flex justify-start items-center gap-4 w-full">
        <Image
          src="/lego_profile.PNG"
          alt="Profile"
          width={120}
          height={120}
          className="w-full max-w-[60px] h-auto rounded-lg sm:max-w-[70px] md:max-w-[80px]"
          priority
        />
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-6 mb-4">
          Hi, I'm Euan.
        </h1>
      </div>
      <CustomMDX source={content} />
    </section>
  );
}
