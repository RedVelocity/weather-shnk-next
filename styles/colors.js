import resolveConfig from 'tailwindcss/resolveConfig';
// eslint-disable-next-line import/extensions
import tailwindConfig from '@/tailwind.config.js';

const config = resolveConfig(tailwindConfig);
const { theme } = config;

export default theme.colors;
