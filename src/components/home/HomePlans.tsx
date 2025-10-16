"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TitleComponent } from "../titles";
import { useState } from "react";
import Modal from "../Modal";
import { useTranslation } from "react-i18next";

const cards = [
  {
    title: "groupLessons",
    description: "groupLessonsSub",
    image: "/images/thumbnail_joyoga-dune-sans-ciel 1.png",
    onClick: "/group-class",
  },
  {
    title: "privateLessons",
    description: "privateLessonsSub",
    image: "/images/partOne.jpg",
    onClick: "/reserver-un-cours",
  },
  {
    title: "inTheCompany",
    description: "privateLessonsSub",
    image: "/images/partOne.jpg",
    onClick: "/reserver-un-cours",
  },
  {
    title: "onlineYoga",
    description: "onlineYogaSub",
    image: "/images/thumbnail_joyoga-dune-sans-ciel 1.png",
    onClick: "/reserver-un-cours",
  },
];

export interface SingleCardProps {
  card: {
    title: string;
    description: string;
    image: string;
    onClick: string;
  };
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SingleCard = ({ card, setOpen }: SingleCardProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <div
      className={`max-w-sm rounded overflow-hidden shadow-lg bg-white cursor-pointer hover:shadow-xl transform transition-transform duration-300 hover:scale-105 mx-auto
        `}
      onClick={() =>
        card.title === "Cours collectifs"
          ? router.push(card.onClick)
          : setOpen(!open)
      }
    >
      <Image
        src={card.image}
        alt={card.title}
        width={1000}
        height={600}
        className="h-56 object-cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-base mb-2">{t(card.title)}</div>
        <p className="text-gray-700 text-xs">{t(card.description)}</p>
      </div>
    </div>
  );
};

export const HomePlans = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-16">
      <TitleComponent big={t("theLessons")} small={t("theLessonsSub")} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-10 mx-auto">
        {cards.map((card, index) => (
          <SingleCard key={index} card={card} setOpen={setOpen} />
        ))}
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Page en construction"
      >
        <div className="flex justify-center">
          <p>{t("notAvailable")}</p>
        </div>
      </Modal>
    </div>
  );
};
