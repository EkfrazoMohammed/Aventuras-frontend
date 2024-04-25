import React, { useEffect, useState } from 'react'
import "./AboutUs.scss"
import axios from 'axios'
import { API } from '../../api/apirequest';
import ReactMarkdown from "react-markdown";

const AboutUs = () => {


  const [data ,setData] = useState();

  useEffect(() => {

const getData = async ()=>{
  try{
const res = await API.get(`/api/about-uses`)
setData([res])
  }
  catch(err) {
console.log(err)
  }
}

getData()
    window.scrollTo(0, 0);
  }, [])
  const [currentPath, setCurrentPath] = useState();

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])
  localStorage.setItem('pathName', currentPath)
  console.log(data)
  return (
    <div className="about-us-page-container">
      <div className="about-us-page-wrapper">
{
  data?.map((content) => {
    return (
      <div className="about-us-text-container">
        <div className="heading">
    {content?.data.data.map((val)=> val.attributes.title)}
        </div>
        <div className="para-container">
          <div className="sections">
          {content?.data.data.map((val)=>
            <div className="para">
            {" "}
            <ReactMarkdown>

{val.attributes.content}
            </ReactMarkdown>
 </div>

 )}
 
          </div>
        </div>
      </div>
    );
  })
}


      </div>
    </div>
  )
}

export default AboutUs