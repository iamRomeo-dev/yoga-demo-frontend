"use client";
import { DiamondText, DiamondTitle } from "@/components/typography";
import { PrimaryButton } from "@/components/buttons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ReservationButton = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    <PrimaryButton
      className="text-xl lg:text-2xl z-20"
      onClick={() => router.push("/reserver-un-cours")}
    >
      Planning & réservation
    </PrimaryButton>;
    return null;
  }
  return (
    <PrimaryButton
      className="text-xl lg:text-2xl z-20"
      onClick={() => router.push("/reserver-un-cours")}
    >
      {t("scheduleAndBooking")}
    </PrimaryButton>
  );
};
export const HeroDesktop = ({ ...props }) => {
  return (
    <div className="" {...props}>
      {/* Full width - Left side - Purple */}
      <div className="flex-1 flex items-center justify-center bg-[#FF99D8]"></div>
      {/* Full width - Right side - Yellow */}
      <div className="flex-1 flex items-center justify-center bg-[#FFBD59]"></div>
      {/* Hero container max width 7xl */}
      <div className="absolute inset-0 flex overflow-hidden max-w-7xl mx-auto">
        <Image
          src="/images/thumbnail_joyoga-dune-sans-ciel 1.png"
          alt="Description"
          width={1000}
          height={600}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-7xl
               [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]
               [mask-repeat:no-repeat]
               [mask-size:cover]"
        />

        {/* Left side - Purple */}
        <div className="flex-1 flex items-center justify-center">
          <ReservationButton />
        </div>

        {/* Right side - Yellow */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center z-20 gap-6">
            <DiamondTitle />
            <DiamondText />
          </div>
        </div>
      </div>
    </div>
  );
};

export const HeroMobile = ({ ...props }) => {
  return (
    <div className="" {...props}>
      {/* Full width - Left side - Purple */}
      <div className="flex-1 flex items-center justify-center bg-[#FF99D8]"></div>
      {/* Full width - Right side - Yellow */}
      <div className="flex-1 flex items-center justify-center bg-[#FFBD59]"></div>
      {/* Hero container max width 7xl */}
      <div className="absolute inset-0 flex flex-col gap-4 overflow-hidden mx-auto">
        <Image
          src="/images/thumbnail_joyoga-dune-sans-ciel 1.png"
          alt="Description"
          width={1000}
          height={600}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-full
               [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]
               [mask-repeat:no-repeat]
               [mask-size:cover]"
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center z-20 gap-6">
            <DiamondTitle />
            <DiamondText />
          </div>
        </div>
        <div className="flex-1 flex items-start justify-center">
          <ReservationButton />
        </div>
      </div>
    </div>
  );
};
