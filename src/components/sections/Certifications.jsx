import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
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
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// Icons
import { 
  IoMdArrowDropleft, 
  IoMdArrowDropright,
  IoMdTrophy,
  IoMdSchool,
  IoMdRibbon,
  IoMdMedal
} from "react-icons/io";
import { 
  FaCertificate, 
  FaAward, 
  FaStar, 
  FaSearch,
  FaDownload,
  FaExpand
} from "react-icons/fa";

// Import your images
import first_term from "../../assets/Home/Certificates/1.1_Term.jpg";
import second_term from "../../assets/Home/Certificates/1.2_Term.jpg";
import hacker_rank from "../../assets/Home/Certificates/HackerRank.png";
import hackathon from "../../assets/Home/Certificates/Hackthon_champion.jpg";
import icpc from "../../assets/Home/Certificates/ICPC_2.png";
import national_science from "../../assets/Home/Certificates/National_Science_Technology_Week.jpg";
import postman from "../../assets/Home/Certificates/PostMan.png";
import phitron_club from "../../assets/Home/Certificates/Phitron_Problem_Solving_Club.jpg";
import web_development from "../../assets/Home/Certificates/Web-Development-Certificate.jpg";
import merit_scholarship_certificate from "../../assets/Home/Certificates/Merit_Schrolarship_Certificate.jpg";
import spark_tank_1 from "../../assets/Home/Certificates/Spark_Tank_1.0_3rd_Position.jpg";

