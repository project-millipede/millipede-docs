import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import groupArray from 'group-array';
import _ from 'lodash';
import { TFunction } from 'next-i18next-serverless';
import React, { FC } from 'react';

import { Item } from '../../../../docs/src/modules/components/common/grid/Item';
import { useTranslation } from '../../../../i18n';
import { OverviewProps, Scenario } from '../../../typings/data/import';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      marginTop: '24px',
      marginBottom: '24px'
    },
    header: {
      textAlign: 'left'
    }
  })
);

const generateTopicData = (t: TFunction): Array<OverviewProps> => {
  const topics: Array<OverviewProps> = t('topics', { returnObjects: true });
  if (_.isArray(topics)) {
    return topics;
  }
  return [];
};

interface TopicsProps {
  featureName: string;
  aspect: string;
}

export const Topics: FC<TopicsProps> = ({ featureName, aspect }) => {
  const classes = useStyles({});

  const { t } = useTranslation(`pages/${featureName}/intro/${aspect}/index`);

  const scenariosRaw: any = t('scenarios', { returnObjects: true });
  const scenarios = Object.keys(scenariosRaw);

  const categoriesRaw: any = t('categories', { returnObjects: true });
  const categories = Object.keys(categoriesRaw);

  const topics = generateTopicData(t);

  const categorySections: Scenario = groupArray(topics, 'scenario', 'category');

  return (
    <>
      {scenarios.map(scenario => {
        return categorySections && categorySections[scenario] ? (
          <>
            <Typography variant='h3' component='h3' className={classes.header}>
              {_.get(scenariosRaw, scenario)}
            </Typography>
            {categories.map(category => {
              return categorySections &&
                categorySections[scenario] &&
                categorySections[scenario][category] ? (
                <>
                  <Typography
                    variant='h4'
                    component='h4'
                    className={classes.header}
                  >
                    {_.get(categoriesRaw, category)}
                  </Typography>
                  <Grid container className={classes.root} spacing={6}>
                    {categorySections[scenario][category].map((data, index) => {
                      return (
                        <Grid key={index} item xs={12} md={6}>
                          <Item
                            title={data.title}
                            description={data.description}
                            link={data.link}
                            icon={data.icon}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </>
              ) : null;
            })}
          </>
        ) : null;
      })}
    </>
  );
};
