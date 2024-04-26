'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const SystemThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const toggleColorScheme = () => {
    setTheme(() => (theme === 'system' ? resolvedTheme : 'system'));
  };

  // To identify if it's safe to render theme on client
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <button
      className={`relative flex gap-1 p-1 pill bg-cool ${
        theme !== 'system' && 'filter grayscale'
      }`}
      type="button"
      title="Toggle System Theme"
      onClick={toggleColorScheme}
    >
      <span className="relative h-7 w-7">
        <Image
          fill
          src="/assets/icons/sun-and-moon.png"
          alt="Toggle System Theme"
        />
      </span>
    </button>
  );
};

export default SystemThemeToggle;
