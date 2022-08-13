import { ContentTypes } from '@app/types';
import { I18n } from '@app/utils';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { Item } from '@page/components';
import groupArray from 'group-array';
import { FC } from 'react';

interface ScenarioMap {
  [key: string]: { title: string; info: string };
}

interface CategoryMap {
  [key: string]: string;
}
interface TopicsProps {
  feature: string;
  aspect: string;
}

export const Topics: FC<TopicsProps> = ({ feature, aspect }) => {
  const theme = useTheme();

  const { t } = I18n.useTranslation(`pages/${feature}/intro/${aspect}/index`);

  const scenarioMap = t<ScenarioMap>('scenarios', {}, { returnObjects: true });
  const scenarioKeys = Object.keys(scenarioMap);

  const categoryMap = t<CategoryMap>('categories', {}, { returnObjects: true });
  const categoryKeys = Object.keys(categoryMap);

  const data = t<Array<ContentTypes.OverviewProps>>(
    'topics',
    {},
    {
      returnObjects: true,
      fallback: []
    }
  );

  const groupedData: ContentTypes.Scenario = groupArray(
    data,
    'scenario',
    'category'
  );

  return (
    <>
      {scenarioKeys.map(scenarioId => {
        const scenarioData = groupedData && groupedData[scenarioId];
        return scenarioData ? (
          <div key={`scenario-${scenarioId}`}>
            <Typography variant='h4'>
              {scenarioMap?.[scenarioId]?.title}
            </Typography>
            <Typography variant='h5'>
              {scenarioMap?.[scenarioId]?.info}
            </Typography>
            {categoryKeys.map(categoryId => {
              const categoryData = scenarioData && scenarioData[categoryId];
              return categoryData ? (
                <div key={`category-${categoryId}`}>
                  <Typography variant='h4'>
                    {categoryMap?.[categoryId]}
                  </Typography>
                  <Grid container sx={{ margin: theme.spacing(3, 0) }}>
                    {categoryData.map((category, index) => {
                      const { title, description, link, icon } = category;
                      return (
                        <Grid key={index} xs={12} md={6}>
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
