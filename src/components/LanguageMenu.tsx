import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

interface FlagListProps {
  language: string;
  languageFlag: string;
}
const flags: FlagListProps[] = [
  {
    language: "fr",
    languageFlag: "fr",
  },

  {
    language: "en",
    languageFlag: "gb",
  },
];

const LanguageMenu = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage;

  const changeLanguage = (lang: string) => {
    void i18n.changeLanguage(lang);
  };
  return (
    <ul className="flex flex-row gap-3 pb-1">
      {flags.map((flag) => (
        <li
          key={flag.language}
          onClick={() => changeLanguage(flag.language)}
          className={`
    list-none rounded-full cursor-pointer bg-transparent transition-transform duration-200 hover:scale-125
    ${
      currentLanguage === flag.language
        ? "ring-1 ring-offset-1 ring-white px-0.5 pb-0.5"
        : ""
    }
  `}
        >
          <ReactCountryFlag
            countryCode={flag.languageFlag}
            svg
            style={{
              width: "1.35rem",
              height: "1.25rem",
              borderRadius: "100rem",
              opacity: "0.90",
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default LanguageMenu;
