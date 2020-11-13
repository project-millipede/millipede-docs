/* eslint-disable import/no-named-as-default */
import { createStyles, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import _ from 'lodash';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { ArcherElement } from '../../../../../../../docs/src/modules/components/archer';
import CustomBox from '../../../../../../../docs/src/modules/components/archer/CustomBoxForward';
import {
  nodesWithRelationsWithEdgeState,
  NodeWithRelationsWithEdge,
} from '../../../../../../../docs/src/modules/recoil/features/scroll/timeline/reducer';
import { getSelectedSliceIdsBody } from './Interaction.svc';

interface InteractionBodyProps {}

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

export const InteractionBody: FC<InteractionBodyProps> = () => {
  const classes = useStyles();

  const nodeWithRelationsWithEdgeMap = useRecoilValue(
    nodesWithRelationsWithEdgeState
  );

  const {
    activeId,
    nodesWithRelations,
    counter,
    finalSize
  } = nodeWithRelationsWithEdgeMap;

  const nodeWithRelationsWithEdge = _.get(nodesWithRelations, activeId, {
    values: [] as Array<NodeWithRelationsWithEdge>
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
                  <CustomBox bgcolor='success.main'>
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
