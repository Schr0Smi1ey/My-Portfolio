import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useMediaQuery } from "react-responsive";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lightgallery-bundle.css";

// Import your images
import first_term from "../../../../assets/Home/Certificates/1.1_Term.jpg";
import second_term from "../../../../assets/Home/Certificates/1.2_Term.jpg";
import hacker_rank from "../../../../assets/Home/Certificates/HackerRank.png";
import hackathon from "../../../../assets/Home/Certificates/Hackthon_champion.jpg";
import icpc from "../../../../assets/Home/Certificates/ICPC_2.png";
import national_science from "../../../../assets/Home/Certificates/National_Science_Technology_Week.jpg";
import postman from "../../../../assets/Home/Certificates/PostMan.png";
import phitron_club from "../../../../assets/Home/Certificates/Phitron_Problem_Solving_Club.jpg";
import web_development from "../../../../assets/Home/Certificates/Web-Development-Certificate.jpg";
import merit_scholarship_certificate from "../../../../assets/Home/Certificates/Merit_Schrolarship_Certificate.jpg";
import spark_tank_1 from "../../../../assets/Home/Certificates/Spark_Tank_1.0_3rd_Position.jpg"
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { motion } from "framer-motion";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const photos = [
  {
    key: "first_term",
    src: first_term,
    width: 800,
    height: 600,
    title: "First Term Certificate",
  },
  {
    key: "second_term",
    src: second_term,
    width: 800,
    height: 600,
    title: "Second Term Certificate",
  },
  {
    key: "hacker_rank",
    src: hacker_rank,
    width: 700,
    height: 800,
    title: "HackerRank Basic Problem Solver Certificate",
  },
  {
    key: "hackathon",
    src: hackathon,
    width: 1200,
    height: 800,
    title: "National Hackathon Champion",
  },
  {
    key: "icpc",
    src: icpc,
    width: 800,
    height: 600,
    title: "ICPC Certificate",
  },
  {
    key: "national_science",
    src: national_science,
    width: 800,
    height: 600,
    title: "National Science and Technology Week Certificate",
  },
  {
    key: "postman",
    src: postman,
    width: 600,
    height: 800,
    title: "Postman API Fundamentals Student Expert Certificate",
  },
  {
    key: "phitron_club",
    src: phitron_club,
    width: 800,
    height: 600,
    title: "Phitron Problem Solving Club Certificate",
  },
  {
    key: "web_development",
    src: web_development,
    width: 800,
    height: 600,
    title: "Complete Web Development Certificate",
  },
  {
    key: "merit_scholarship_certificate",
    src: merit_scholarship_certificate,
    width: 800,
    height: 600,
    title: "Merit Scholarship Certificate",
  },
  {
    key: "spark_tank_1",
    src: spark_tank_1,
    width: 800,
    height: 600,
    title: "Spark Tank 1.0 3rd Position",
  }
];
const shuffleArray = (array) => {
  return array
    .map((item) => ({ ...item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ sort, ...item }) => item);
};

const Certifications = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [shuffledPhotos, setShuffledPhotos] = useState([]);
  const swiperRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  useEffect(() => {
    setShuffledPhotos(shuffleArray(photos));
  }, []);
  useEffect(() => {
    if (lightboxOpen) {
      window.history.pushState(null, "", window.location.href);
      const handleBackButton = () => setLightboxOpen(false);
      window.addEventListener("popstate", handleBackButton);
      return () => window.removeEventListener("popstate", handleBackButton);
    }
  }, [lightboxOpen]);
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-gray-900 dark:text-white font-extrabold sm:text-4xl">
            📜 My Certifications & Achievements
          </h2>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-400">
            A showcase of my hard-earned skills, accomplishments, and
            recognitions.
          </p>
        </div>

        {isMobile ? (
          <div className="relative px-2 py-8">
            <Swiper
              ref={swiperRef}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              coverflowEffect={{
                rotate: 20,
                stretch: 0,
                depth: 150,
                modifier: 1.5,
                slideShadows: true,
              }}
              modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
              className="mySwiper"
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
              }}
            >
              {photos.map((photo, index) => (
                <SwiperSlide
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                  key={index}
                  className="w-full"
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-transform duration-300">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-auto object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <h3 className="text-white text-lg font-semibold">
                        {photo.title}
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className="absolute top-1/2 -left-6 sm:-left-8 transform -translate-y-1/2 z-10 rounded-full shadow-lg transition-all"
              onClick={() => swiperRef.current.swiper.slidePrev()}
            >
              <IoMdArrowDropleft className="text-2xl" />
            </button>

            <button
              className="absolute top-1/2 -right-6 sm:-right-8 transform -translate-y-1/2 z-10 rounded-full shadow-lg transition-all"
              onClick={() => swiperRef.current.swiper.slideNext()}
            >
              <IoMdArrowDropright className="text-2xl" />
            </button>
          </div>
        ) : (
          <div className="px-2 md:px-4">
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {shuffledPhotos.map((photo, index) => (
                <motion.div
                  key={photo.key}
                  href={photo.src}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className={`relative h-${photo.height}px  w-${photo.width}px cursor-pointer group overflow-hidden rounded-lg shadow-lg`}
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                >
                  <a
                    className="relative group overflow-hidden rounded-xl shadow-md transition-all cursor-pointer"
                    data-sub-html={`<h4>${photo.title}</h4>`}
                  >
                    <img
                      alt={photo.title}
                      src={photo.src}
                      style={{
                        aspectRatio: `${photo.width} / ${photo.height}`,
                      }}
                      className={`object-cover transition-transform duration-500 group-hover:scale-105`}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 text-center flex flex-col items-center justify-center text-white text-lg font-semibold transition-opacity duration-300">
                      <p>{photo.title}</p>
                      <span className="text-xs opacity-70">
                        Click to View in Fullscreen
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-20 transition-opacity z-0"></div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={photos}
          plugins={[Zoom, Thumbnails, Download]}
          zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
          thumbnails={{ position: "bottom", width: 100, height: 80, border: 2 }}
          controller={{ closeOnBackdropClick: true }}
        />
      </div>
    </div>
  );
};

export default Certifications;
