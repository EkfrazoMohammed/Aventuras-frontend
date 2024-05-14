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
const res = await API.get(`https://admin.aventuras.co.in/api/about-uses?populate=deep`)
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
  console.log(data?.map((content)=>content?.data.data[0].attributes.Aventuras_team.map((val)=>val.member_name)))
  return (
    <>
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
           <h1 className="heading_team" >Meet Our Team. The ideal set of extraordinary people</h1>
      </div>
    );
  })
}


      </div>

 
    </div>
    <div className="about_main-wrapper" >
{
   data?.map((content) => {
    return(
      <div className="about-team-section">
      {content?.data.data[0].attributes.Aventuras_team.map((val)=>    
<div className="card">
           <div className="card-image-container">
             <img src={`https://admin.aventuras.co.in/${val.profile_image.data.attributes.url}`} alt="" />
           </div>
      <div className="card-heading">
       <h2>{val.member_name}</h2>
       <h3>{val.designation}r</h3>
      </div>
      <div className="card-description">{val.profile_description}
</div>
          </div>
   
     )}
          
        </div>
    )

   })
}
       
    </div>
         </>
  )
}

export default AboutUs