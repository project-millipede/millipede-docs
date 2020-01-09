import Icon from '@material-ui/core/Icon';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { loadCSS } from 'fg-loadcss';
import React, { useEffect } from 'react';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > .fas': {
        margin: theme.spacing(2),
        verticalAlign: 'middle',
        height: '100%',
        width: '100%'
      }
    }
  })
);

interface FAIconProps {
  icon: string;
}

const FAIcon = ({ icon }: FAIconProps) => {
  // const classes = useStyles({});

  useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#font-awesome-css')
    );
  }, []);

  return (
    // <div className={classes.root}>
    //   <Icon className={icon} />
    // </div>
    // <Icon className='fa fa-plus-circle' color='action' />
    <Icon className={icon} />
  );
};

export default FAIcon;
