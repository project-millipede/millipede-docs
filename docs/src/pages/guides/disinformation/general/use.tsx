import React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory';

import { useTranslation } from '../../../../../../i18n';

const ns = 'pages/guides/disinformation/general/index';

const use = () => {
  const { t } = useTranslation(ns);

  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryAxis
        tickCount={10}
        domain={[0, 1]}
        style={{
          axis: { stroke: '#756f6a' },
          axisLabel: { fontSize: 15, padding: 30 },
          grid: {
            stroke: ({ tick }) => {
              if (tick > 0.2) {
                return 'green';
              }
              if (tick < -0.2) {
                return 'red';
              }
              return 'grey';
            }
          },
          // ticks: { stroke: 'grey', size: 5 },
          tickLabels: { fontSize: 15, padding: 15 }
        }}
      />
      <VictoryBar
        domain={{ x: [-1, 1], y: [0, 1] }}
        horizontal
        style={{
          data: {
            fill: ({ datum }) => datum.color
          },
          labels: {
            fontSize: 15
          }
        }}
        data={[
          { x: 1, y: 0.2, y0: 0.8, label: t('misinformation'), color: 'green' },
          { x: -0, y: 0.2, y0: 0.8, label: t('disinformation'), color: 'grey' },
          { x: -1, y: 0.2, y0: 0.8, label: t('malinformation'), color: 'red' }
        ]}
        labels={({ datum }) => datum.label}
      />
    </VictoryChart>
  );
};

export default use;
