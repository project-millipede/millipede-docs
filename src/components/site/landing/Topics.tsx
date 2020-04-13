import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import groupArray from 'group-array';
import _ from 'lodash';
import React, { FC } from 'react';

import { Item } from '../../../../docs/src/modules/components/common/grid/Item';
import { useTranslation } from '../../../../i18n';
import { OverviewProps, Scenario } from '../../../typings/data/import';
import { translateContent } from './TranslateService';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginTop: '24px',
      marginBottom: '24px'
    },
    header: {
      textAlign: 'left'
    },
    scenario: {},
    category: {}
  })
);

interface TopicsProps {
  featureName: string;
  aspect: string;
}

export const Topics: FC<TopicsProps> = ({ featureName, aspect }) => {
  const classes = useStyles();

  const { t } = useTranslation(`pages/${featureName}/intro/${aspect}/index`);

  const scenariosRaw: any = t('scenarios', { returnObjects: true });
  const scenarioKeys = Object.keys(scenariosRaw);

  const categoriesRaw: any = t('categories', { returnObjects: true });
  const categoriesKeys = Object.keys(categoriesRaw);

  const data = translateContent<OverviewProps>(t, 'topics');

  const dataGrouped: Scenario = groupArray(data, 'scenario', 'category');

  return (
    <>
      {scenarioKeys.map((scenario, index) => {
        const scenarioData = dataGrouped && dataGrouped[scenario];
        return scenarioData ? (
          <div key={`scenario-${index}`}>
            <Typography variant='h5' className={classes.header}>
              {_.get(scenariosRaw, scenario)}
            </Typography>
            {categoriesKeys.map((categoryKey, index) => {
              const categoryData = scenarioData && scenarioData[categoryKey];
              return categoryData ? (
                <div key={`category-${index}`}>
                  <Typography variant='h6' className={classes.header}>
                    {_.get(categoriesRaw, categoryKey)}
                  </Typography>
                  <Grid container className={classes.root} spacing={6}>
                    {categoryData.map((data, index) => {
                      const { title, description, link, icon } = data;
                      return (
                        <Grid key={index} item xs={12} md={6}>
                          <Item
                            title={title}
                            description={description}
                            link={link}
                            icon={icon}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
              ) : null;
            })}
          </div>
        ) : null;
      })}
    </>
  );
};
