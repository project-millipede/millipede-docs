import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { Topics } from './Topics';

export const Anchor = styled('span')(({ theme }) => ({
  position: 'absolute',
  marginTop: theme.spacing(-10)
}));

export const TopicsDetail: FC = () => {
  const { t } = useTranslation();

  const {
    query: { feature, aspect }
  } = useRouter();

  return feature && aspect ? (
    <div
      key={`${feature}-${aspect}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left'
      }}
    >
      <Typography variant='h3'>
        <Anchor id={`feature-${feature}-aspect-${aspect}`} />
        {t(`intro:${feature}-${aspect}`)}
      </Typography>
      <Topics feature={feature as string} aspect={aspect as string} />
    </div>
  ) : null;
};
