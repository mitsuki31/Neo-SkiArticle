'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThemeToggle({ size = 18, className = '' }: {
  size?: number, className?: string
}) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const stored = localStorage.getItem('theme');
    const initial = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);

    setIsDark(initial);
    root.classList.toggle('dark', initial);
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const newTheme = !isDark;
    setIsDark(newTheme);
    root.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className={className}>
      {isDark ? <Sun size={size} /> : <Moon size={size} />}
    </Button>
  );
}
