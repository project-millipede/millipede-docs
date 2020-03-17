import React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from 'victory';

const Test = () => {
  return (
    <VictoryChart>
      <VictoryLabel
        style={{
          fontWeight: 'bold',
          fontSize: 15
        }}
        // y='1.2em'
        // y={1.2}
        dy={10}
        text={'Types of false information'}
        // standalone={true}
      />

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
          { x: 1, y: 0.2, y0: 0.8, label: 'Misinformation', color: 'green' },
          { x: -0, y: 0.2, y0: 0.8, label: 'Hoax', color: 'grey' },
          { x: -1, y: 0.2, y0: 0.8, label: 'Disinformation', color: 'red' }
        ]}
        labels={({ datum }) => datum.label}
      />
    </VictoryChart>
  );
};

export default Test;
