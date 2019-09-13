import React from 'react';
import { useTranslation, WithTranslation } from 'react-i18next';

interface ErrorProps {
  statusCode?: number;
}

type Props = ErrorProps & WithTranslation;

// const Error = ({ statusCode, t }: Props) => {
//   return <p>{statusCode ? t('error-with-status', { statusCode }) : t('error-without-status')}</p>;
// };

const Error = ({ statusCode }: Props) => {
  const { t } = useTranslation();
  return <p>{statusCode ? t('error-with-status', { statusCode }) : t('error-without-status')}</p>;
};

Error.getInitialProps = async ({ res, err }) => {
  let statusCode = null;
  if (res) {
    ({ statusCode } = res);
  } else if (err) {
    ({ statusCode } = err);
  }
  return {
    // namespacesRequired: ['common'],
    statusCode
  };
};

Error.defaultProps = {
  statusCode: null
};

// export default withTranslation('common')(Error);
export default Error;
