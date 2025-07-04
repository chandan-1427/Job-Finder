import React, { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query: ", searchQuery);
    // You can handle the search logic here, e.g., make an API request
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center mt-4">
      <input
        type="text"
        placeholder="Search for jobs or resources..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 w-1/2 border border-gray-300 rounded-l-md"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-md">Search</button>
    </form>
  );
};

export default SearchBar;
