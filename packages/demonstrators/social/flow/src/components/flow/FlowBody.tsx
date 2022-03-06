import { Archer } from '@app/components';
import { features as navigationFeatures } from '@demonstrator/navigation';
import { features } from '@demonstrators-social/shared';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

const { ArcherElement, InteractiveBox } = Archer;

interface FlowBodyGridProps {
  isMobile: boolean;
  size: number;
}

export const FlowBodyLayout = styled('div')(({ theme }) => {
  return {
    display: 'grid',
    gridArea: 'dock-center',
    placeContent: 'space-evenly',
    columnGap: theme.spacing(3),
    rowGap: theme.spacing(3)
  };
});

export const FlowBodyGrid = styled('div', {
  shouldForwardProp: prop => prop !== 'isMobile' && prop !== 'size'
})<FlowBodyGridProps>(({ theme, isMobile, size }) => {
  return {
    display: 'grid',
    placeContent: 'space-evenly',
    ...(isMobile && {
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: `repeat(${size}, 1fr)`
      }
    }),
    columnGap: theme.spacing(14),
    rowGap: theme.spacing(6)
  };
});

export const FlowBody: FC = () => {
  const {
    scroll: {
      timeline: {
        selector: { bodySliceIdsSelector }
      }
    }
  } = features;

  const {
    app: {
      states: { appCompositionState }
    }
  } = navigationFeatures;

  // Items represent either rows or columns, depending on the layout selected.
  const bodyNodeWithRelations = useRecoilValue(bodySliceIdsSelector);

  const { isMobile } = useRecoilValue(appCompositionState);

  return (
    <FlowBodyLayout>
      {bodyNodeWithRelations.map((bodyNodeWithRelation, index) => {
        return (
          <FlowBodyGrid
            key={`flow-body-row-or-column-${index}`}
            isMobile={isMobile}
            size={bodyNodeWithRelation.length}
          >
            {bodyNodeWithRelation.map(nodeWithRelation => {
              const {
                node: { id, label },
                relations
              } = nodeWithRelation;
              return (
                <ArcherElement
                  id={id}
                  key={`flow-body-row-or-column-item-${id}`}
                  relations={relations}
                  isInteractive
                >
                  <InteractiveBox>
                    <Typography variant='subtitle1'>{label}</Typography>
                  </InteractiveBox>
                </ArcherElement>
              );
            })}
          </FlowBodyGrid>
        );
      })}
    </FlowBodyLayout>
  );
};
