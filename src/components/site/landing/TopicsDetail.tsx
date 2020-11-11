import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import { NextRouter, useRouter } from 'next/router';
import React from 'react';

import { InteractiveHead } from '../../../../docs/src/markdown/components/head';
import { Topics } from './Topics';

const generateIntro = (router: NextRouter, t: Translate) => {
  const { query } = router;

  const entries = Object.entries(query);

  if (entries.length > 0) {
    const [aspect, featureName] = entries[0];

    if (aspect != null) {
      return (
        <div
          key={`${aspect}-${featureName}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left'
          }}
        >
          <InteractiveHead variant={'h4'} id={`head-${aspect}-${featureName}`}>
            {t(`common:${aspect}-${featureName}`)}
          </InteractiveHead>
          <Topics featureName={featureName as string} aspect={aspect} />
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
  return <div>{intro}</div>;
};

export default TopicsDetail;
