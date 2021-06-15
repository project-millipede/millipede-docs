/* eslint-disable import/no-named-as-default */
import { Archer } from '@app/components';
import { scrollSelectors } from '@demonstrators-social/shared';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { FC, memo } from 'react';
import { useRecoilValue } from 'recoil';

const { ArcherElement, CustomBox } = Archer;

export const useStyles = makeStyles(() => ({
  row: {
    margin: '100px 0',
    display: 'flex',
    justifyContent: 'space-between'
  },
  rowSingleElement: {
    margin: '100px 0',
    display: 'flex',
    justifyContent: 'center'
  }
}));

export const FlowBody: FC = () => {
  const classes = useStyles();

  const {
    timeline: { sliceIdsBodySelector }
  } = scrollSelectors;

  const selectedBodySlices = useRecoilValue(sliceIdsBodySelector);

  return (
    <>
      {selectedBodySlices.map((nodeWithRelations, row) => {
        return (
          <div
            key={`row-${row}`}
            className={clsx({
              [classes.rowSingleElement]: nodeWithRelations.length === 1,
              [classes.row]: nodeWithRelations.length >= 2
            })}
          >
            {nodeWithRelations.map(value => {
              const {
                node: { id, label },
                relations
              } = value;
              return (
                <ArcherElement
                  id={id}
                  key={id}
                  relations={relations}
                  isInteractive
                >
                  <CustomBox>
                    <Typography variant='subtitle1'>{label}</Typography>
                  </CustomBox>
                </ArcherElement>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default memo(FlowBody);
