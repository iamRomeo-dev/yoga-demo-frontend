import { HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

interface TypographyProps extends HTMLAttributes<HTMLParagraphElement> {
  title: string;
}

export function TextTitle({ title, ...props }: TypographyProps) {
  return (
    <p className="leading-4 font-extrabold text-lg text-gray-900" {...props}>
      {title}
    </p>
  );
}

export const DiamondText = () => {
  const { t } = useTranslation();

  const lines = [
    t("diamondText1"),
    t("diamondText2"),
    t("diamondText3"),
    t("diamondText4"),
    t("diamondText5"),
    t("diamondText6"),
    t("diamondText7"),
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="leading-5 font-light text-sm text-gray-700 text-center">
        {lines.map((line, i) => {
          const pad = Math.abs(Math.floor(lines.length / 2) - i) * 4;
          return (
            <div key={i} className={`px-${pad}`}>
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const DiamondTitle = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center gap-1">
      <TextTitle title={t("heroText")} />
      <p className="leading-4 font-extrabold text-xs text-gray-900">
        {t("heroSubText")}
      </p>
    </div>
  );
};

export const NoContent = ({ title, ...props }: TypographyProps) => {
  return (
    <p className="text-gray-400 text-xs font-semibold text-center" {...props}>
      {title}
    </p>
  );
};
