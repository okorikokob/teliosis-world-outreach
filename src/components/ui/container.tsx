import * as React from 'react';
import { cn } from '@/src/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const widthMap = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'w-full'
};

export function Container({ width = 'xl', className, ...props }: ContainerProps) {
  return <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', widthMap[width], className)} {...props} />;
}
