import React from 'react';

import { useTranslation } from '../i18n';

interface ErrorProps {
  statusCode?: number;
}

const Error = ({ statusCode }: ErrorProps) => {
  const { t } = useTranslation();
  return (
    <p>
      {statusCode
        ? t('error-with-status', { statusCode })
        : t('error-without-status')}
    </p>
  );
};

Error.getInitialProps = async ({ res, err }) => {
  let statusCode = null;
  if (res) {
    ({ statusCode } = res);
  } else if (err) {
    ({ statusCode } = err);
  }
  return {
    statusCode
  };
};

Error.defaultProps = {
  statusCode: null
};

export default Error;
