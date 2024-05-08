// DailyGraph.js

import React from 'react';
import Plot from 'react-plotly.js';

const DailyGraph = ({ dailyData }) => {
  const dailyXData = Object.keys(dailyData);
  const dailyYData = Object.values(dailyData);

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h5 className="card-title">Daily Data</h5>
      </div>
      <div className="card-body">
        <Plot
          data={[
            {
              x: dailyXData,
              y: dailyYData,
              type: 'bar',
            },
          ]}
          layout={{ title: 'จำนวนการใช้บริการต่อวัน' ,
          width: 570, 
          height: 400, 
          }}
        />
      </div>
    </div>
  );
};

export default DailyGraph;
