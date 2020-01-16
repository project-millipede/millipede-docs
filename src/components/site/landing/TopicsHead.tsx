import { IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import _ from 'lodash';
import { TFunction } from 'next-i18next-serverless';
import { useRouter } from 'next/router';
import React from 'react';
import { WithTranslation } from 'react-i18next';

import CustomIcon from '../../../../docs/src/modules/components/icon/CustomIcon';
import { withTranslation } from '../../../../i18n';
import { OverviewProps } from '../../../typings/data/import';
import { TopReveal } from '../../animation/framer/components/text/TopReveal';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      marginTop: '48px'
    }
  })
);

const generateTopics = (t: TFunction): Array<OverviewProps> => {
  const topics: Array<OverviewProps> = t('topics', { returnObjects: true });
  if (_.isArray(topics)) {
    return topics;
  }
  return [];
};

const renderTopics = (topics: Array<OverviewProps>) => {
  const router = useRouter();
  return (
    <>
      {topics.length > 0
        ? topics.map((topic, index) => {
            return (
              <Grid key={index} item xs={12} md={6}>
                <TopReveal
                  id={`animation-${index}`}
                  text={[...topic.title, ...topic.subTitle]}
                />
                {topic.contextLink
                  ? topic.contextLink.perspectives.map(perspective => {
                      return (
                        <IconButton
                          onClick={() => {
                            router.push(
                              `${router.pathname}?${perspective.type}=${topic.contextLink.id}#${topic.contextLink.id}`
                            );
                          }}
                        >
                          <CustomIcon icon={perspective.icon} />
                        </IconButton>
                      );
                    })
                  : null}
              </Grid>
            );
          })
        : null}
    </>
  );
};

type Props = WithTranslation;

const TopicsHead = ({ t }: Props) => {
  const classes = useStyles({});

  const topics = generateTopics(t);

  return (
    <Grid container className={classes.root} spacing={6}>
      {renderTopics(topics)}
    </Grid>
  );
};

TopicsHead.getInitialProps = async () => {
  return {
    namespacesRequired: ['pages/topics/index']
  };
};

export default withTranslation('pages/topics/index')(TopicsHead);
