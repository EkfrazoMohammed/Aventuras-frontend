import React from 'react'
import "./NotFound.css";
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div className="page-container">
      <div className="page-wrapper">
        <h1>404! Page Not Found</h1>
        <div className="desc">Looks like the page you are looking for doesn't exist!</div>
        <Link to="/"><div className="links">Go Back Home</div></Link>
      </div>
    </div>
  )
}

export default NotFound