import { Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import { Topics } from './Topics';

export const TopicsDetail: FC = () => {
  const { t } = useTranslation();

  const { query } = useRouter();

  const { feature, aspect } = query;

  return feature && aspect ? (
    <div
      key={`${feature}-${aspect}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left'
      }}
    >
      <Typography variant={'h3'} id={`head-${feature}-${aspect}`}>
        {t(`intro:${feature}-${aspect}`)}
      </Typography>
      <Topics feature={feature as string} aspect={aspect as string} />
    </div>
  ) : null;
};
