import '@/styles/globals.css';

// import { LazyMotion, domAnimation } from 'framer-motion';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default async function RootLayout({ children }) {
  const res = await fetch(
    'https://gist.githubusercontent.com/RedVelocity/424379247e7f4ce37d50c7f9a5d07a0a/raw/host.json'
  );
  const host = await res.json();
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Header hostName={host.hostName} hostUrl={host.hostUrl} />
        {/* <LazyMotion features={domAnimation}> */}
        <main className="flex-1 min-w-full">{children}</main>
        {/* </LazyMotion> */}
        <Footer />
      </body>
    </html>
  );
}
