import * as React from 'react';
import { cn } from '@/src/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  interactive?: boolean;
}

export function Card({ as, interactive, className, ...props }: CardProps) {
  const Component = (as || 'div') as React.ElementType;
  return (
    <Component
      className={cn('card', interactive && 'card-interactive', className)}
      {...props}
    />
  );
}
