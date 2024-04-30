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
      className={`relative h-8 w-8 rounded-full ${
        theme !== 'system' && 'filter grayscale'
      }`}
      type="button"
      title="Toggle System Theme"
      onClick={toggleColorScheme}
    >
      <Image
        fill
        src="/assets/icons/sun-and-moon.png"
        alt="Toggle System Theme"
      />
    </button>
  );
};

export default SystemThemeToggle;
