interface TitleComponentProps extends React.HTMLAttributes<HTMLSpanElement> {
  big: string;
  small: string;
}

export const TitleComponent = ({ big, small }: TitleComponentProps) => {
  return (
    <div className="text-center">
      <h1
        style={{ fontFamily: "Genty, sans-serif" }}
        className="mb-1 font-bold leading-none tracking-tight text-gray-900 text-3xl md:text-5xl"
      >
        {big}
      </h1>
      <p className="mb-6 text-sm font-normal text-gray-500 lg:text-mb sm:px-16 xl:px-48">
        {small}
      </p>
    </div>
  );
};

interface ModalTitleComponentProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
}

export const ModalTitleComponent = ({ text }: ModalTitleComponentProps) => {
  return (
    <div className="text-center">
      <p className="mb-2 text-xl/7 font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
        {text}
      </p>
    </div>
  );
};
