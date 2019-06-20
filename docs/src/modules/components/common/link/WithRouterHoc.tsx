import { useRouter } from 'next/router';
import React, { forwardRef } from 'react';

const customWithRouter = Component => {
  const WithRouter = forwardRef((props, ref) => {
    const router = useRouter();
    return <Component ref={ref} router={router} {...props} />;
  });

  return WithRouter;
};

export default customWithRouter;
