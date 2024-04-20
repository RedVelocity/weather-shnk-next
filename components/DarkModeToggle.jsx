'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const toggleColorScheme = () => {
    setTheme(() => (theme === 'dark' ? 'light' : 'dark'));
  };
  return (
    <button
      className="relative flex gap-1 p-1 outline-none pill bg-milder focus:ring"
      type="button"
      onClick={() => toggleColorScheme()}
    >
      <span className="relative h-7 w-7">
        <Image fill src="/assets/sun.png" alt="Light Mode" />
      </span>
      <span className="relative h-7 w-7">
        <Image fill src="/assets/half-moon.png" alt="Dark Mode" />
      </span>
      <div
        className={`absolute bg-baseDark ${
          theme === 'dark' ? 'translate-x-0' : 'translate-x-8'
        } text-accent transition-transform duration-500 ease-in-out rounded-full h-7 w-7`}
      />
    </button>
  );
};

export default DarkModeToggle;
