// MonthlyGraph.js

import React from 'react';
import Plot from 'react-plotly.js';

const MonthlyGraph = ({ monthlyData }) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyXData = Object.keys(monthlyData).map(month => monthNames[parseInt(month) - 1]);
  const monthlyYData = Object.values(monthlyData);

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h5 className="card-title">Monthly Data</h5>
      </div>
      <div className="card-body">
        <Plot
          data={[
            {
              x: monthlyXData,
              y: monthlyYData,
              type: 'bar',
            },
          ]}
          layout={{ title: 'จำนวนการใช้บริการต่อเดือน', 
          width: 570, 
          height: 400,   }}
          
        />
      </div>
    </div>
  );
};

export default MonthlyGraph;
