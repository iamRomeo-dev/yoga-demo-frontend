"use client";
import { Error404Page } from "@/components/Error404Page";
import { Loader } from "@/components/Loader";
import { ContentContainer, PageContainer } from "@/components/layout";
import { TitleComponent } from "@/components/titles";
import { ClassTypeType } from "@/hooks/useClassTypeApi";
import { useClassesTypeQuery } from "@/hooks/useClassTypeUnauthenticatedApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface GroupClassSuccessProps {
  classesType: ClassTypeType[];
}

const GroupClassSuccess = ({ classesType }: GroupClassSuccessProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <ContentContainer>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10 mb-0 full lg:h-[600px]">
        {/* Column 1 */}
        <div className="flex flex-col h-full gap-4">
          <div className="flex-[4] rounded-lg overflow-hidden flex items-center justify-center">
            <Image
              src="/images/partOne.jpg"
              alt="Description"
              width={1000}
              height={600}
              className="h-[25rem] object-cover rounded-lg"
            />
          </div>
          {classesType.length >= 1 ? (
            <div
              className="bg-[#FF99D8] flex-[2] rounded-lg flex items-center justify-center cursor-pointer hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
              onClick={() =>
                router.push(
                  `/reserver-un-cours?classType=${classesType[0]._id}`
                )
              }
            >
              <p
                style={{ fontFamily: "Genty, sans-serif" }}
                className="text-center text-3xl"
              >
                {classesType[0]?.name}
              </p>
            </div>
          ) : (
            <div className="bg-[#FF99D8] flex-[2] rounded-lg flex items-center justify-center">
              <p
                style={{ fontFamily: "Genty, sans-serif" }}
                className="text-center text-3xl"
              >
                {t("bookALesson")}
              </p>
            </div>
          )}

          <div className="flex-[3] rounded-lg">
            <Image
              src="/images/thumbnail_joyoga-dune-sans-ciel 1.png"
              alt="Description"
              width={1000}
              height={600}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col h-full gap-4">
          {classesType.length >= 2 ? (
            <div
              onClick={() =>
                router.push(
                  `/reserver-un-cours?classType=${classesType[1]._id}`
                )
              }
              className="bg-[#FF751F] flex-[2] rounded-lg flex items-center justify-center cursor-pointer hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
            >
              <p
                style={{ fontFamily: "Genty, sans-serif" }}
                className="text-center text-3xl"
              >
                {classesType[1]?.name}
              </p>
            </div>
          ) : (
            <div className="bg-[#FF751F] flex-[2] rounded-lg flex items-center justify-center">
              <p
                style={{ fontFamily: "Genty, sans-serif" }}
                className="text-center text-3xl"
              >
                {t("bookALesson")}
              </p>
            </div>
          )}

          <div className="flex-[3] rounded-lg">
            <Image
              src="/images/thumbnail_joyoga-dune-sans-ciel 1.png"
              alt="Description"
              width={1000}
              height={600}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="flex-[4] rounded-lg overflow-hidden flex items-center justify-center">
            <Image
              src="/images/partOne.jpg"
              alt="Description"
              width={1000}
              height={600}
              className="h-[25rem] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col h-full gap-4">
          <div className="relative flex flex-[3] rounded-lg items-center justify-center bg-black overflow-hidden h-96">
            {/* Animated background text */}
            <div className="absolute w-full top-0 left-0 h-full flex items-center pointer-events-none z-0 select-none">
              <p className="marquee font-extrabold text-white text-6xl whitespace-nowrap w-full">
                MARIE YOGA FOREVER&nbsp;MARIE YOGA FOREVER&nbsp;MARIE YOGA
                FOREVER&nbsp;
              </p>
            </div>
            {/* Video*/}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <iframe
                className="w-60 h-40 rounded-lg"
                src="https://www.youtube.com/embed/PJQVlVHsFF8?list=RDPJQVlVHsFF8"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="flex-[4] rounded-lg overflow-hidden flex items-center justify-center">
            <Image
              src="/images/partOne.jpg"
              alt="Description"
              width={1000}
              height={600}
              className="h-[25rem] object-cover rounded-lg"
            />
          </div>

          {classesType.length >= 3 ? (
            <div
              onClick={() =>
                router.push(
                  `/reserver-un-cours?classType=${classesType[2]._id}`
                )
              }
              className="bg-[#FFBD59] flex-[2] rounded-lg flex items-center justify-center cursor-pointer hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
            >
              <p
                style={{ fontFamily: "Genty, sans-serif" }}
                className="text-center text-3xl"
              >
                {classesType[2].name}
              </p>
            </div>
          ) : (
            <div className="bg-[#FFBD59] flex-[2] rounded-lg flex items-center justify-center">
              <p
                style={{ fontFamily: "Genty, sans-serif" }}
                className="text-center text-3xl"
              >
                {t("bookALesson")}
              </p>
            </div>
          )}
        </div>
      </div>
    </ContentContainer>
  );
};

const Page = () => {
  const { status: classesTypeStatus, data: classesType } = useClassesTypeQuery(
    {}
  );

  if (classesTypeStatus === "pending") {
    return <Loader />;
  }
  if (classesTypeStatus === "error") {
    return <Error404Page />;
  }

  return (
    <PageContainer>
      <TitleComponent
        big="Cours collectifs"
        small="Plus on est nombreux, plus on s’amuse, non ?"
      />

      <GroupClassSuccess classesType={classesType.list} />
    </PageContainer>
  );
};

export default Page;

{
  /* <iframe
    src="https://www.instagram.com/reel/DNns7mZsoCd/embed"
    className="w-full h-full"
    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
  /> */
}
