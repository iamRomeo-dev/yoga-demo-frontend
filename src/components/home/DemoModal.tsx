"use client";

import { useEffect, useState } from "react";
import Modal from "../Modal";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { LinkedinIcon } from "../Icons";

export const DemoModal = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal open={open} onClose={() => setOpen(false)} title={t("welcome")}>
      <div className="space-y-4">
        <p className="text-gray-700  text-sm">{t("demoOne")}</p>
        <div>
          <p className="text-gray-700  text-sm">{t("demoTwoTitle")}</p>
          <ul className="text-gray-700 text-xs">
            <li>- {t("demoTwoItemOne")}</li>
            <li>- {t("demoTwoItemTwo")}</li>
            <li>- {t("demoTwoItemThree")}</li>
            <li>- {t("demoTwoItemFour")}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-700  text-sm">{t("demoThreeTitle")}</p>
          <p className="text-gray-700 text-xs">{t("demoThreeSubTitle")}</p>

          <ul className="text-gray-700 text-xs">
            <li>- {t("demoThreeItemFour")}</li>
            <li>- {t("demoThreeItemFive")}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-700  text-sm">{t("demoFourTitle")}</p>
          <p className="text-gray-700 text-xs">{t("demoFourSubTitle")}</p>
        </div>
        <p className="text-gray-700  text-sm">{t("demoThanks")}</p>
        <p className="text-gray-700 text-sm">{t("demoBye")}</p>
        <p className="text-gray-700 italic text-xs">
          — {t("demoDeveloppedBy")} Roméo Brilland{" "}
          <Link
            href="https://www.linkedin.com/in/rom%C3%A9o-brilland/"
            className="cursor-pointer"
          >
            <LinkedinIcon className="w-5" />
          </Link>
        </p>
      </div>
    </Modal>
  );
};
