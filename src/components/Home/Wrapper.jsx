import React, { useEffect, lazy } from "react";
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
      <SpecialPackages data={data.special_packages} loading={loading} />
      <TopDestinations data={data.destinations} loading={loading} />
      <Holidays data={data.group_tours} loading={loading} />
      <Theme data={data.theme} loading={loading} />
      <Testimonial data={data.testimonial} contactData={data.contact_details} loading={loading}
      />
      <Newsletter />
    </>
  );
};

export default Wrapper;
