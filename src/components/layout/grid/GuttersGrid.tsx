import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TFunction } from 'next-i18next-serverless';
import React from 'react';
import { WithTranslation } from 'react-i18next';

import { withTranslation } from '../../../../i18n';
import { OverviewProps } from '../../../typings/data/import';
import ExpandableCard from '../../card/ExpandableCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '48px'
    }
  })
);

const generateTopicData = (t: TFunction): Array<OverviewProps> => {
  const topics: Array<OverviewProps> = t('topics', { returnObjects: true });

  const template: Array<OverviewProps> = [
    {
      letter: ['PET'],
      link: '/common/dataflow/comparison',
      steps: [{ label: 'a' }, { label: 'b' }, { label: 'c' }]
    },
    {
      letter: ['PID/P'],
      link: '/pidp/approach/byExample',
      steps: [{ label: 'd' }, { label: 'e' }, { label: 'f' }]
    }
  ];

  return template.map((templateItem, index) => {
    return {
      ...templateItem,
      title: topics[index].title,
      description: topics[index].description,
      // steps: {
      //   ...templateItem.steps[index],
      //   ...topics[index].steps
      steps: topics[index].steps
    };
  });
};

type Props = WithTranslation;

const GuttersGrid = ({ t }: Props) => {
  const classes = useStyles({});

  return (
    <Grid container className={classes.root} spacing={6}>
      {generateTopicData(t).map((data, index) => {
        return (
          <Grid key={index} item xs={12} md={6}>
            <ExpandableCard
              title={data.title}
              description={data.description}
              letter={data.letter}
              link={data.link}
              steps={data.steps}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

GuttersGrid.getInitialProps = async () => {
  return {
    namespacesRequired: ['pages/topics/index']
  };
};

export default withTranslation('pages/topics/index')(GuttersGrid);
