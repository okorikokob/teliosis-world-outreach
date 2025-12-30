import * as React from 'react';
import { cn } from '@/src/lib/utils';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: React.ElementType;
}

const styles: Record<HeadingLevel, string> = {
  1: 'text-4xl font-bold tracking-tight sm:text-5xl',
  2: 'text-3xl font-semibold tracking-tight sm:text-4xl',
  3: 'text-2xl font-semibold tracking-tight',
  4: 'text-xl font-semibold',
  5: 'text-lg font-medium',
  6: 'text-base font-medium'
};

export function Heading({ level = 2, as: ComponentProp, className, ...props }: HeadingProps) {
  const tag = `h${level}` as keyof HTMLElementTagNameMap;
  const Component = (ComponentProp || tag) as React.ElementType;
  return React.createElement(
    Component,
    { className: cn(styles[level], 'text-[--color-foreground]', className), ...props }
  );
}
