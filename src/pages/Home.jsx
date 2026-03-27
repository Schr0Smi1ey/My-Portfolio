import { useEffect } from "react";
import SEO from "../components/SEO";
import Banner from "../components/sections/Banner";
import AboutMe from "../components/sections/AboutMe";
import Education from "../components/sections/Education";
import CodingProfile from "../components/sections/CodingProfile";
import Skills from "../components/sections/Skills";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import GitHubStats from "../components/sections/GitHubStats";
import Certifications from "../components/sections/Certifications";
import ContactInfo from "../components/sections/ContactInfo";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="background dark:bg-black dark:bg-none dark:text-white relative overflow-hidden">
      <SEO />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 pt-5 pb-12 md:py-14">
        <Banner />
        <AboutMe />
        <Education />
        <CodingProfile />
        <Skills />
        <FeaturedProjects />
        <GitHubStats />
        <Certifications />
        <ContactInfo />
      </div>
    </div>
  );
};

export default HomePage;
