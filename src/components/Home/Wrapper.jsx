import React, { useState, useEffect, Suspense, lazy } from "react";
import Footer from "../Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
const Banner = lazy(() => import("./Banner/Banner"));
const TopDestinations = lazy(() => import("./Destinations/TopDestinations"));
const SpecialPackages = lazy(() => import("./Packages/SpecialPackages"));
const Theme = lazy(() => import("./Theme/Theme"));
const Newsletter = lazy(() => import("./Newsletter/Newsletter"));
const Holidays = lazy(() => import("./Holidays/Holidays"));
const Testimonial = lazy(() => import("./Testimonial/Testimonial"));

const Wrapper = ({ data, loading }) => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <Banner
        data={data.banners}
        brandinfos={data.brandinfos}
        loading={loading}
      />
      {/* <div data-aos="fade-right"
       data-aos-duration="1000"> */}
      <SpecialPackages data={data.special_packages} loading={loading} />
      {/* </div> */}
      {/* <div data-aos="fade-left"
       data-aos-duration="1000"> */}
      <TopDestinations data={data.destinations} loading={loading} />

      {/*</div> <div data-aos="fade-right"
       data-aos-duration="1000"> */}
      <Holidays data={data.group_tours} loading={loading} />

      {/* </div> */}
      {/* <div data-aos="fade-left"
       data-aos-duration="2000"> */}
      <Theme data={data.theme} loading={loading} />
      {/* </div>
      <div data-aos="fade-right"
       data-aos-duration="2000"> */}
      <Testimonial
        data={data.testimonial}
        contactData={data.contact_details}
        loading={loading}
      />

      <Newsletter />
      {/* </div> */}

      {/* <Footer destinations={data.destinations} themes={data.theme} loading={loading}/> */}
    </>
  );
};

export default Wrapper;
