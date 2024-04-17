import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const Home = async () => {
  const header = headers();
  const IP = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  console.log('IP', IP);
  redirect('/weather?q=Scranton,Pennsylvania,USA');
};

export default Home;
