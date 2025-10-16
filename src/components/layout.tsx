import { PropsWithChildren } from "react";

// Global layout
export const PageLayout = (props: PropsWithChildren) => {
  return <div className="mx-auto w-full">{props.children}</div>;
};

export const PageBg = (props: PropsWithChildren) => {
  return <div className="bg-white">{props.children}</div>;
};

export const PageContainer = (props: PropsWithChildren) => {
  return (
    <div className="mx-auto max-w-7xl py-8 px-4 xl:px-0">{props.children}</div>
  );
};

export const ContentContainer = (props: PropsWithChildren) => {
  return (
    <div className="mt-10 flex flex-col gap-6 w-full">{props.children}</div>
  );
};

interface PageTitleProps {
  smallText: string;
  mainText: string;
}
export const PageTitle = ({ smallText, mainText }: PageTitleProps) => {
  return (
    <div className="flex flex-col items-start gap-1 z-10 w-1/2">
      <SmallTitle text={smallText} />
      <MainTitle text={mainText} />
      <div className="w-26 h-0.5 rounded-full bg-gray-800"></div>
    </div>
  );
};

interface SmallTitleProps {
  text: string;
}
export const SmallTitle = ({ text, ...props }: SmallTitleProps) => {
  return (
    <p
      className="font-lobster tracking-wider uppercase text-xs font-semibold leading-7"
      {...props}
    >
      {text}
    </p>
  );
};

interface MainTitleProps {
  text: string;
}

export const MainTitle = ({ text, ...props }: MainTitleProps) => {
  return (
    <h2
      style={{ fontFamily: "Genty, sans-serif" }}
      className="scroll-m-20 text-3xl font-extrabold tracking-tight text-balance"
      {...props}
    >
      {text}
    </h2>
  );
};
