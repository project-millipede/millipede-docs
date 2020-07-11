import { createStyles, makeStyles, Theme } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import { TFunction } from 'next-i18next';
import React from 'react';

import { useTranslation } from '../../../../../i18n';

export const getActiveCoreMembers = (t: TFunction) => [
  {
    name: 'Gritsch Markus',
    github: 'gurkerl83',
    flag: t('founder'),
    city: `${t('munich')}, ${t('germany')}`
  }
];

export const getEmeritiCoreMembers = () => [];

export const getCommunityPartners = () => [];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    details: {
      margin: theme.spacing(1, 1, 1, 0)
    },
    cover: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      margin: theme.spacing(2),
      borderRadius: '50%',
      flexShrink: 0,
      backgroundColor: theme.palette.background.default
    },
    icon: {
      fontSize: 18,
      padding: theme.spacing(1)
    },
    container: {
      margin: theme.spacing(2, 0, 4)
    }
  })
);

interface GroupProps {
  title: string;
  description: string;
  members: Array<any>;
}

const Group = (props: GroupProps) => {
  const { title, description, members } = props;

  const classes = useStyles();

  return (
    <div>
      <Typography gutterBottom component='h2' variant='h5'>
        {title}
      </Typography>
      <Typography>{description}</Typography>

      {/* className={classes.container} */}
      <Grid container spacing={2}>
        {members.map(member => (
          <Grid key={member.name} item xs={12} md={6}>
            <Paper>
              <Grid container wrap='nowrap'>
                <Grid item>
                  <CardMedia
                    className={classes.cover}
                    image={`https://github.com/${member.github}.png`}
                    title='Avatar'
                  />
                </Grid>
                <Grid item>
                  <div className={classes.details}>
                    <Typography component='h3' variant='h6'>
                      {member.name}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {member.flag}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {member.city}
                    </Typography>
                    <Grid container>
                      {member.github && (
                        <IconButton
                          aria-label='github'
                          component='a'
                          href={`https://github.com/${member.github}`}
                          className={classes.icon}
                        >
                          <GitHubIcon fontSize='inherit' />
                        </IconButton>
                      )}
                      {member.twitter && (
                        <IconButton
                          aria-label='twitter'
                          component='a'
                          href={`https://twitter.com/${member.twitter}`}
                          className={classes.icon}
                        >
                          <TwitterIcon fontSize='inherit' />
                        </IconButton>
                      )}
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const Team = (props: any) => {
  const { t } = useTranslation();
  return (
    <div>
      <Group
        title={t('active-core-team-title')}
        description={t('active-core-team-description')}
        members={getActiveCoreMembers(t)}
        {...props}
      />
      <Group
        title={t('emeriti-core-team-title')}
        description={t('emeriti-core-team-description')}
        members={getEmeritiCoreMembers()}
        {...props}
      />
      <Group
        title={t('community-partners-title')}
        description={t('community-partners-description')}
        members={getCommunityPartners()}
        {...props}
      />
    </div>
  );
};

export default Team;
