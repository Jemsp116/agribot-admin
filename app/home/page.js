"use client";
import Layout from '@/components/Layout';
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; // Use Next.js App Router's useRouter

// Admin Dashboard Card Component
const AdminCard = ({ title, description, icon, link }) => {
  const router = useRouter(); // Use Next.js router from next/navigation

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg border border-blue-500"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push(link)} // Navigate to the corresponding page
    >
      <div className="text-4xl mb-4 text-blue-600">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => {
  return (
    <Layout>
      <div className="min-h-screen p-8 bg-gray-100 text-black">
        <h1 className="text-4xl font-bold mb-6 text-center">Admin Dashboard</h1>

        {/* Dashboard Cards Section */}
        <section className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
            <AdminCard
              title="Manage Robots"
              description="View and update robot inventory."
              icon="🤖"
              link="/add-robot" // Link to robots management
            />
            <AdminCard
              title="Manage Orders"
              description="View and track all orders."
              icon="📦"
              link="/Manage-orders" // Link to orders management
            />
            <AdminCard
              title="View Analytics"
              description="Monitor performance and analytics."
              icon="📊"
              link="/Analytics" // Link to analytics page
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
