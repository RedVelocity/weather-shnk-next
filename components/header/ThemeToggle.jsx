'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isSystemTheme = theme === 'system';
  const renderedTheme = isSystemTheme ? resolvedTheme : theme;
  const isDarkMode = renderedTheme === 'dark';
  const toggleColorScheme = () => {
    setTheme(() => (isDarkMode ? 'light' : 'dark'));
  };

  const toggleSystemTheme = () => {
    setTheme(() => (isSystemTheme ? resolvedTheme : 'system'));
  };

  // To identify if it's safe to render theme on client
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      <button
        className={`relative flex gap-1 p-1 pill bg-milder ${
          isSystemTheme && 'filter grayscale'
        }`}
        type="button"
        title="Toggle Theme"
        onClick={toggleColorScheme}
      >
        <span className="relative h-7 w-7">
          <Image fill src="/assets/icons/sun.png" alt="Light Mode" />
        </span>
        <span className="relative h-7 w-7">
          <Image fill src="/assets/icons/half-moon.png" alt="Dark Mode" />
        </span>
        <div
          className={`absolute bg-base-dark ${
            isDarkMode ? 'translate-x-0' : 'translate-x-8'
          } text-accent transition-transform duration-500 ease-in-out rounded-full h-7 w-7`}
        />
      </button>
      <button
        className={`relative h-8 w-8 rounded-full ${
          !isSystemTheme && 'filter grayscale'
        }`}
        type="button"
        title="Toggle System Theme"
        onClick={toggleSystemTheme}
      >
        <Image
          fill
          src="/assets/icons/sun-and-moon.png"
          alt="Toggle System Theme"
        />
      </button>
    </div>
  );
};

export default ThemeToggle;
