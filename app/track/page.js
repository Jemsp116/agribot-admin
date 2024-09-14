"use client";
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Map from '@/components/Map';

const TrackPage = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // Fetch your tracking data from an API or other sources
    const fetchTrackingData = async () => {
      // Example static data
      const data = [
        { lat: 37.7749, lng: -122.4194, label: 'Drone 1' },
        { lat: 37.7849, lng: -122.4094, label: 'Robot 1' }
      ];
      setMarkers(data);
    };

    fetchTrackingData();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen p-8 bg-gray-100 text-black">
        <h1 className="text-4xl font-bold mb-6 text-center">Track Your Drones and Robots</h1>
        <Map markers={markers} />
      </div>
    </Layout>
  );
};

export default TrackPage;