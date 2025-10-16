import clsx from "clsx";
import { HTMLAttributes } from "react";

interface BadgeNumberProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export const BadgeNumber = ({ className, ...props }: BadgeNumberProps) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-0.5 rounded-md font-medium flex-shrink-0 whitespace-nowrap text-sm bg-emerald-100 text-emerald-700",
        className
      )}
      {...props}
    />
  );
};
