import { useRef } from 'react';
import { Card } from '@/components/ui/card';

export default function FocusableCard({ children, className = '' }: {
    children: React.ReactNode;
    className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    cardRef.current?.classList.add('is-focused');
  };

  const handleBlur = () => {
    cardRef.current?.classList.remove('is-focused');
  };

  return (
    <Card
      ref={cardRef}
      tabIndex={0}
      onClick={handleFocus}
      onBlur={handleBlur}
      onTouchStart={handleFocus}
      className={className}
    >
      {children}
    </Card>
  );
}
