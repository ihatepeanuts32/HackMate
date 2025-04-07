// Vaishali - Search Function
// Description: this code implements a search functionality to search for users, roles, etc.

import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  // search bar details
  return (
    <div className="p-4 bg-white dark:bg-black text-black dark:text-white">
      <form onSubmit={handleSearch} className="flex items-center space-x-4">
        <input
          type="Text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          type="Submit"
          className="px-6 py-2 bg-pink-500 text-white dark:bg-pink-500 dark:text-black rounded font-semibold transition-colors duration-300 hover:bg-pink-600 dark:hover:bg-pink-400"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;