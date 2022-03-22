import { Archer } from '@app/archer';
import { Box } from '@app/components';
import { features as navigationFeatures } from '@demonstrator/navigation';
import { features } from '@demonstrators-social/shared';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';

const { InteractiveBox } = Box;
const { ArcherElement } = Archer;

interface FlowBodyGridProps {
  size: number;
  isMobile?: boolean;
}
export const FlowBodyLayout = styled('div', {
  shouldForwardProp: prop => prop !== 'size'
})<FlowBodyGridProps>(({ size }) => {
  return {
    display: 'grid',
    gridArea: 'dock-center',
    placeContent: 'space-evenly',
    gridTemplateRows: `repeat(${size}, 1fr)`
  };
});

export const FlowBodyGrid = styled('div', {
  shouldForwardProp: prop => prop !== 'size' && prop !== 'isMobile'
})<FlowBodyGridProps>(({ theme, size, isMobile }) => {
  return {
    display: 'grid',
    placeContent: 'space-evenly',
    ...(isMobile && {
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: `repeat(${size}, 1fr)`
      }
    }),
    columnGap: theme.spacing(20),
    rowGap: theme.spacing(8)
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
    <FlowBodyLayout size={bodyNodeWithRelations.length}>
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
                  isMobile={isMobile}
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
