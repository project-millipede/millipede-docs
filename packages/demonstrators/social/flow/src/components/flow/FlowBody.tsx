/* eslint-disable import/no-named-as-default */
import { Archer } from '@app/components';
import { scrollStates, ScrollTypes } from '@demonstrators-social/shared';
import { createStyles, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import get from 'lodash/get';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { getSelectedSliceIdsBody } from './Dock.svc';

const { ArcherElement, CustomBox } = Archer;

export const useStyles = makeStyles(() =>
  createStyles({
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
  })
);

export const FlowBody: FC = () => {
  const classes = useStyles();

  const {
    timeline: { nodesWithRelationsWithEdgeState }
  } = scrollStates;

  const nodeWithRelationsWithEdgeMap = useRecoilValue(
    nodesWithRelationsWithEdgeState
  );

  const {
    activeId,
    nodesWithRelations,
    counter,
    finalSize
  } = nodeWithRelationsWithEdgeMap;

  const nodeWithRelationsWithEdge = get(nodesWithRelations, activeId, {
    values: [] as Array<ScrollTypes.Timeline.NodeWithRelationsWithEdge>
  });

  const { values } = nodeWithRelationsWithEdge;

  return (
    <>
      {values.map((value, row) => {
        const nodeWithRelations =
          getSelectedSliceIdsBody(value, counter, finalSize) || [];

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
                <ArcherElement id={id} key={id} relations={relations}>
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
