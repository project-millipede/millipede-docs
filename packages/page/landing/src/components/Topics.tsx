import { ContentTypes } from '@app/types';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { Item } from '@page/components';
import groupArray from 'group-array';
import get from 'lodash/get';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { translateObject } from './TranslateService';

interface TopicsProps {
  feature: string;
  aspect: string;
}

export const Topics: FC<TopicsProps> = ({ feature, aspect }) => {
  const theme = useTheme();

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
            <Typography variant='h4'>{get(scenariosRaw, scenario)}</Typography>
            {categoriesKeys.map((categoryKey, index) => {
              const categoryData = scenarioData && scenarioData[categoryKey];
              return categoryData ? (
                <div key={`category-${index}`}>
                  <Typography variant='h4'>
                    {get(categoriesRaw, categoryKey)}
                  </Typography>
                  <Grid container sx={{ margin: theme.spacing(3, 0) }}>
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
