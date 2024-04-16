import { redirect } from 'next/navigation';

const Home = async () => {
  redirect('/weather?q=Scranton,Pennsylvania,USA');
};

export default Home;
