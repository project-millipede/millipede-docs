import { useRouter } from 'next/router';
import { forwardRef } from 'react';
import React from 'react';

const customWithRouter = Component => {
  const WithRouter = forwardRef((props, ref) => {
    const router = useRouter();
    return <Component ref={ref} router={router} {...props} />;
  });

  return WithRouter;
};

export default customWithRouter;
