import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  style?: string;
  inverted?: boolean;
};

const CustomButton: FC<PropsWithChildren<Props>> = ({
  children,
  style,
  inverted,
  ...otherProps
}) => {
  const invertedColors = inverted
    ? "bg-white text-black hover:bg-black hover:text-white"
    : "bg-black text-white hover:bg-white hover:text-black";
  return (
    <button
      {...otherProps}
      className={`${
        style && style
      } rounded-sm border-2 border-black p-4 outline-none transition duration-300 ${invertedColors}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
