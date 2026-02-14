import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

const PlatformStatistics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    document.title = "Statistics";
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/platform-stats`)
      .then(res => setStats(res.data));
  }, []);

  if (!stats) return <p className="pt-24 text-center">Loading Statistics...</p>;

  const orderData = [
    { name: "Pending", value: stats.ordersPending },
    { name: "Delivered", value: stats.ordersDelivered }
  ];

  const paymentData = [
    { name: "Total Payment", value: stats.totalPayment }
  ];

  return (
    <div className="pt-24 p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Platform Statistics</h1>

     
      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white shadow p-6 rounded">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h3 className="text-gray-500">Pending Orders</h3>
          <p className="text-2xl font-bold">{stats.ordersPending}</p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h3 className="text-gray-500">Delivered Orders</h3>
          <p className="text-2xl font-bold">{stats.ordersDelivered}</p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h3 className="text-gray-500">Total Payment</h3>
          <p className="text-2xl font-bold">${stats.totalPayment}</p>
        </div>

      </div>

     
      <div className="grid md:grid-cols-2 gap-10">

     
        <div className="bg-white p-6 shadow rounded">
          <h2 className="font-bold mb-4">Orders Overview</h2>

          <PieChart width={300} height={300}>
            <Pie
              data={orderData}
              dataKey="value"
              outerRadius={100}
              label
            >
              <Cell />
              <Cell />
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

      
        <div className="bg-white p-6 shadow rounded">
          <h2 className="font-bold mb-4">Payments Overview</h2>

          <BarChart width={400} height={300} data={paymentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </div>

      </div>
    </div>
  );
};

export default PlatformStatistics;
