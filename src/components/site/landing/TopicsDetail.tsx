import { TFunction } from 'next-i18next-serverless';
import { NextRouter, useRouter } from 'next/router';
import React from 'react';

import { InteractiveHead } from '../../../../docs/src/markdown/components/head';
import { useTranslation } from '../../../../i18n';
import { Topics } from './Topics';

const generateIntro = (router: NextRouter, t: TFunction) => {
  const { query } = router;

  const entries = Object.entries(query);

  if (entries.length > 0) {
    const [aspect, featureName] = entries[0];

    if (aspect != null) {
      return (
        <div
          key={`feature-${featureName}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left'
          }}
        >
          <InteractiveHead variant={'h3'} id={'pidp'}>
            {t(`feature-${featureName}`)}
          </InteractiveHead>
          <Topics
            key={`feature-${aspect}-${featureName}`}
            featureName={featureName as string}
            aspect={aspect}
          />
        </div>
      );
    }
  }
  return null;
};

const TopicsDetail = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const intro = generateIntro(router, t);
  return (
    <div
      style={{
        marginTop: '60px'
      }}
    >
      {intro}
    </div>
  );
};

export default TopicsDetail;
