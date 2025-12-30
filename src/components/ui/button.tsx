import * as React from 'react';
import { cn } from '@/src/lib/utils';

export type ButtonVariant = 'primary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  ghost: 'btn-ghost'
};
const sizeClass: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg'
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', fullWidth, className, ...props }, ref
) {
  return (
    <button
      ref={ref}
      className={cn('btn-base', variantClass[variant], sizeClass[size], fullWidth && 'w-full', className)}
      {...props}
    />
  );
});
