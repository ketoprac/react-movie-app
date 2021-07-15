import React from "react";

const SearchBox = ({ setSearchValue }) => {
  return (
    <div className="col col-sm-4 ">
      <input
        className="search-input"
        placeholder="Type to search..."
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
