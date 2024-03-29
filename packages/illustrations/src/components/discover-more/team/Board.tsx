import { HiddenUnderlineLink } from '@app/components';
import { I18n } from '@app/utils';
import { Assignment, GitHub, LinkedIn } from '@mui/icons-material';
import { Avatar, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Translate } from 'next-translate';
import { FC } from 'react';

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

  return (
    <div>
      <Typography variant='h2'>{title}</Typography>
      <Grid container>
        {members.map(member => {
          const { name, flag, city, github, linkedIn } = member;
          return (
            <Grid key={name} xs={12} md={6}>
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
                        component={HiddenUnderlineLink}
                        color='inherit'
                        href={`https://github.com/${github}`}
                      >
                        <GitHub />
                      </IconButton>
                    )}
                    {linkedIn && (
                      <IconButton
                        component={HiddenUnderlineLink}
                        color='inherit'
                        href={`https://www.linkedin.com/in/${linkedIn}`}
                      >
                        <LinkedIn />
                      </IconButton>
                    )}
                    <IconButton
                      component={HiddenUnderlineLink}
                      color='inherit'
                      href={{
                        pathname: '/docs/[...slug]',
                        query: { slug: 'discover-more/team/cv'.split('/') }
                      }}
                    >
                      <Assignment />
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
  const { t } = I18n.useTranslation();
  return (
    <>
      <Group
        title={t('common:active-core-team-title')}
        members={getActiveCoreMembers(t)}
      />
    </>
  );
};
