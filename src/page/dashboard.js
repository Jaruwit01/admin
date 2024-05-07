// GraphComponent.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../components/navbar";
import DailyGraph from "./Graph/DailyGraph";
import MonthlyGraph from "./Graph/MonthlyGraph";
import YearlyGraph from "./Graph/YearlyGraph";
// import Plotly from 'plotly.js-dist';

const GraphComponent = () => {
  const [dailyData, setDailyData] = useState({});
  const [monthlyData, setMonthlyData] = useState({});
  const [yearlyData, setYearlyData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:4000/dashboard/Day') // API route for daily data
    .then(res => {
      // Sort data by date
      const sortedData = Object.entries(res.data).sort((a, b) => new Date(a[0]) - new Date(b[0]));
      const sortedDataObj = Object.fromEntries(sortedData);
      setDailyData(sortedDataObj);
    })
      .catch(err => console.error(err));

    axios.get('http://localhost:4000/dashboard/Month') // API route for monthly data
      .then(res => setMonthlyData(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:4000/dashboard/Year') // API route for yearly data
      .then(res => setYearlyData(res.data))
      .catch(err => console.error(err));
  }, []);

  const graphConfig = { responsive: true };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Dashboard</h1>
        <div className="row justify-content-center">
          <div className="row d-flex">
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body d-flex justify-content-center">
                <DailyGraph dailyData={dailyData} graphConfig={graphConfig} />
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body d-flex justify-content-center">
                <MonthlyGraph monthlyData={monthlyData} graphConfig={graphConfig} />
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body d-flex justify-content-center">
                <YearlyGraph yearlyData={yearlyData} graphConfig={graphConfig} />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphComponent;
