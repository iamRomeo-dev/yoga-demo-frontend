"use client";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface TitleProps extends React.HTMLAttributes<HTMLSpanElement> {
  title: string;
}
const XpText = ({ title, className, ...props }: TitleProps) => {
  return (
    <span className={clsx("font-thin text-xs", className)} {...props}>
      {title}
    </span>
  );
};

interface XpCircleProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}
const XpCircle = ({ className, ...props }: XpCircleProps) => {
  return (
    <span
      className={clsx("w-1.5 h-1.5 rounded-full bg-white", className)}
      {...props}
    ></span>
  );
};

export const XpBanner = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center sm:justify-between bg-[#FF751F] text-white py-2 px-1 dark:hidden">
      <XpText title={t("certifiedYogaAlliance")} />
      <XpCircle className="hidden sm:flex" />
      <XpText title={t("XpBannerText2")} className="hidden sm:flex" />
      <XpCircle className="hidden sm:flex" />
      <XpText title={t("certifiedYogaAlliance")} className="hidden sm:flex" />
      <XpCircle className="hidden sm:flex" />
      <XpText title={t("XpBannerText2")} className="hidden sm:flex" />
    </div>
  );
};
