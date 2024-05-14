import "./SearchResult.css";
import { Link } from "react-router-dom"

export const SearchResult = ({ result }) => {

  return (
    <>
{/* <Link to={!result?.attributes?.group_tour_packages ? 
          `/single-package/${result?.attributes?.package_id}` :  `/search-destination/${result?.attributes?.name}`
       } > */}
<Link to={!result?.attributes?.group_tour_packages ? 
          `/single-destination/${result?.attributes?.all_destinations?.data[0]?.attributes?.name}` :  `/search-destination/${result?.attributes?.name}`
       } >
    {/* Your search result wrapped inside the Link */}
    <div
        className="search-result"
        onClick={(e) => console.log(result)}
    >
        {result.attributes.name}
    </div>
</Link>
      </>
  );
};