import useTranslation from 'next-translate/useTranslation';
import React from 'react';

interface ErrorProps {
  statusCode?: number;
}

const Error = ({ statusCode }: ErrorProps) => {
  const { t } = useTranslation();
  return (
    <p>
      {statusCode
        ? t('common:error-with-status', { statusCode })
        : t('common:error-without-status')}
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
