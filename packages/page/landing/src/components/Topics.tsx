import { ContentTypes } from '@app/types';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Item } from '@page/components';
import groupArray from 'group-array';
import get from 'lodash/get';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { translateObject } from './TranslateService';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  header: {
    textAlign: 'left'
  }
}));

interface TopicsProps {
  feature: string;
  aspect: string;
}

export const Topics: FC<TopicsProps> = ({ feature, aspect }) => {
  const classes = useStyles();

  const { t } = useTranslation();

  const scenariosRaw = t(
    `pages/${feature}/intro/${aspect}/index:scenarios`,
    {},
    { returnObjects: true }
  );

  const scenarioKeys = Object.keys(scenariosRaw);

  const categoriesRaw = t(
    `pages/${feature}/intro/${aspect}/index:categories`,
    {},
    { returnObjects: true }
  );
  const categoriesKeys = Object.keys(categoriesRaw);

  const data = translateObject<ContentTypes.OverviewProps>(
    t,
    `pages/${feature}/intro/${aspect}/index:topics`
  );

  const dataGrouped: ContentTypes.Scenario = groupArray(
    data,
    'scenario',
    'category'
  );

  return (
    <>
      {scenarioKeys.map((scenario, index) => {
        const scenarioData = dataGrouped && dataGrouped[scenario];
        return scenarioData ? (
          <div key={`scenario-${index}`}>
            <Typography variant='h5' className={classes.header}>
              {get(scenariosRaw, scenario)}
            </Typography>
            {categoriesKeys.map((categoryKey, index) => {
              const categoryData = scenarioData && scenarioData[categoryKey];
              return categoryData ? (
                <div key={`category-${index}`}>
                  <Typography variant='h6' className={classes.header}>
                    {get(categoriesRaw, categoryKey)}
                  </Typography>
                  <Grid container className={classes.root}>
                    {categoryData.map((data, index) => {
                      const { title, description, link, icon } = data;
                      return (
                        <Grid item key={index} xs={12} md={6}>
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
