import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import varsity from "../../assets/Home/edu/khulna-university.jpg";
import college from "../../assets/Home/edu/ibn-taimiya-school-college.jpg";
import Background from "../Background";
import hackerrank from "../../assets/Home/edu/hackerrank.png";
import postman from "../../assets/Home/edu/postman.png";

import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/800.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import StatCard from "../ui/StatCard";

// ─── Data ─────────────────────────────────────────────────────────────────────

const educationData = [
  {
    img: varsity,
    institution: "Khulna University",
    degree: "B.Sc. in Computer Science & Engineering",
    years: "2023 – Present",
    gpa: "CGPA - 3.95",
    scale: "4.0",
    progress: (3.95 / 4) * 100,
    achievements: [
      { name: "Merit Scholarship", icon: "🏅", type: "emoji" },
      { name: "Hackathon Champion", icon: "🏆", type: "emoji" },
      { name: "Poster Presentation Champion", icon: "🎨", type: "emoji" },
    ],
    certifications: [
      {
        name: "Web Development",
        issuer: "Programming Hero",
        icon: "💻",
        type: "emoji",
      },
      {
        name: "Postman Student Expert",
        issuer: "Postman",
        icon: postman,
        type: "image",
      },
      {
        name: "Problem Solving (Basic)",
        issuer: "HackerRank",
        icon: hackerrank,
        type: "image",
      },
    ],
  },
  {
    img: college,
    institution: "Ibn Taimiya School & College",
    degree: "Higher Secondary Certificate (HSC) · Science",
    years: "2019 – 2021",
    gpa: "GPA - 5.00",
    scale: "5.00",
    progress: 100,
    achievements: [
      { name: "2nd · Upazila Science Olympiad '20", icon: "🔬", type: "emoji" },
      { name: "Certificate of Merit", icon: "📜", type: "emoji" },
    ],
    certifications: [],
  },
];

const stats = [
  {
    description: "Current CGPA",
    value: "3.95",
    color: "from-violet-600 to-purple-600",
  },
  {
    description: "HSC GPA",
    value: "5.00",
    color: "from-blue-600 to-cyan-600",
  },
  {
    description: "Achievements",
    value: "8+",
    color: "from-emerald-600 to-teal-600",
  },
  {
    description: "UNI. Enrolled",
    value: "2023",
    color: "from-orange-600 to-pink-600",
  },
];

// ─── ProgressBar ──────────────────────────────────────────────────────────────

function ProgressBar({ progress }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500"
          style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
          Academic Performance
        </span>
        <span
          className="text-[11px] font-semibold text-primary"
          style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
          {progress.toFixed(1)}%
        </span>
      </div>
      <div className="h-[2px] w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${progress}%` } : {}}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="h-full rounded-full bg-primary"
        />
      </div>
    </div>
  );
}

// ─── EduCard ──────────────────────────────────────────────────────────────────

function EduCard({ edu, index }) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`relative flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } mb-24 md:mb-32 last:mb-0`}
    >
      {/* Timeline node */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 z-20 items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: index * 0.1,
          }}
          viewport={{ once: true }}
          className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.55,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.08,
        }}
        viewport={{ once: true }}
        className="w-full md:w-[calc(50%-52px)] group"
      >
        <div className="rounded-2xl border border-gray-200/80 dark:border-gray-700/50 bg-white dark:bg-gray-900 hover:border-primary/25 dark:hover:border-primary/25 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30">
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={edu.img}
              alt={edu.institution}
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

            {/* Year */}
            <div className="absolute top-4 right-4">
              <span
                className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/10 backdrop-blur-md text-white/90 border border-white/15"
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                {edu.years}
              </span>
            </div>

            {/* Institution info over image */}
            <div className="absolute bottom-4 left-5 right-5">
              <h3
                className="text-xl font-bold text-white leading-tight"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                {edu.institution}
              </h3>
              <p
                className="text-xs text-white/80 mt-1"
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                {edu.degree}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
            {/* GPA chip */}
            <div>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary/8 dark:bg-primary/10 text-primary border border-primary/15"
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                🏅 {edu.gpa} / {edu.scale}
              </span>
            </div>
            <div className="flex justify-center my-6">
              <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-black to-transparent rounded-full" />
            </div>

            {/* Achievements */}
            <div className="space-y-2.5">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500"
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                Achievements
              </p>
              <div className="flex flex-wrap gap-2">
                {edu.achievements.map((a, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.04 * i }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/80 text-gray-700 dark:text-gray-300 hover:border-primary/30 hover:text-primary dark:hover:text-primary transition-colors duration-200"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    <span className="text-[13px]">{a.icon}</span>
                    {a.name}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            {edu.certifications.length > 0 && (
              <>
                <div className="flex justify-center my-6">
                  <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-black to-transparent rounded-full" />
                </div>

                <div className="space-y-2.5">
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500"
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    Certifications
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {edu.certifications.map((c, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.04 * i }}
                        viewport={{ once: true }}
                        title={`Issued by ${c.issuer}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/80 text-gray-700 dark:text-gray-300 hover:border-primary/30 hover:text-primary dark:hover:text-primary transition-colors duration-200 cursor-help"
                        style={{ fontFamily: '"Inter", sans-serif' }}
                      >
                        {c.type === "image" ? (
                          <img
                            src={c.icon}
                            alt={c.name}
                            className="w-4 h-4 object-contain"
                          />
                        ) : (
                          <span className="text-[13px]">{c.icon}</span>
                        )}
                        {c.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </>
            )}
            <div className="flex justify-center my-6">
              <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-black to-transparent rounded-full" />
            </div>
            <ProgressBar progress={edu.progress} />
          </div>
        </div>
      </motion.div>

      {/* Empty half for alternating layout */}
      <div className="hidden md:block md:w-1/2" />
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const Education = () => (
  <section
    id="education"
    className="relative py-20 md:py-28 lg:py-32 overflow-hidden"
  >
    <Background
      mouseGlow={true}
      showGrid={true}
      showGridPattern={true}
      showBottomFade={true}
      showNoise={true}
      showOrbs={true}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-primary/20 bg-primary/5 text-primary"
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            📚 Academic Journey
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-[5.5rem] text-black font-bold tracking-tight mb-5"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Education
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto leading-relaxed"
            style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "1.05rem" }}
          >
            A strong academic foundation that shapes my problem-solving approach
            and fuels my passion for innovation.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{ originY: 0 }}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800"
          />

          {educationData.map((edu, i) => (
            <EduCard key={i} edu={edu} index={i} />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {stats.map((s, i) => (
            <StatCard
              key={s.description}
              value={s.value}
              description={s.description}
              color={s.color}
            ></StatCard>
          ))}
        </motion.div>
      </div>
    </Background>
  </section>
);

export default Education;
