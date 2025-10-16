import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { pricingDatas } from "./pricingDatas";
import { PrimaryButton } from "@/components/buttons";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";

export interface PricingSingleCard {
  title: string;
  price?: string;
  description: string;
  pricePerClass: string;
  totalSessions: number;
}
const PricingSingleCard = ({
  title,
  price,
  description,
  pricePerClass,
  totalSessions,
}: PricingSingleCard) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth0();

  return (
    <motion.div
      className="h-[60vh] lg:h-full md:w-auto flex-shrink-0 snap-center flex items-center justify-center"
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-2xl shadow-lg px-6 py-10 flex flex-col items-center justify-between gap-10 text-center relative w-72 h-full">
        {/* Big background number */}
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[150px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 opacity-20">
          {totalSessions}
        </span>

        {/* Foreground content */}
        <div className="z-10">
          <h2 className="text-sm font-semibold tracking-widest text-gray-600 uppercase">
            {t(title)}
          </h2>
          <p className="text-gray-500 text-sm mt-1">{description}</p>
        </div>

        <div className="z-10">
          <p className="text-4xl font-bold">{price} €</p>
          <p className="text-sm text-gray-500">
            ({pricePerClass} € / {t("classes")})
          </p>
        </div>

        <div>
          <ul className="space-y-2 text-gray-300 text-sm mb-2">
            <li>
              ✔ {totalSessions} {totalSessions > 1 ? t("classes") : t("classe")}
            </li>
            <li>✔ {t("equipmentIsProvided")}</li>
            <li>✔ {t("goodHumor")}</li>
          </ul>
          <Link href={`/my-account?pricing=${title}`}>
            <PrimaryButton className="cursor-pointer hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
              {isAuthenticated ? "Acheter une carte" : "Se connecter"}
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Pricing = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setAtStart(el.scrollLeft <= 0);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Center scroll on mount
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      const middle = (el.scrollWidth - el.clientWidth) / 2;
      el.scrollTo({ left: middle, behavior: "smooth" });
    });
  }, []);

  const scrollByAmount = (amount: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="h-full flex lg:justify-center gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory items-center px-6 pb-4"
      >
        {pricingDatas.map((tier, index) => (
          <PricingSingleCard
            key={index}
            title={tier.name}
            price={tier.pricePaid}
            description={tier.description}
            pricePerClass={tier.pricePerClass}
            totalSessions={tier.totalSessions}
          />
        ))}
      </div>

      {/* Scroll arrows */}
      {!atStart && (
        <button
          onClick={() => scrollByAmount(-300)}
          className="absolute top-1/2 transform -translate-y-1/2 -left-4 bg-white/80 rounded-full p-2 shadow hover:bg-white transition"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
      )}
      {!atEnd && (
        <button
          onClick={() => scrollByAmount(300)}
          className="absolute top-1/2 transform -translate-y-1/2 -right-4 bg-white/80 rounded-full p-2 shadow hover:bg-white transition"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>
      )}
    </div>
  );
};

export default Pricing;
