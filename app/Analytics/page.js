"use client";
import Layout from '@/components/Layout';
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Sample data for the analytics page
const analyticsData = {
  farmsServed: 1000,
  robotsDeployed: 2000,
  dronesInAction: 300,
  totalOrders: 5000,
  monthlyOrders: [200, 300, 250, 400, 350, 450, 500, 600, 550, 700, 650, 800],
  robotTypes: {
    'Harvesting': 400,
    'Planting': 300,
    'Monitoring': 200,
    'Other': 100
  }
};

// Analytics Card Component
const AnalyticsCard = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-blue-500">
      <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
      <p className="text-gray-600 text-3xl font-bold">{value}</p>
    </div>
  );
};

// Analytics Charts Component
const AnalyticsCharts = () => {
  const monthlyOrdersData = {
    labels: Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'short' })),
    datasets: [{
      label: 'Monthly Orders',
      data: analyticsData.monthlyOrders,
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  const robotTypesData = {
    labels: Object.keys(analyticsData.robotTypes),
    datasets: [{
      data: Object.values(analyticsData.robotTypes),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    }]
  };

  return (
    <section className="py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-blue-500">
          <h3 className="text-xl font-semibold mb-4 text-black">Monthly Orders</h3>
          <Line data={monthlyOrdersData} options={{ responsive: true, plugins: { legend: { display: true }, title: { display: true, text: 'Monthly Orders' } } }} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-blue-500">
          <h3 className="text-xl font-semibold mb-4 text-black">Robot Types Distribution</h3>
          <Pie data={robotTypesData} options={{ responsive: true, plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}` } } } }} />
        </div>
      </div>
    </section>
  );
};

const AnalyticsPage = () => {
  const router = useRouter(); // Use Next.js router from next/navigation

  return (
    <Layout>
      <div className="min-h-screen p-8 bg-gray-100 text-black">
        <h1 className="text-4xl font-bold mb-6 text-center">Company Analytics</h1>

        {/* Analytics Data Section */}
        <section className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
            <AnalyticsCard
              title="Farms Served"
              value={`${analyticsData.farmsServed}+`}
            />
            <AnalyticsCard
              title="Robots Deployed"
              value={`${analyticsData.robotsDeployed}+`}
            />
            <AnalyticsCard
              title="Drones in Action"
              value={`${analyticsData.dronesInAction}+`}
            />
            <AnalyticsCard
              title="Total Orders"
              value={`${analyticsData.totalOrders}+`}
            />
          </div>
        </section>

        {/* Analytics Charts Section */}
        <AnalyticsCharts />

        <div className="text-center mt-8">
          <motion.button
            className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()} 
          >
            Back to Dashboard
          </motion.button>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
