import { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

export const PrimaryButton = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={clsx(
        "font-lobster items-center justify-center py-2 px-8 font-medium rounded-full border-gray-300 bg-[#FF751F] text-white shadow-sm hover:bg-white hover:text-[#FF751F] cursor-pointer dark:bg-white dark:text-gray-100 dark:hover:bg-gray-50",
        className
      )}
      {...props}
    ></button>
  );
};

export const SecondaryButton = ({ ...props }) => {
  return (
    <button
      className="items-center justify-center py-2 px-8 text-sm font-medium rounded-tl-lg
        rounded-bl-lg rounded-br-lg bg-[#e49315] text-white shadow-sm hover:bg-[#ecb35b] cursor-pointer"
      {...props}
    ></button>
  );
};

export const WhiteButton = ({ ...props }) => {
  return (
    <button
      className="items-center justify-center py-2 px-8 text-sm font-medium rounded-tl-lg
        rounded-bl-lg rounded-br-lg bg-white text-gray-800 shadow-sm hover:bg-gray-50 cursor-pointer"
      {...props}
    ></button>
  );
};
