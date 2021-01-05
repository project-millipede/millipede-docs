import { createStyles, makeStyles, Theme } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { GitHub, Twitter } from '@material-ui/icons';
import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

export const getActiveCoreMembers = (t: Translate) => [
  {
    name: 'Gritsch Markus',
    github: 'gurkerl83',
    flag: t('common:founder'),
    city: `${t('common:munich')}, ${t('common:germany')}`
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

const Group: FC<GroupProps> = ({ title, description, members }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography gutterBottom component='h2' variant='h5'>
        {title}
      </Typography>
      <Typography>{description}</Typography>

      {/* className={classes.container} */}
      <Grid container spacing={2}>
        {members.map(member => {
          const { name, flag, city, github, twitter } = member;

          return (
            <Grid key={name} item xs={12} md={6}>
              <Paper>
                <Grid container wrap='nowrap'>
                  <Grid item>
                    <CardMedia
                      className={classes.cover}
                      image={`https://github.com/${github}.png`}
                      title='Avatar'
                    />
                  </Grid>
                  <Grid item>
                    <div className={classes.details}>
                      <Typography component='h3' variant='h6'>
                        {name}
                      </Typography>
                      <Typography variant='body2' color='textSecondary'>
                        {flag}
                      </Typography>
                      <Typography variant='body2' color='textSecondary'>
                        {city}
                      </Typography>
                      <Grid container>
                        {github && (
                          <IconButton
                            component='a'
                            href={`https://github.com/${github}`}
                            className={classes.icon}
                          >
                            <GitHub fontSize='inherit' />
                          </IconButton>
                        )}
                        {twitter && (
                          <IconButton
                            component='a'
                            href={`https://twitter.com/${twitter}`}
                            className={classes.icon}
                          >
                            <Twitter fontSize='inherit' />
                          </IconButton>
                        )}
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export const Board: FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Group
        title={t('common:active-core-team-title')}
        description={t('common:active-core-team-description')}
        members={getActiveCoreMembers(t)}
      />
      <Group
        title={t('common:emeriti-core-team-title')}
        description={t('common:emeriti-core-team-description')}
        members={getEmeritiCoreMembers()}
      />
      <Group
        title={t('common:community-partners-title')}
        description={t('common:community-partners-description')}
        members={getCommunityPartners()}
      />
    </div>
  );
};
