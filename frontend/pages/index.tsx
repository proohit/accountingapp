import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Routes from '../src/shared/constants/Routes';

export default function Home() {
  const router = useRouter();
  router.push(Routes.DASHBOARD);
  return <Fragment />;
}
