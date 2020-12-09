import { Archer } from '@app/components';
import { Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { NoteText } from './text';

const useStyles = makeStyles(() =>
  createStyles({
    // row: {
    //   margin: '100px 0',
    //   display: 'flex',
    //   justifyContent: 'space-between'
    // },
    // column: {
    //   // margin: '0 100px',
    //   margin: '100px 0',
    //   display: 'flex',
    //   flexDirection: 'column',
    //   justifyContent: 'space-between'
    // },
    // box: {
    //   padding: '10px',
    //   border: '3px solid black',
    //   width: '150px'
    //   // maxWidth: '120px'
    // },
    // boxWrapper: {
    //   padding: '10px',
    //   border: '3px solid black',
    //   margin: '100px 0'
    // },

    // title: {
    //   textAlign: 'center'
    //   // fontWeight: 'bold'
    // }

    row: {
      margin: '100px 0',
      display: 'flex',
      justifyContent: 'center'
    },

    rowBottom: {
      marginTop: '100px',
      marginBottom: '25px',
      display: 'flex',
      justifyContent: 'center'
    },

    rowTop: {
      marginTop: '25px',
      marginBottom: '100px',
      display: 'flex',
      justifyContent: 'center'
    },

    rowTop2: {
      marginTop: '25px',
      marginBottom: '100px',
      display: 'flex',
      justifyContent: 'space-between'
    },

    rowBottom2: {
      marginTop: '100px',
      marginBottom: '25px',
      display: 'flex',
      justifyContent: 'space-between'
    },

    rowWithTwoColumns: {
      margin: '100px 0',
      display: 'flex',
      justifyContent: 'space-between'
    },
    box: {
      padding: '10px',
      border: '3px solid black',
      maxWidth: '150px'
    },
    title: {
      textAlign: 'center',
      fontWeight: 'bold'
    }
  })
);

const contentFunctionA = `public int a(){
  int x = b();
  ...
}`;

const contentFunctionB = `public int b(){
  ...
  return c;
}`;

const contentFunctionHook = `public int hook_b(){
  ...
  return d;
}`;

const contentFunctionResult = `public int a(){
  int x = c;
  ...
}`;

const contentFunctionHookResult = `public int a(){
  int x = d;
  ...
}`;

const Diagram = () => {
  const classes = useStyles();
  return (
    <Archer.ArcherContainer noCurves strokeColor='gray'>
      {/* <div className='center-flex__2-of-2'> */}
      <div className={classes.row}>
        <Archer.ArcherElement
          id='a'
          relations={[
            {
              targetId: 'b',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
            }
          ]}
        >
          <Box className={classes.box}>
            <NoteText variant={'body2'}>{contentFunctionA}</NoteText>
          </Box>
        </Archer.ArcherElement>
        <Archer.ArcherElement
          id='aa'
          relations={[
            {
              targetId: 'bbb',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
            }
          ]}
        >
          <Box className={classes.box}>
            <NoteText variant={'body2'}>{contentFunctionA}</NoteText>
          </Box>
        </Archer.ArcherElement>
      </div>
      <div className={classes.row}>
        <Archer.ArcherElement
          id='b'
          relations={[
            {
              targetId: 'c',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
            }
          ]}
        >
          <Box className={classes.box}>
            <NoteText variant={'body2'}>{contentFunctionB}</NoteText>
          </Box>
        </Archer.ArcherElement>
        <Archer.ArcherElement
          id='bb'
          relations={[
            {
              targetId: 'bbb',
              targetAnchor: 'left',
              sourceAnchor: 'right'
            }
          ]}
        >
          <Box className={classes.box} sx={{ bgcolor: 'error.main' }}>
            <NoteText variant={'body2'}>{contentFunctionB}</NoteText>
          </Box>
        </Archer.ArcherElement>
        <Archer.ArcherElement
          id='bbb'
          relations={[
            {
              targetId: 'bb',
              targetAnchor: 'right',
              sourceAnchor: 'left'
            },
            {
              targetId: 'cc',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
            }
          ]}
        >
          <Box className={classes.box} sx={{ bgcolor: 'success.main' }}>
            <NoteText variant={'body2'}>{contentFunctionHook}</NoteText>
          </Box>
        </Archer.ArcherElement>
      </div>
      {/* <div className='center-flex__2-of-2'> */}
      <div className={classes.row}>
        <Archer.ArcherElement id='c'>
          <Box className={classes.box}>
            <NoteText variant={'body2'}>{contentFunctionResult}</NoteText>
          </Box>
        </Archer.ArcherElement>
        <Archer.ArcherElement id='cc'>
          <Box className={classes.box}>
            <NoteText variant={'body2'}>{contentFunctionHookResult}</NoteText>
          </Box>
        </Archer.ArcherElement>
      </div>
    </Archer.ArcherContainer>
  );
};

export const FunctionBeahvior = () => {
  const classes = useStyles();

  return (
    <Archer.ArcherContainer noCurves strokeColor='gray'>
      <div className={classes.rowTop}>
        <Archer.ArcherElement
          id='a'
          relations={[
            {
              targetId: 'b',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
            }
          ]}
        >
          <Box className={classes.box}>
            <NoteText variant={'body2'}>{contentFunctionA}</NoteText>
          </Box>
        </Archer.ArcherElement>
      </div>
      <div className={classes.row}>
        <Archer.ArcherElement
          id='b'
          relations={[
            {
              targetId: 'c',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
            }
          ]}
        >
          <Box className={classes.box}>
            <NoteText variant={'body2'}>{contentFunctionB}</NoteText>
          </Box>
        </Archer.ArcherElement>
      </div>
      <div className={classes.rowBottom}>
        <Archer.ArcherElement id='c'>
          <Box className={classes.box}>
            <NoteText variant={'body2'}>{contentFunctionResult}</NoteText>
          </Box>
        </Archer.ArcherElement>
      </div>
    </Archer.ArcherContainer>
  );
};

export const HookedFunctionBeahvior = () => {
  const classes = useStyles();

  return (
    <Archer.ArcherContainer noCurves strokeColor='gray'>
      <div className={classes.rowTop2}>
        <Archer.ArcherElement
          id='aa'
          relations={[
            {
              targetId: 'bbb',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
            }
          ]}
        >
          <Box className={classes.box}>
            <NoteText variant={'body2'}>{contentFunctionA}</NoteText>
          </Box>
        </Archer.ArcherElement>
      </div>
      <div className={classes.rowWithTwoColumns}>
        <div>
          <Archer.ArcherElement
            id='bb'
            relations={[
              {
                targetId: 'bbb',
                targetAnchor: 'left',
                sourceAnchor: 'right',
                style: { strokeDasharray: '5' }
              }
            ]}
          >
            <Box className={classes.box} sx={{ bgcolor: 'error.main' }}>
              <NoteText variant={'body2'}>{contentFunctionB}</NoteText>
            </Box>
          </Archer.ArcherElement>
        </div>
        <div>
          <Archer.ArcherElement
            id='bbb'
            relations={[
              {
                targetId: 'bb',
                targetAnchor: 'right',
                sourceAnchor: 'left',
                style: { strokeDasharray: '5' }
              },
              {
                targetId: 'cc',
                targetAnchor: 'top',
                sourceAnchor: 'bottom'
              }
            ]}
          >
            <Box className={classes.box} sx={{ bgcolor: 'success.main' }}>
              <NoteText variant={'body2'}>{contentFunctionHook}</NoteText>
            </Box>
          </Archer.ArcherElement>
        </div>
      </div>
      <div className={classes.rowBottom2}>
        <Archer.ArcherElement id='cc'>
          <Box className={classes.box}>
            <NoteText variant={'body2'}>{contentFunctionHookResult}</NoteText>
          </Box>
        </Archer.ArcherElement>
      </div>
    </Archer.ArcherContainer>
  );
};

export default Diagram;