const photos = [
  {
    key: "first_term",
    src: first_term,
    width: 800,
    height: 600,
    title: "First Term Certificate",
    category: "Academic",
    icon: <IoMdSchool />,
  },
  {
    key: "second_term",
    src: second_term,
    width: 800,
    height: 600,
    title: "Second Term Certificate",
    category: "Academic",
    icon: <IoMdSchool />,
  },
  {
    key: "hacker_rank",
    src: hacker_rank,
    width: 700,
    height: 800,
    title: "HackerRank Problem Solver",
    subtitle: "Basic Problem Solving Certificate",
    category: "Coding",
    icon: <FaCertificate />,
  },
  {
    key: "hackathon",
    src: hackathon,
    width: 1200,
    height: 800,
    title: "National Hackathon Champion",
    subtitle: "1st Position",
    category: "Achievement",
    icon: <IoMdTrophy />,
  },
  {
    key: "icpc",
    src: icpc,
    width: 800,
    height: 600,
    title: "ICPC Participation",
    category: "Competition",
    icon: <IoMdRibbon />,
  },
  {
    key: "national_science",
    src: national_science,
    width: 800,
    height: 600,
    title: "National Science Week",
    subtitle: "Technology Competition",
    category: "Achievement",
    icon: <IoMdMedal />,
  },
  {
    key: "postman",
    src: postman,
    width: 600,
    height: 800,
    title: "Postman API Expert",
    subtitle: "API Fundamentals Student Expert",
    category: "Certification",
    icon: <FaCertificate />,
  },
  {
    key: "phitron_club",
    src: phitron_club,
    width: 800,
    height: 600,
    title: "Phitron Problem Solving Club",
    category: "Coding",
    icon: <FaStar />,
  },
  {
    key: "web_development",
    src: web_development,
    width: 800,
    height: 600,
    title: "Complete Web Development",
    category: "Certification",
    icon: <FaCertificate />,
  },
  {
    key: "merit_scholarship_certificate",
    src: merit_scholarship_certificate,
    width: 800,
    height: 600,
    title: "Merit Scholarship",
    category: "Academic",
    icon: <IoMdSchool />,
  },
  {
    key: "spark_tank_1",
    src: spark_tank_1,
    width: 800,
    height: 600,
    title: "Spark Tank 1.0",
    subtitle: "3rd Position",
    category: "Achievement",
    icon: <IoMdTrophy />,
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
  const [activeFilter, setActiveFilter] = useState("all");
  const swiperRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
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

  const categories = [
    { id: "all", label: "All Certificates", count: photos.length },
    { id: "Academic", label: "Academic", count: photos.filter(p => p.category === "Academic").length },
    { id: "Achievement", label: "Achievements", count: photos.filter(p => p.category === "Achievement").length },
    { id: "Coding", label: "Coding", count: photos.filter(p => p.category === "Coding").length },
    { id: "Certification", label: "Certifications", count: photos.filter(p => p.category === "Certification").length },
  ];

  const filteredPhotos = activeFilter === "all" 
    ? shuffledPhotos 
    : shuffledPhotos.filter(photo => photo.category === activeFilter);

  return (
    <section id="certifications" className="relative py-16 md:py-24 lg:py-28 overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, #94a3b815 1px, transparent 1px),
              linear-gradient(to bottom, #94a3b815 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        <div 
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(96, 165, 250, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(96, 165, 250, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20px 20px, rgba(96, 165, 250, 0.15) 1.5px, transparent 1.5px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-300 border border-primary/20 dark:border-primary/30 backdrop-blur-sm">
              🏆 Achievements & Recognition
            </span>
          </motion.div>

          {/* Title */}
          <h2
            data-aos="fade-up"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            A showcase of my hard-earned skills, accomplishments, and recognitions
          </p>
        </motion.div>

        {/* Category Filters - Desktop */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category.id
                    ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30 scale-105"
                    : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:border-primary/30 hover:bg-primary/5"
                }`}
              >
                {category.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeFilter === category.id
                    ? "bg-white/30 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </motion.div>
        )}

        {isMobile ? (
          // Mobile Swiper View
          <div className="relative px-2 py-8">
            <Swiper
              ref={swiperRef}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1.2}
              spaceBetween={20}
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
                rotate: 30,
                stretch: 0,
                depth: 200,
                modifier: 2,
                slideShadows: true,
              }}
              modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
              className="certification-swiper"
            >
              {filteredPhotos.map((photo, index) => (
                <SwiperSlide key={photo.key}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                      setLightboxIndex(index);
                      setLightboxOpen(true);
                    }}
                    className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                      
                      {/* Category Icon */}
                      <div className="absolute top-4 left-4 p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
                        <span className="text-white text-xl">
                          {photo.icon}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-bold mb-1">{photo.title}</h3>
                        {photo.subtitle && (
                          <p className="text-sm text-gray-200 mb-2">{photo.subtitle}</p>
                        )}
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm border border-white/30">
                          {photo.category}
                        </span>
                      </div>
                      
                      {/* View Icon */}
                      <div className="absolute top-4 right-4 p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <FaExpand className="text-white text-lg" />
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Navigation Buttons */}
            <button
              className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50"
              onClick={() => swiperRef.current?.swiper.slidePrev()}
            >
              <IoMdArrowDropleft className="text-2xl" />
            </button>
            <button
              className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50"
              onClick={() => swiperRef.current?.swiper.slideNext()}
            >
              <IoMdArrowDropright className="text-2xl" />
            </button>
          </div>
        ) : (
          // Desktop Masonry Grid
          // Desktop Masonry Grid - Pinterest Style with Perfect Gap Filling
<div className="px-2">
  <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
    {filteredPhotos.map((photo, index) => (
      <motion.div
        key={photo.key}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.03 }}
        whileHover={{ y: -8, scale: 1.02 }}
        onClick={() => {
          setLightboxIndex(index);
          setLightboxOpen(true);
        }}
        className="group relative cursor-pointer break-inside-avoid mb-6"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
          {/* Image Container */}
          <div className="relative overflow-hidden">
            <div className="w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
              <img
                alt={photo.title}
                src={photo.src}
                className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110"
              />
            </div>
            
            {/* Overlay - same as before */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="absolute top-4 left-4 p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
                <span className="text-white text-xl">{photo.icon}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-lg font-bold mb-1 line-clamp-2">{photo.title}</h3>
                {photo.subtitle && (
                  <p className="text-sm text-gray-200 mb-2 line-clamp-1">{photo.subtitle}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm border border-white/30">
                    {photo.category}
                  </span>
                  <span className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                    <FaSearch className="text-white text-xs" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</div>
        )}





        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {photos.length}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Certificates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                {photos.filter(p => p.category === "Achievement").length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Achievements</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                {photos.filter(p => p.category === "Coding").length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Coding Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                {photos.filter(p => p.category === "Academic").length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Academic Excellence</div>
            </div>
          </div>
        </motion.div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={photos}
          plugins={[Zoom, Thumbnails, Download]}
          zoom={{ 
            maxZoomPixelRatio: 3, 
            scrollToZoom: true,
            wheelZoom: true,
          }}
          thumbnails={{ 
            position: "bottom", 
            width: 100, 
            height: 80, 
            border: 2,
            borderRadius: 8,
          }}
          controller={{ 
            closeOnBackdropClick: true,
          }}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
            thumbnail: { borderRadius: "8px" },
          }}
        />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none" />

      <style>{`
        .certification-swiper {
          padding-bottom: 50px !important;
        }
        .certification-swiper .swiper-pagination-bullet {
          background: theme('colors.primary');
          opacity: 0.5;
        }
        .certification-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: theme('colors.primary');
          width: 30px;
          border-radius: 4px;
        }
        .certification-swiper .swiper-pagination-bullet-active-main {
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default Certifications;