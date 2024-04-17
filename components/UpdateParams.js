'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// A quirky client component to update params if blank as I'm unable to do server side!
const UpdateParams = ({ location }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const query = searchParams.get('q');
    query === null && router.replace(`/weather?q=${location.name}`);
  }, []);
};

export default UpdateParams;
