"use client";
import Layout from '@/components/Layout';
import React from 'react';
import { useTable } from 'react-table';
import { motion } from 'framer-motion';

// Sample order data with 10 rows
const orderData = [
  { id: 1, customerName: 'John Doe', orderDate: '2024-09-01', status: 'Shipped', billAmount: '$150', robotType: 'Drone', robotName: 'AgroDrone-X' },
  { id: 2, customerName: 'Jane Smith', orderDate: '2024-09-02', status: 'Processing', billAmount: '$200', robotType: 'Harvester', robotName: 'AgriBot-Pro' },
  { id: 3, customerName: 'Alice Johnson', orderDate: '2024-09-03', status: 'Delivered', billAmount: '$180', robotType: 'Sprayer', robotName: 'SprayMaster' },
  { id: 4, customerName: 'Michael Brown', orderDate: '2024-09-04', status: 'Delivered', billAmount: '$220', robotType: 'Harvester', robotName: 'FieldBot-X' },
  { id: 5, customerName: 'Linda Williams', orderDate: '2024-09-05', status: 'Shipped', billAmount: '$140', robotType: 'Drone', robotName: 'FlyTech-Drone' },
  { id: 6, customerName: 'Chris Davis', orderDate: '2024-09-06', status: 'Processing', billAmount: '$210', robotType: 'Sprayer', robotName: 'AquaSpray 3000' },
  { id: 7, customerName: 'Patricia Miller', orderDate: '2024-09-07', status: 'Shipped', billAmount: '$190', robotType: 'Harvester', robotName: 'HarvestKing' },
  { id: 8, customerName: 'Robert Garcia', orderDate: '2024-09-08', status: 'Delivered', billAmount: '$250', robotType: 'Drone', robotName: 'DroneX-Pro' },
  { id: 9, customerName: 'Jennifer Martinez', orderDate: '2024-09-09', status: 'Processing', billAmount: '$175', robotType: 'Sprayer', robotName: 'GreenSpray 500' },
  { id: 10, customerName: 'David Wilson', orderDate: '2024-09-10', status: 'Delivered', billAmount: '$230', robotType: 'Harvester', robotName: 'MegaHarvest Pro' },
];

// Define columns for the table, including the new fields
const columns = [
  { Header: 'Order ID', accessor: 'id' },
  { Header: 'Customer Name', accessor: 'customerName' },
  { Header: 'Order Date', accessor: 'orderDate' },
  { Header: 'Status', accessor: 'status' },
  { Header: 'Bill Amount', accessor: 'billAmount' },
  { Header: 'Robot Type', accessor: 'robotType' },
  { Header: 'Robot Name', accessor: 'robotName' },
];

const ManageOrdersPage = () => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: orderData });

  return (
    <Layout>
      <div className="min-h-screen p-8 bg-gray-100 text-black">
        <h1 className="text-4xl font-bold mb-6 text-center">Manage Orders</h1>

        {/* Orders Table Section */}
        <section className="py-10">
          <div className="overflow-x-auto">
            <table {...getTableProps()} className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column,index) => (
                      <th key={index} {...column.getHeaderProps()} className="py-3 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, index)=> {
                  prepareRow(row);
                  return (
                    <tr key={index} {...row.getRowProps()} className="hover:bg-gray-100">
                      {row.cells.map((cell, i) => (
                        <td key={i} {...cell.getCellProps()} className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <div className="text-center mt-8">
          <motion.button
            className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()} // Go back to the previous page
          >
            Back to Dashboard
          </motion.button>
        </div>
      </div>
    </Layout>
  );
};

export default ManageOrdersPage;
