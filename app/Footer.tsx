"use client";
import { InstagramIcon } from "@/components/Icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Error404Page } from "@/components/Error404Page";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    <Error404Page />;
    return null;
  }
  return (
    <footer className="flex flex-col justify-center items-center gap-2 bg-amber-100 text-gray-800 py-3">
      <div className="flex gap-6">
        <Link
          href={process.env.NEXT_PUBLIC_INSTAGRAM!}
          className="cursor-pointer"
        >
          <InstagramIcon className="w-5" />
        </Link>
      </div>

      <p className="text-xs leading-tight">
        &copy; {new Date().getFullYear()} Marie Yoga. {t("allRightsReserved")}
      </p>
    </footer>
  );
}
