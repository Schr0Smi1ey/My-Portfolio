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
import { motion, useReducedMotion } from "framer-motion";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import {
  IoMdArrowDropleft,
  IoMdArrowDropright,
  IoMdTrophy,
  IoMdSchool,
  IoMdRibbon,
  IoMdMedal,
} from "react-icons/io";
import { FaCertificate, FaStar, FaSearch, FaExpand } from "react-icons/fa";

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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

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
  },
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
  const shouldReduceMotion = useReducedMotion();

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

  const categories = [
    { id: "all", label: "All Certificates", count: photos.length },
    {
      id: "Academic",
      label: "Academic",
      count: photos.filter((p) => p.category === "Academic").length,
    },
    {
      id: "Achievement",
      label: "Achievements",
      count: photos.filter((p) => p.category === "Achievement").length,
    },
    {
      id: "Coding",
      label: "Coding",
      count: photos.filter((p) => p.category === "Coding").length,
    },
    {
      id: "Certification",
      label: "Certifications",
      count: photos.filter((p) => p.category === "Certification").length,
    },
  ];

  const filteredPhotos =
    activeFilter === "all"
      ? shuffledPhotos
      : shuffledPhotos.filter((photo) => photo.category === activeFilter);

  return (
    <section
      id="certifications"
      className="about-cosmic-section relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#05050a] px-4 mb-20 py-24 text-zinc-950 dark:text-white md:px-8"
    >
      {/* Cosmic Background Elements */}
      <motion.div
        aria-hidden="true"
        className="about-transition-veil"
        animate={
          shouldReduceMotion
            ? {}
            : {
                opacity: [0.5, 0.72, 0.5],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="about-cosmic-starfield" aria-hidden="true" />
      <div className="cosmic-noise" aria-hidden="true" />

      <motion.div
        className="cosmic-orb cosmic-orb-left"
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? {}
            : { y: [0, -16, 0], x: [0, 8, 0], scale: [1, 1.04, 1] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="cosmic-orb cosmic-orb-right"
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? {}
            : { y: [0, 18, 0], x: [0, -8, 0], scale: [1, 1.05, 1] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.07, delayChildren: 0.08 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 flex items-center justify-center gap-4"
          >
            <span className="h-4 w-4 rounded-full bg-primary shadow-[0_0_20px_rgb(var(--color-primary-rgb)/0.7)]" />
            <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.3em] text-zinc-600 dark:text-zinc-400">
              Achievements & Recognition
            </p>
            <span className="h-4 w-4 rounded-full bg-primary shadow-[0_0_20px_rgb(var(--color-primary-rgb)/0.7)]" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl leading-[0.82] tracking-tight text-zinc-950 dark:text-white sm:text-4xl lg:text-5xl"
          >
            Certifications &{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Awards
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400"
          >
            A showcase of my hard-earned skills, accomplishments, and
            recognitions
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        {!isMobile && (
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
            }
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-12 flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                transition={{ duration: 0.22 }}
                onClick={() => setActiveFilter(category.id)}
                className={`rounded-full border px-6 py-3 text-sm font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] transition-all duration-300 ${
                  activeFilter === category.id
                    ? "border-primary/50 bg-primary/15 text-primary shadow-[0_0_30px_rgb(var(--color-primary-rgb)/0.2)]"
                    : "border-zinc-700/50 bg-white/[0.035] text-zinc-400 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {category.label}
                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-[0.58rem] ${
                    activeFilter === category.id
                      ? "bg-primary/20 text-primary"
                      : "bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {category.count}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Gallery Section */}
        {isMobile ? (
          <div className="relative px-2 py-8">
            <Swiper
              ref={swiperRef}
              effect="coverflow"
              grabCursor
              centeredSlides
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
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                      setLightboxIndex(index);
                      setLightboxOpen(true);
                    }}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-700/50 bg-white/[0.035] backdrop-blur-sm"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                      <div className="absolute left-4 top-4 rounded-lg border border-primary/30 bg-primary/10 p-2 backdrop-blur-sm">
                        <span className="text-xl text-primary">
                          {photo.icon}
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="mb-1 text-xl font-bold">
                          {photo.title}
                        </h3>
                        {photo.subtitle && (
                          <p className="mb-2 text-sm text-zinc-300">
                            {photo.subtitle}
                          </p>
                        )}
                        <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[0.58rem] font-bold uppercase tracking-[0.14em] text-primary backdrop-blur-sm">
                          {photo.category}
                        </span>
                      </div>

                      <div className="absolute right-4 top-4 rounded-lg border border-primary/30 bg-primary/10 p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-sm">
                        <FaExpand className="text-lg text-primary" />
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              className="absolute top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-black/75 text-primary backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-white disabled:opacity-50 -left-4"
              onClick={() => swiperRef.current?.swiper.slidePrev()}
            >
              <IoMdArrowDropleft className="text-2xl" />
            </button>
            <button
              className="absolute top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-black/75 text-primary backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-white disabled:opacity-50 -right-4"
              onClick={() => swiperRef.current?.swiper.slideNext()}
            >
              <IoMdArrowDropright className="text-2xl" />
            </button>
          </div>
        ) : (
          <div className="px-2">
            <div className="columns-2 space-y-6 gap-6 md:columns-3 lg:columns-4">
              {filteredPhotos.map((photo, index) => (
                <motion.div
                  key={photo.key}
                  initial={
                    shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
                  }
                  animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.03 }}
                  whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.02 }}
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                  className="group relative mb-6 cursor-pointer break-inside-avoid"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-zinc-700/50 bg-white/[0.035] shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:border-primary/30">
                    <div className="relative overflow-hidden">
                      <div className="w-full bg-gradient-to-br from-zinc-800/50 to-zinc-900/50">
                        <img
                          alt={photo.title}
                          src={photo.src}
                          className="h-auto w-full object-cover transition-all duration-700 group-hover:scale-110"
                        />
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100">
                        <div className="absolute left-4 top-4 rounded-lg border border-primary/30 bg-primary/10 p-2 backdrop-blur-sm">
                          <span className="text-xl text-primary">
                            {photo.icon}
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-5 text-white transition-transform duration-500 group-hover:translate-y-0">
                          <h3 className="mb-1 line-clamp-2 text-lg font-bold">
                            {photo.title}
                          </h3>
                          {photo.subtitle && (
                            <p className="mb-2 line-clamp-1 text-sm text-zinc-300">
                              {photo.subtitle}
                            </p>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[0.58rem] font-bold uppercase tracking-[0.14em] text-primary backdrop-blur-sm">
                              {photo.category}
                            </span>
                            <span className="rounded-full border border-primary/30 bg-primary/10 p-1.5 backdrop-blur-sm">
                              <FaSearch className="text-xs text-primary" />
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

        {/* Statistics Section - Glass Morphism Style */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, margin: "-60px" }}
          className="about-bento-card mt-20 p-5 lg:p-7"
        >
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { count: photos.length, label: "Total Certificates" },
              {
                count: photos.filter((p) => p.category === "Achievement")
                  .length,
                label: "Achievements",
              },
              {
                count: photos.filter((p) => p.category === "Coding").length,
                label: "Coding Certifications",
              },
              {
                count: photos.filter((p) => p.category === "Academic").length,
                label: "Academic Excellence",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: 0.1 + index * 0.05,
                }}
                className="text-center"
              >
                <div className="font-serif text-3xl font-bold text-primary md:text-4xl">
                  {stat.count}+
                </div>
                <div className="mt-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-zinc-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
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
    </section>
  );
};

export default Certifications;
