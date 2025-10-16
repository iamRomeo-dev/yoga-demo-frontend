"use client";

import { useEffect, useState } from "react";
import Modal from "../Modal";
import { useTranslation } from "react-i18next";

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
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      title="Bienvenue sur une application de test"
    >
      <div className="space-y-4">
        <p className="text-gray-700  text-sm dark:text-gray-200">
          {t("demoOne")}
        </p>
        <div>
          <p className="text-gray-700  text-sm dark:text-gray-200">
            {t("demoTwoTitle")}
          </p>
          <ul className="text-gray-700 text-xs dark:text-gray-200">
            <li>- {t("demoTwoItemOne")}</li>
            <li>- {t("demoTwoItemTwo")}</li>
            <li>- {t("demoTwoItemThree")}</li>
            <li>- {t("demoTwoItemFour")}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-700  text-sm dark:text-gray-200">
            {t("demoThreeTitle")}
          </p>
          <p className="text-gray-700 text-xs dark:text-gray-200">
            {t("demoThreeSubTitle")}
          </p>
          <ul className="text-gray-700 text-xs dark:text-gray-200">
            <li>- {t("demoThreeItemOne")} marie-test@gmail.com</li>
            <li>- {t("demoThreeItemTwo")}</li>
            <li>- {t("demoThreeItemThree")}</li>
            <li>- {t("demoThreeItemFour")}</li>
            <li>- {t("demoThreeItemFive")}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-700  text-sm dark:text-gray-200">
            {t("demoFourTitle")}
          </p>
          <p className="text-gray-700 text-xs dark:text-gray-200">
            {t("demoFourSubTitle")}
          </p>
        </div>
        <p className="text-gray-700  text-sm dark:text-gray-200">
          {t("demoThanks")}
        </p>
        <p className="text-gray-700 text-sm dark:text-gray-200">
          {t("demoBye")}
        </p>
        <p className="text-gray-700 italic text-xs dark:text-gray-200">
          — {t("demoDeveloppedBy")} Roméo Brilland
        </p>
      </div>
    </Modal>
  );
};
