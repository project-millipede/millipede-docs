import { WithRouterProps } from 'next/dist/client/with-router';
import NextHead from 'next/head';
import { withRouter } from 'next/router';
import React from 'react';

import { useTranslation } from '../../../../i18n';

interface OProps extends WithRouterProps {
  description?: string;
  title?: string;
}

type Props = OProps & WithRouterProps;

const Head = ({ title = 'headTitle', description = 'strapline' }: Props) => {
  const { t } = useTranslation();
  return (
    <NextHead>
      <title>{t(title)}</title>
      <meta name='description' content={t(description)} />
    </NextHead>
  );
};

export default withRouter(Head);
