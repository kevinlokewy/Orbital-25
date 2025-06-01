'use client';

import { useState } from 'react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('meets');

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Racetrack Home</h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab('meets')}
          className={`px-4 py-2 rounded ${
            activeTab === 'meets' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border'
          }`}
        >
          Meets
        </button>
        <button
          onClick={() => setActiveTab('swimmers')}
          className={`px-4 py-2 rounded ${
            activeTab === 'swimmers' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border'
          }`}
        >
          Swimmers
        </button>
        <button
          onClick={() => setActiveTab('teams')}
          className={`px-4 py-2 rounded ${
            activeTab === 'teams' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border'
          }`}
        >
          Teams
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        {activeTab === 'meets' && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Meets & Heatsheets</h2>
            <p>List upcoming meets and heatsheets here.</p>
          </div>
        )}
        {activeTab === 'swimmers' && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Search Swimmers</h2>
        