import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

import ExpandableCard, { OverviewProps } from '../../card/ExpandableCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '48px'
    }
  })
);

const topicData: Array<OverviewProps> = [
  {
    title: 'Privacy Enhancing Technology / PET',
    subTitle: 'Make untrusted envrionments trusted.',
    letter: ['PET'],
    link: '/common/dataflow/comparison',
    steps: [{ label: 'a' }, { label: 'b' }, { label: 'c' }]
  },
  {
    title: 'Personal Intrusion Detection and Prevention / PID-P',
    subTitle: 'Approach to fight fake news',
    letter: ['PID/P'],
    link: '/pidp/approach/byExample',
    steps: [{ label: 'd' }, { label: 'e' }, { label: 'f' }]
  }
];

const GuttersGrid = () => {
  const classes = useStyles({});

  return (
    <Grid container className={classes.root} spacing={6}>
      {topicData.map((data, index) => {
        return (
          <Grid key={index} item xs={12} md={6}>
            <ExpandableCard
              title={data.title}
              subTitle={data.subTitle}
              letter={data.letter}
              link={data.link}
              steps={data.steps}
            />
          </Grid>
        );
      })}

      {/* <Grid key={3} item xs={12} md={12}>
        <ExpandableCard
          title='Digital assistant system'
          subTitle='Common approach to make both problems solvable.'
          letter={['PET', 'PID/P']}
          link={'/common/dataflow/comparison'}
          steps={[{ label: 'd' }, { label: 'e' }, { label: 'f' }]}
        />
      </Grid> */}

      {/* Why we think its solvable - because there is a root of the problem is common, 
      approach is identical */}
    </Grid>
  );
};

export default GuttersGrid;
