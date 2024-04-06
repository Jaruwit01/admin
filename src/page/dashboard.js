import React from "react";
import Plot from "react-plotly.js";
import Navbar from "../components/navbar";

function Dashboard() {
  const data = [
    {
      x: [1, 2, 3, 4, 5],
      y: [10, 15, 13, 17, 20],
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "blue" },
    },
  ];

  const layout = {
    title: "Sales Statistics",
    xaxis: { title: "Month" },
    yaxis: { title: "Sales Amount" },
  };

  return (
    <div>
      <Navbar />
    <div className="container mt-5">
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col-md-6">
          <Plot data={data} layout={layout} />
        </div>
        <div className="col-md-6">
          <h3>Other Statistics</h3>
          {/* เพิ่มส่วนอื่น ๆ ของสถิติตามที่ต้องการ */}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
