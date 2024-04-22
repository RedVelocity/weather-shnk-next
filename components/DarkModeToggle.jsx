'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const renderedTheme = theme === 'system' ? resolvedTheme : theme;
  const toggleColorScheme = () => {
    setTheme(() => (renderedTheme === 'dark' ? 'light' : 'dark'));
  };

  // To identify if it's safe to render theme on client
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <button
      className={`relative flex gap-1 p-1 pill bg-milder ${
        theme === 'system' && 'filter grayscale'
      }`}
      type="button"
      title="Toggle Dark Mode"
      onClick={toggleColorScheme}
    >
      <span className="relative h-7 w-7">
        <Image fill src="/assets/sun.png" alt="Light Mode" />
      </span>
      <span className="relative h-7 w-7">
        <Image fill src="/assets/half-moon.png" alt="Dark Mode" />
      </span>
      <div
        className={`absolute bg-baseDark ${
          renderedTheme === 'dark' ? 'translate-x-0' : 'translate-x-8'
        } text-accent transition-transform duration-500 ease-in-out rounded-full h-7 w-7`}
      />
    </button>
  );
};

export default DarkModeToggle;
