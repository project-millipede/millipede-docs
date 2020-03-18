import React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory';

import { useTranslation } from '../../../../../i18n';

const ns = 'pages/guides/disinformation/general/index';

const use = () => {
  const { t } = useTranslation(ns);

  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryAxis
        tickCount={10}
        style={{
          axisLabel: { fontSize: 8 },
          grid: {
            stroke: ({ tick }) => {
              if (tick > 0.4) {
                return 'green';
              }
              if (tick < -0.4) {
                return 'red';
              }
              return 'grey';
            }
          },
          tickLabels: { fontSize: 8 }
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
            fontSize: 8
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
