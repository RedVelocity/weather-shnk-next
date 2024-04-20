import '@/styles/globals.css';

import Header from '@/components/header';
import Footer from '@/components/footer';
import Providers from '@/app/Providers';

export default async function RootLayout({ children }) {
  const res = await fetch(
    'https://gist.githubusercontent.com/RedVelocity/424379247e7f4ce37d50c7f9a5d07a0a/raw/host.json',
    { next: { revalidate: 604800 } }
  );
  const host = await res.json();
  return (
    <html lang="en" suppressHydrationWarning>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Providers>
          <Header hostName={host.hostName} hostUrl={host.hostUrl} />
          <main className="flex-1 min-w-full">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
