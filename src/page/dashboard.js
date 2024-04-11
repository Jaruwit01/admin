import React from "react";
import Plot from "react-plotly.js";
import Navbar from "../components/navbar";

function Dashboard() {
  const otherData = [
    {
      x: ["January", "February", "March", "April", "May", "June", "July"],
      y: [100, 120, 90, 150, 130, 133, 90],
      type: "line",
      marker: { color: "green" },
    },
  ];

  const otherLayout = {
    title: "Charging Requests per Month",
    xaxis: { title: "Month" },
    yaxis: { title: "Charging Requests" },
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Dashboard</h1>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Charging Requests Statistics</h3>
                <Plot data={otherData} layout={otherLayout} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
