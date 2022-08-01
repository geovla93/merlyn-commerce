import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import cn from 'classnames';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  inverted?: boolean;
};

const CustomButton: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  inverted,
  ...otherProps
}) => {
  return (
    <button
      {...otherProps}
      className={cn(
        'rounded border border-indigo-600 p-3 transition-colors duration-300 focus:outline-none',
        {
          'bg-transparent text-indigo-600 hover:bg-indigo-600 hover:text-white':
            inverted,
          'bg-indigo-600 text-white hover:bg-transparent hover:text-indigo-600':
            !inverted,
        },
        className,
      )}
    >
      {children}
    </button>
  );
};

export default CustomButton;
