import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const Home = async () => {
  const header = headers();
  const IP = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  const res = await fetch(
    `http://ip-api.com/json/${IP}?fields=status,country,regionName,city`
  );
  !res.ok && redirect('/weather?q=Scranton,Pennsylvania,USA');
  const location = await res.json();
  console.log('IP', IP, location);
  redirect('/weather?q=Scranton,Pennsylvania,USA');
};

export default Home;
