import { Link } from '@app/components';
import { Avatar, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { GitHub, LinkedIn } from '@material-ui/icons';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

export const getActiveCoreMembers = (t: Translate) => [
  {
    name: 'Gritsch Markus',
    github: 'gurkerl83',
    linkedIn: 'markus-gritsch-70952126',
    flag: t('common:founder'),
    city: `${t('common:munich')}, ${t('common:germany')}`
  }
];

interface GroupProps {
  title: string;
  members: Array<any>;
}

const Group: FC<GroupProps> = ({ title, members }) => {
  const theme = useTheme();

  const { push } = useRouter();

  const handleSelect = (link: string) => {
    push({
      pathname: '/docs/[...slug]',
      query: { slug: link.split('/') }
    });
  };

  return (
    <div>
      <Typography variant='h2'>{title}</Typography>
      <Grid container>
        {members.map(member => {
          const { name, flag, city, github, linkedIn } = member;
          return (
            <Grid item key={name} xs={12} md={6}>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Avatar
                    sx={{ margin: theme.spacing(2) }}
                    src={`https://github.com/${github}.png`}
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant='h6'
                    sx={{
                      fontSize: theme.spacing(3),
                      margin: theme.spacing(2, 0)
                    }}
                  >
                    {name}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {flag}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {city}
                  </Typography>
                  <Box sx={{ display: 'flex' }}>
                    {github && (
                      <IconButton
                        color='inherit'
                        component={Link}
                        href={`https://github.com/${github}`}
                      >
                        <GitHub />
                      </IconButton>
                    )}
                    {linkedIn && (
                      <IconButton
                        color='inherit'
                        component={Link}
                        href={`https://www.linkedin.com/in/${linkedIn}`}
                      >
                        <LinkedIn />
                      </IconButton>
                    )}
                    <IconButton
                      key={`discover-more/team/cv`}
                      onClick={_e => {
                        handleSelect('discover-more/team/cv');
                      }}
                    >
                      <AssignmentIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
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
    <>
      <Group
        title={t('common:active-core-team-title')}
        members={getActiveCoreMembers(t)}
      />
    </>
  );
};
