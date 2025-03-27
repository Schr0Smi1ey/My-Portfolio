import React, { useRef, useState } from "react";
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
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";

import first_term from "../../../../assets/Home/Certificates/1.1_Term.jpg";
import second_term from "../../../../assets/Home/Certificates/1.2_Term.jpg";
import hacker_rank from "../../../../assets/Home/Certificates/HackerRank.png";
import hackathon from "../../../../assets/Home/Certificates/Hackthon_champion.jpg";
import icpc from "../../../../assets/Home/Certificates/ICPC_2.png";
import national_science from "../../../../assets/Home/Certificates/National_Science_Technology_Week.jpg";
import postman from "../../../../assets/Home/Certificates/PostMan.png";
import phitron_club from "../../../../assets/Home/Certificates/Phitron_Problem_Solving_Club.jpg";
import web_development from "../../../../assets/Home/Certificates/Web-Development-Certificate.jpg";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const photos = [
  {
    src: first_term,
    width: 800,
    height: 600,
    title: "First Term Certificate",
    downloadUrl: first_term,
  },
  {
    src: second_term,
    width: 800,
    height: 600,
    title: "Second Term Certificate",
    downloadUrl: second_term,
  },
  {
    src: hacker_rank,
    width: 600,
    height: 800,
    title: "HackerRank Certificate",
    downloadUrl: hacker_rank,
  },
  {
    src: hackathon,
    width: 1200,
    height: 800,
    title: "Hackathon Champion",
    downloadUrl: hackathon,
  },
  {
    src: icpc,
    width: 800,
    height: 600,
    title: "ICPC Certificate",
    downloadUrl: icpc,
  },
  {
    src: national_science,
    width: 800,
    height: 600,
    title: "National Science and Technology Week",
    downloadUrl: national_science,
  },
  {
    src: postman,
    width: 600,
    height: 800,
    title: "Postman - Postman API Fundamentals Student Expert",
    downloadUrl: postman,
  },
  {
    src: phitron_club,
    width: 800,
    height: 600,
    title: "Phitron Problem Solving Club",
    downloadUrl: phitron_club,
  },
  {
    src: web_development,
    width: 800,
    height: 600,
    title: "Web Development Certificate",
    downloadUrl: web_development,
  },
];

const Certifications = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const swiperRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
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
                <SwiperSlide key={index} className="w-full">
                  <div className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105">
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
            <MasonryPhotoAlbum
              layout="masonry"
              photos={photos}
              columns={(containerWidth) => (containerWidth < 1024 ? 2 : 3)}
              spacing={20}
              padding={10}
              onClick={({ index }) => {
                setLightboxIndex(index);
                setLightboxOpen(true);
              }}
              renderPhoto={({ photo, imageProps }) => (
                <div
                  key={photo.title}
                  className="relative group overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-2xl cursor-pointer"
                >
                  <img
                    {...imageProps}
                    alt={photo.title}
                    className="w-full h-auto object-cover transition-transform duration-500 transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 z-10">
                    <h3 className="text-white text-lg font-semibold">
                      {photo.title}
                    </h3>
                  </div>
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
                </div>
              )}
            />
          </div>
        )}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={photos}
          plugins={[Zoom, Download]}
          controller={{ closeOnBackdropClick: true }}
        />
      </div>
    </div>
  );
};

export default Certifications;
