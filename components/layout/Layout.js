import { useRouter } from 'next/router';

import MetaTags from './MetaTags';

const Layout = ({ metaTags = {}, pageTitle, children }) => {
  const router = useRouter();

  return (
    <>
      <MetaTags tags={metaTags} path={router.asPath} pageTitle={pageTitle} />
      {children}
    </>
  );
};

export default Layout;
