"use client";
import Layout from '@/components/Layout';
import React from 'react';
import { useTable } from 'react-table';
import { motion } from 'framer-motion';

// Sample order data
const orderData = [
  { id: 1, customerName: 'John Doe', orderDate: '2024-09-01', status: 'Shipped' },
  { id: 2, customerName: 'Jane Smith', orderDate: '2024-09-02', status: 'Processing' },
  { id: 3, customerName: 'Alice Johnson', orderDate: '2024-09-03', status: 'Delivered' },
  // Add more data as needed
];

// Define columns for the table
const columns = [
  { Header: 'Order ID', accessor: 'id' },
  { Header: 'Customer Name', accessor: 'customerName' },
  { Header: 'Order Date', accessor: 'orderDate' },
  { Header: 'Status', accessor: 'status' },
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
                      {row.cells.map(cell => (
                        <td {...cell.getCellProps()} className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
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
