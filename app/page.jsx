import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const Home = async () => {
  const header = headers();
  const IP = (header.get('x-real-ip') ?? '127.0.0.1').split(',')[0];
  const res = await fetch(
    `http://ip-api.com/json/${IP}?fields=status,country,regionName,city`
  );
  !res.ok && redirect('/weather?q=Scranton,Pennsylvania,USA');
  const location = await res.json();
  const { country, regionName, city } = location;
  console.log('IP', IP, location);
  redirect(`/weather?q=${city},${regionName},${country}`);
};

export default Home;
