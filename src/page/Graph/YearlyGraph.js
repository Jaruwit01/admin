// YearlyGraph.js

import React from 'react';
import Plot from 'react-plotly.js';

const YearlyGraph = ({ yearlyData }) => {
  const yearlyXData = Object.keys(yearlyData);
  const yearlyYData = Object.values(yearlyData);

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h5 className="card-title">Yearly Data</h5>
      </div>
      <div className="card-body">
        <Plot
          data={[
            {
              x: yearlyXData,
              y: yearlyYData,
              type: 'bar',
            },
          ]}
          layout={{ title: 'Data Created per Year' ,
          width: 570, 
          height: 400,
          }}
        />
      </div>
    </div>
  );
};

export default YearlyGraph;
