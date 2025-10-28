"use client";
import { useTranslation } from "react-i18next";
import { TitleComponent } from "../titles";
import Image from "next/image";

export const MariePresentation = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-16">
      <TitleComponent big={t("aboutMe")} small={t("aboutMeSmall")} />

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 xl:gap-6 mt-10">
        {/* Text block */}
        <div className="order-2 md:order-1 md:mt-0">
          <p className="font-bold leading-none tracking-tight text-gray-900 text-2xl">
            {process.env.NEXT_PUBLIC_COACH!}
          </p>
          <p className="text-sm font-normal text-gray-500 lg:text-mb mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <p className="text-sm font-normal text-gray-500 lg:text-mb mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <p className="text-sm font-normal text-gray-500 lg:text-mb mt-2">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using. Content here, content
            here&apos;, making it look like readable English. Many desktop
            publishing packages and web page editors now use Lorem Ipsum as
            their default model text, and a search for lorem ipsum&apos; will
            uncover many web sites still in their infancy.
          </p>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            <div className="w-96 h-full bg-[#FF751F] rounded-[60%_40%_70%_30%/50%_60%_40%_50%] overflow-hidden">
              <Image
                src="/images/smile.jpg"
                alt="Marie"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
