import { useState } from "react";

import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";
import "./components/SSearch.css";

function SSearch() {
  const [results, setResults] = useState([]);

  return (
    <div>
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}

      </div>
    </div>
  );
}

export default SSearch;
