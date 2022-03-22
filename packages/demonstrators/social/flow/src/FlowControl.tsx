import { features as appComponentFeatures } from '@app/archer';
import { Stepper } from '@app/components';
import { features } from '@demonstrators-social/shared';
import { List, ListItem, ListSubheader, Paper, Typography } from '@mui/material';
import { usePrevious } from 'ahooks';
import get from 'lodash/get';
import useTranslation from 'next-translate/useTranslation';
import { FC, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export const ScenarioNavigator: FC = () => {
  const {
    scroll: {
      timeline: {
        states: { nodesWithRelationsWithEdgeState }
      }
    }
  } = features;

  const { t } = useTranslation();

  const [{ nodesWithRelations, activeId }, setNodesWithRelationsWithEdge] =
    useRecoilState(nodesWithRelationsWithEdgeState);

  const [steps, currentStep] = useMemo(() => {
    return [
      Object.keys(nodesWithRelations).length,
      Object.keys(nodesWithRelations).findIndex(n => n === activeId)
    ];
  }, [nodesWithRelations, activeId]);

  return (
    <Stepper.Stepper
      steps={steps}
      step={currentStep}
      setStepCb={(currentStep: number) => {
        setNodesWithRelationsWithEdge(state => {
          return {
            ...state,
            activeId: Object.keys(nodesWithRelations)[currentStep]
          };
        });
      }}
      labelBack={t('common:back')}
      labelNext={t('common:next')}
    />
  );
};

export const ScenarioDetailNavigator: FC = () => {
  const {
    scroll: {
      timeline: {
        states: { nodesWithRelationsWithEdgeState }
      }
    }
  } = features;

  const {
    archer: {
      selector: { archerRefSelector }
    }
  } = appComponentFeatures;

  const { t } = useTranslation();

  const [selectedKey, setSelectedKey] = useState({
    row: '',
    column: 0
  });

  const { nodesWithRelations, activeId } = useRecoilValue(
    nodesWithRelationsWithEdgeState
  );

  useEffect(() => {
    setSelectedKey(prevState => {
      return { ...prevState, row: activeId };
    });
  }, [activeId]);

  const [currentStep, setCurrentStep] = useState(0);

  const [id, setId] = useState('');

  // does not work in concurrent mode
  const previousId = usePrevious(id);

  const previousRef = useRecoilValue(archerRefSelector(previousId));
  const currentRef = useRecoilValue(archerRefSelector(id));

  const currentNodesWithRelations = useMemo(() => {
    const currentNodesWithRelations = get(nodesWithRelations, activeId);
    return currentNodesWithRelations;
  }, [nodesWithRelations, activeId]);

  const [selectedNodeWithRelationsValue, nodeWithRelations, steps] =
    useMemo(() => {
      const selectedNodeWithRelationsValue =
        currentNodesWithRelations &&
        currentNodesWithRelations.values &&
        currentNodesWithRelations.values[selectedKey.column];

      const nodeWithRelations =
        (selectedNodeWithRelationsValue &&
          selectedNodeWithRelationsValue.nodeWithRelations) ||
        [];

      const steps = (nodeWithRelations && nodeWithRelations.length) || 0;

      return [selectedNodeWithRelationsValue, nodeWithRelations, steps];
    }, [currentNodesWithRelations, selectedKey.column]);

  // TODO: Check if this is still required / unselect / select use case
  useEffect(() => {
    if (
      previousRef &&
      previousRef.dynamicRef &&
      previousRef.dynamicRef.current
    ) {
      previousRef.dynamicRef.current.unSelect();
    }
    if (currentRef && currentRef.dynamicRef && currentRef.dynamicRef.current) {
      currentRef.dynamicRef.current.select();
    }
  }, [currentRef, previousRef]);

  useEffect(() => {
    if (selectedNodeWithRelationsValue) {
      setCurrentStep(
        selectedNodeWithRelationsValue.ltr
          ? 0
          : selectedNodeWithRelationsValue.nodeWithRelations.length - 1
      );
    }
  }, [selectedNodeWithRelationsValue]);

  useEffect(() => {
    const id =
      (nodeWithRelations &&
        nodeWithRelations[currentStep] &&
        nodeWithRelations[currentStep].node.id) ||
      '';
    setId(id);
  }, [nodeWithRelations, currentStep]);

  const handleListItemClick = (position: number, index: number) => {
    setSelectedKey(prevState => {
      return { ...prevState, column: index };
    });

    // reset
    setCurrentStep(position);
  };

  return currentNodesWithRelations ? (
    <>
      <List
        dense
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            {/* {`I'm sticky ${currentNodesWithRelations.id}`} */}
            {`I'm sticky`}
          </ListSubheader>
        }
      >
        {currentNodesWithRelations.map((value, index) => {
          return (
            <ListItem
              button
              key={index}
              selected={selectedKey.column === index}
              onClick={_event =>
                handleListItemClick(
                  value.ltr ? 0 : value.nodeWithRelations.length - 1,
                  index
                )
              }
            >
              {value.nodeWithRelations.length}
            </ListItem>
          );
        })}
      </List>

      <div>
        <Paper square elevation={0}>
          <Typography>
            {t(`pages/pidp/use-case/recognition/index:${id}`)}
          </Typography>
        </Paper>
        <Stepper.Stepper
          steps={steps}
          step={currentStep}
          setStepCb={(newStep: number) => {
            setCurrentStep(newStep);
          }}
          labelNext={t('common:next')}
          labelBack={t('common:back')}
        />
      </div>
    </>
  ) : null;
};
