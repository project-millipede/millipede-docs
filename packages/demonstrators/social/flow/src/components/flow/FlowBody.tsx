/* eslint-disable import/no-named-as-default */
import { Archer } from '@app/components';
import { scrollSelectors } from '@demonstrators-social/shared';
import { Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import React, { FC, memo } from 'react';
import { useRecoilValue } from 'recoil';

const { ArcherElement, CustomBox } = Archer;

const Row = styled('div')({
  display: 'flex',
  margin: '100px 0'
});

export const FlowBody: FC = () => {
  const {
    timeline: { sliceIdsBodySelector }
  } = scrollSelectors;

  const selectedBodySlices = useRecoilValue(sliceIdsBodySelector);

  return (
    <>
      {selectedBodySlices.map((nodeWithRelations, row) => {
        return (
          <Row
            key={`row-${row}`}
            sx={{
              justifyContent:
                nodeWithRelations.length === 1 ? 'center' : 'space-between'
            }}
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
          </Row>
        );
      })}
    </>
  );
};

export default memo(FlowBody);
