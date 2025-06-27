'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

interface Meet {
  id: string;
  meet_name: string;
  location: string;
  start_date: string;
  end_date: string;
}

// Country-to-region map
const countryToRegionMap: Record<string, string> = {
  Bahrain: 'Asia',
  Romania: 'Europe',
  'South Korea': 'Asia',
  Japan: 'Asia',
  Singapore: 'Asia',
  China: 'Asia',
  USA: 'North America',
  Canada: 'North America',
  France: 'Europe',
  Germany: 'Europe',
  Australia: 'Oceania',
  Brazil: 'South America',
};

const allRegions = Array.from(new Set(Object.values(countryToRegionMap))).sort();

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('meets');
  const [upcomingMeets, setUpcomingMeets] = useState<Meet[]>([]);
  const [pastMeets, setPastMeets] = useState<Meet[]>([]);

  const [searchText, setSearchText] = useState('');

  // Real filters (used for filtering)
  const [filterRegions, setFilterRegions] = useState<string[]>([]);
  const [filterYear, setFilterYear] = useState('');
  const [filterType, setFilterType] = useState<'upcoming' | 'past' | ''>('');

  // Temporary filters (used in drawer)
  const [tempFilterRegions, setTempFilterRegions] = useState<string[]>([]);
  const [tempFilterYear, setTempFilterYear] = useState('');
  const [tempFilterType, setTempFilterType] = useState<'upcoming' | 'past' | ''>('');

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchMeets = async () => {
      const [upcoming, past] = await Promise.all([
        supabase.from('upcoming_meets').select('*').order('start_date', { ascending: true }),
        supabase.from('past_meets').select('*').order('start_date', { ascending: false }),
      ]);
      if (upcoming.data) setUpcomingMeets(upcoming.data);
      if (past.data) setPastMeets(past.data);
    };

    fetchMeets();
  }, []);

  const combinedMeets = [...upcomingMeets, ...pastMeets];
  const years = Array.from(
    new Set(combinedMeets.map((m) => new Date(m.start_date).getFullYear().toString()))
  ).sort();

  const extractCountry = (location: string): string => {
    return location.includes(',')
      ? location.split(',').pop()?.trim() ?? ''
      : location.trim();
  };

  const applyFilters = (meets: Meet[], isUpcoming: boolean) => {
    if (filterType && (filterType === 'upcoming') !== isUpcoming) return [];

    return meets.filter((meet) => {
      const matchesSearch = meet.meet_name.toLowerCase().includes(searchText.toLowerCase());

      const country = extractCountry(meet.location);
      const region = countryToRegionMap[
        Object.keys(countryToRegionMap).find(
          (c) => c.toLowerCase() === country.toLowerCase()
        ) ?? ''
      ] ?? '';

      const matchesRegion = filterRegions.length === 0 || filterRegions.includes(region);
      const matchesYear = filterYear
        ? new Date(meet.start_date).getFullYear().toString() === filterYear
        : true;

      return matchesSearch && matchesRegion && matchesYear;
    });
  };

  const filteredUpcoming = applyFilters(upcomingMeets, true);
  const filteredPast = applyFilters(pastMeets, false);

  const openDrawer = () => {
    setTempFilterRegions(filterRegions);
    setTempFilterYear(filterYear);
    setTempFilterType(filterType);
    setDrawerOpen(true);
  };

  const closeDrawer = () => setDrawerOpen(false);

  const applyAndClose = () => {
    setFilterRegions(tempFilterRegions);
    setFilterYear(tempFilterYear);
    setFilterType(tempFilterType);
    setDrawerOpen(false);
  };

  const resetTempFilters = () => {
    setTempFilterRegions([]);
    setTempFilterYear('');
    setTempFilterType('');
  };

  const toggleTempRegion = (region: string) => {
    setTempFilterRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  return (
    <main className="p-6 bg-white min-h-screen">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => (window.location.href = '/login')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Log In
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6 text-black">Home</h1>

      <div className="flex justify-center gap-4 mb-6">
        {['meets', 'swimmers', 'teams'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? 'bg-blue-500 text-white'
                : 'bg-white text-blue-500 border'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow-md border border-gray-200">
        {activeTab === 'meets' && (
          <>
            {/* Search + Filter */}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                placeholder="Search for an event..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="flex-grow border border-gray-400 rounded p-2 w-full text-gray-700"
              />
              <button
                onClick={openDrawer}
                aria-label="Open filter panel"
                className="p-2 rounded border-2 border-gray-500 hover:bg-gray-100 text-gray-700"
              >
                {/* Boldened funnel icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z"
                  />
                </svg>
              </button>
            </div>

            {/* Filter Drawer */}
            <div
              className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg border-l border-gray-300 transform transition-transform duration-300 z-50 ${
                drawerOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-700">Filters</h2>
                <button
                  onClick={closeDrawer}
                  className="text-gray-600 hover:text-black text-2xl font-bold"
                >
                  &times;
                </button>
              </div>
              <div className="p-4 space-y-4 overflow-auto max-h-[calc(100vh-100px)]">
                {/* Region */}
                <div>
                  <label className="block font-semibold mb-1 text-gray-700">Region</label>
                  <div className="flex flex-col max-h-40 overflow-auto border border-gray-300 rounded p-2 gap-1">
                    {allRegions.map((region) => (
                      <label key={region} className="inline-flex items-center gap-2 text-gray-700">
                        <input
                          type="checkbox"
                          checked={tempFilterRegions.includes(region)}
                          onChange={() => toggleTempRegion(region)}
                        />
                        {region}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Year */}
                <div>
                  <label className="block font-semibold mb-1 text-gray-700">Year</label>
                  <select
                    className="w-full border border-gray-700 rounded p-2"
                    value={tempFilterYear}
                    onChange={(e) => setTempFilterYear(e.target.value)}
                  >
                    <option value="">All Years</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Meet Type */}
                <div>
                  <label className="block font-medium mb-1 text-gray-600">Meet Type</label>
                  <div className="flex gap-4">
                    {['upcoming', 'past', ''].map((type) => (
                      <label key={type} className="inline-flex items-center gap-1 text-gray-600">
                        <input
                          type="radio"
                          name="meetType"
                          value={type}
                          checked={tempFilterType === type}
                          onChange={() => setTempFilterType(type as 'upcoming' | 'past' | '')}
                        />
                        {type === '' ? 'All' : type[0].toUpperCase() + type.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                  <button onClick={resetTempFilters} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                    Reset
                  </button>
                  <button onClick={applyAndClose} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Lists */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Upcoming Meets</h3>
              <ul className="list-disc list-inside text-gray-700 max-h-96 overflow-auto">
                {filteredUpcoming.length === 0 ? (
                  <li>No Upcoming Meets</li>
                ) : (
                  filteredUpcoming.map((meet) => (
                    <li key={meet.id} className="mb-1">
                      <Link href={`/meets/${meet.id}`} className="text-blue-600 hover:underline">
                        {meet.meet_name}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Past Meets</h3>
              <ul className="list-disc list-inside text-gray-600 max-h-96 overflow-auto">
                {filteredPast.length === 0 ? (
                  <li>No Recent Meets</li>
                ) : (
                  filteredPast.map((meet) => (
                    <li key={meet.id} className="mb-1">
                      <Link href={`/meets/${meet.id}`} className="text-gray-700 hover:underline">
                        {meet.meet_name}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </section>
          </>
        )}

        {activeTab === 'swimmers' && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-black">Search Swimmers</h2>
            <input
              type="text"
              placeholder="Search for a swimmer..."
              className="border border-gray-400 p-2 w-full rounded text-gray-700"
            />
          </div>
        )}

        {activeTab === 'teams' && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-black">Search Teams</h2>
            <input
              type="text"
              placeholder="Search for a team..."
              className="border border-gray-400 p-2 w-full rounded text-gray-700"
            />
          </div>
        )}
      </div>
    </main>
  );
}
