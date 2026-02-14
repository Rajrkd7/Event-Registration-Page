import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard({ registrations }) {
  const genderCount = { Male: 0, Female: 0, Other: 0 };

  registrations.forEach((r) => {
    if (r.gender) genderCount[r.gender]++;
  });

  const data = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        data: [genderCount.Male, genderCount.Female, genderCount.Other],
        backgroundColor: [
          "#3b82f6", // Male - Blue
          "#ec4899", // Female - Pink
          "#22c55e", // Other - Green
        ],
        hoverBackgroundColor: ["#2563eb", "#db2777", "#16a34a"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 14,
            weight: "500",
          },
        },
      },
    },
  };

  return (
    <header className="dashboard">
      <div className="stats">
        <h2>Total Registrations</h2>
        <p className="count">{registrations.length}</p>

        <div className="gender-cards">
          <div className="card male">Male: {genderCount.Male}</div>
          <div className="card female">Female: {genderCount.Female}</div>
          <div className="card other">Other: {genderCount.Other}</div>
        </div>
      </div>

      <div className="chart">
        <Pie data={data} options={options} />
      </div>
    </header>
  );
}

export default Dashboard;
