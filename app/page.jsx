import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const Home = async () => {
  const header = headers();
  const IP = (header.get('x-real-ip') ?? '127.0.0.1').split(',')[0];
  const res = await fetch(
    `http://ip-api.com/json/${IP}?fields=status,country,regionName,city`
  );
  const data = await res.json();
  (!res.ok || data.status === 'fail') &&
    redirect('/weather?q=Scranton,Pennsylvania,USA');
  const { country, regionName, city } = data;
  // console.log('IP', IP, location);
  redirect(`/weather?q=${city},${regionName},${country}`);
};

export default Home;
