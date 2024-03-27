import React from "react";
import { userData } from "./helper";

const S = () => {
  const { username } = userData();
  return (
    <div>

      <div className="home">
        <h2>Welcome {username ? username : 'user'}</h2>
      </div>
    </div>
  );
};

export default S;