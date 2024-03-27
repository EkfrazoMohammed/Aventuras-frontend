import "./SearchResult.css";
import { Link } from "react-router-dom"

export const SearchResult = ({ result }) => {

  return (
    <>
      <Link to={ `/search-destination/${result?.attributes?.name}`} >

        <div
          className="search-result"
          onClick={(e) => console.log(result)}
        >
          {result.attributes.name} 
    </div >
      </Link ></>
  );
};