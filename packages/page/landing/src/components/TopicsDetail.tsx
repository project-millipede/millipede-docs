import { Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import { Topics } from './Topics';

// import { useQueryParam } from 'use-query-params';

export const TopicsDetail: FC = () => {
  const { t } = useTranslation();

  const { query } = useRouter();

  const { feature, aspect } = query;

  // const [feature] = useQueryParam<string>('feature');
  // const [aspect] = useQueryParam<string>('aspect');

  return feature && aspect ? (
    <div
      key={`${feature}-${aspect}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left'
      }}
    >
      {/* <Components.Head.InteractiveHead
        variant={'h4'}
        id={`head-${feature}-${aspect}`}
      >
        {t(`intro:${feature}-${aspect}`)}
      </Components.Head.InteractiveHead> */}

      <Typography variant={'h4'} id={`head-${feature}-${aspect}`}>
        {t(`intro:${feature}-${aspect}`)}
      </Typography>
      <Topics feature={feature as string} aspect={aspect as string} />
    </div>
  ) : null;
};
