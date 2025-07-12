import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = ComponentPropsWithoutRef<'button'>;
export default function Button(props: ButtonProps) {
  const { children, className, ...rest } = props;
  return (
    <button
      className={twMerge(
        'rounded-[50px] bg-[var(--color-pink-300)] text-xl font-medium shadow-[0_3px_8px_rgba(0,0,0,0.24)]',
        'flex cursor-pointer items-center justify-center py-5 hover:bg-[var(--color-pink-500)]',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
