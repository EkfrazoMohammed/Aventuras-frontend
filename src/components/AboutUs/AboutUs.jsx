import React, { useEffect, useState } from 'react'
import "./AboutUs.scss"

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const [currentPath, setCurrentPath] = useState();

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])
  localStorage.setItem('pathName', currentPath)
  return (
    <div className="about-us-page-container">
      <div className="about-us-page-wrapper">
        <div className="about-us-text-container">
          <div className="heading">
            About Us
          </div>
          <div className="para-container">
            <div className="sections">
              <div className="para">
                Step into a world of exploration and discovery with Aventuras Holidays, a dynamic and innovative travel startup that was founded in July 2022. Our journey began with a singular vision: to revolutionize the travel industry and make globetrotting an accessible and seamless experience for everyone.
              </div>
              <div className="para">
                At Aventuras Holidays, we believe that travel should be more than just a destination; it should be a transformative journey that enriches your life and broadens your horizons. With a firm commitment to providing hassle-free and affordable travel solutions, we have quickly become a preferred choice for wanderlust enthusiasts from all walks of life.
              </div>
              <div className="para">
                In a remarkably short span of time, we have achieved a remarkable feat - having served over 5000 clients within our first year of operation. This impressive milestone stands as a testament to our dedication and passion for curating and executing unparalleled travel experiences. From meticulously planned itineraries to personalized recommendations, our team of travel experts ensures that every aspect of your journey is tailored to perfection.
              </div>
              <div className="para">
                Whether you're yearning for a serene beach getaway, an exhilarating adventure in the mountains, or an immersive cultural experience in a far-flung corner of the world, Aventuras Holidays is your ultimate companion. With our extensive network of partners and a keen eye for detail, we transform your travel dreams into cherished memories.
              </div>
              <div className="para">
                As we embark on this exhilarating expedition, we invite you to be a part of our ever-growing family of explorers. Let us take care of the intricacies while you embrace the joy of traveling without bounds. Join us in celebrating the art of exploration, the spirit of discovery, and the thrill of embarking on journeys that leave an indelible mark on your soul.
              </div>
              <div className="para">
                Your journey of a lifetime begins with Aventuras Holidays - where affordability, adventure, and authenticity converge to create travel experiences like no other. Come, let's redefine the way you experience the world.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs