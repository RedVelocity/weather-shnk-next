import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: `Weather | redvelo.site`,
  description: `Checkout the weather details for any place!`,
  keywords: [
    'Next.js',
    'React',
    'JavaScript',
    'Weather',
    'redvelo',
    'vercel weather',
    'weather vercel',
    'weather redvelocity',
    'redvelo.site',
    'redvelocity',
    'redvelocity.site',
    'redvelo.city',
    'red velocity',
    'weather red velocity',
  ],
  authors: [{ name: 'RedVelocity', url: 'https://redvelo.site' }],
  creator: 'RedVelocity',
  publisher: 'RedVelocity',
  icons: {
    icon: '/weather-icon.png',
  },
};

const Home = async () => {
  const header = headers();
  const IP = (header.get('x-real-ip') ?? '127.0.0.1').split(',')[0];
  IP === '127.0.0.1' && redirect('/Scranton,Pennsylvania,USA');
  const res = await fetch(
    `http://ip-api.com/json/${IP}?fields=status,country,regionName,city`
  );
  const data = await res.json();
  (!res.ok || data.status === 'fail') && redirect('/Scranton,Pennsylvania,USA');
  const { country, regionName, city } = data;
  redirect(`/${city},${regionName},${country}`);
};

export default Home;
