import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory';

export const SpectrumOfFalseInformation: FC = () => {
  const { t } = useTranslation();

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
          {
            x: 1,
            y: 0.2,
            y0: 0.8,
            label: t('pages/guides/disinformation/index:misinformation'),
            color: 'green'
          },
          {
            x: -0,
            y: 0.2,
            y0: 0.8,
            label: t('pages/guides/disinformation/index:disinformation'),
            color: 'grey'
          },
          {
            x: -1,
            y: 0.2,
            y0: 0.8,
            label: t('pages/guides/disinformation/index:malinformation'),
            color: 'red'
          }
        ]}
        labels={({ datum }) => datum.label}
      />
    </VictoryChart>
  );
};
