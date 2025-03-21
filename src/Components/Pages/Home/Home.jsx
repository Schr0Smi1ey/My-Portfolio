import Banner from "./Banner/Banner";
import AboutMe from "./AboutMe/AboutMe";
import Education from "./Education/Education";
import CodingProfile from "./CodingProfile/CodingProfile";
import Skills from "./Skills/Skills";
import FeaturedProjects from "./FeaturedProjects/FeaturedProjects";
import ContactInfo from "./ContactInfo/ContactInfo";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="background dark:bg-black dark:bg-none dark:text-white relative overflow-hidden pt-10">
      <Helmet>
        <title>Schr0Smi1ey | Home</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative z-10 py-12 md:py-20">
        <Banner />
        <AboutMe />
        <Education />
        <CodingProfile />
        <Skills />
        <FeaturedProjects />
        <ContactInfo />
      </div>
    </div>
  );
};

export default Home;
