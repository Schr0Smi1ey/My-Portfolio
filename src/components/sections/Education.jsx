import { motion, useReducedMotion } from "framer-motion";
import {
  FaAward,
  FaCertificate,
  FaCode,
  FaMedal,
  FaTrophy,
} from "react-icons/fa";
import varsity from "../../assets/Home/edu/khulna-university.jpg";
import college from "../../assets/Home/edu/ibn-taimiya-school-college.jpg";
import postman from "../../assets/Home/edu/postman.png";

const educationData = [
  {
    number: "01",
    img: varsity,
    years: "2023 - Present",
    institution: "Khulna University",
    degree: "B.Sc. in Computer Science & Engineering",
    metricLabel: "CGPA",
    metricValue: "3.95",
    metricScale: "/ 4.00",
    highlights: [
      { label: "Merit Scholarship", icon: FaTrophy },
      { label: "Hackathon Champion", icon: FaCode },
      { label: "Postman Student Expert", image: postman },
    ],
  },
  {
    number: "02",
    img: college,
    years: "2019 - 2021",
    institution: "Ibn Taimiya School & College",
    degree: "Higher Secondary Certificate, Science",
    metricLabel: "GPA",
    metricValue: "5.00",
    metricScale: "/ 5.00",
    highlights: [
      { label: "2nd, Upazila Science Olympiad 2020", icon: FaMedal },
      { label: "Certificate of Merit", icon: FaAward },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const HighlightPill = ({ item }) => {
  const Icon = item.icon;

  return (
    <span className="inline-flex max-w-full min-w-0 items-center gap-2 rounded-full border border-white/12 bg-black/30 px-3 py-1.5 text-[0.7rem] font-bold text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl">
      <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
        {item.image ? (
          <img src={item.image} alt="" className="h-3 w-3 object-contain" />
        ) : (
          <Icon className="h-2 w-2" />
        )}
      </span>
      <span className="truncate">{item.label}</span>
    </span>
  );
};

const EducationRecord = ({ edu, index }) => (
  <motion.article
    variants={fadeUp}
    className="group relative min-h-[20rem] overflow-hidden rounded-2xl border border-white/10 bg-[#07070c] shadow-[0_30px_100px_rgba(0,0,0,0.34)] md:min-h-[16rem]"
  >
    <img
      src={edu.img}
      alt={edu.institution}
      className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-[1.03]"
    />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,7,0.98)_0%,rgba(3,3,7,0.92)_18%,rgba(3,3,7,0.7)_43%,rgba(3,3,7,0.22)_78%,rgba(3,3,7,0.08)_100%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_50%,rgb(var(--color-primary-rgb)/0.14),transparent_34%)]" />

    <div className="relative z-10 grid min-h-[20rem] gap-16 p-5 sm:p-6 md:min-h-[16rem] md:grid-cols-[8rem_1fr] lg:grid-cols-[10rem_1fr]">
      <div className="pointer-events-none absolute left-4 top-16 z-0 font-display text-[6.5rem] leading-none text-primary/[0.13] sm:left-6 sm:text-[7.5rem] md:static md:self-center md:text-[8.5rem] lg:text-[9.5rem]">
        {edu.number}
      </div>

      <div className="relative z-10 ml-0 flex max-w-3xl flex-col justify-center md:-ml-5 lg:-ml-7">
        <div className="mb-4 w-fit rounded-full border border-primary/45 bg-black/25 px-3 py-1 font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-xl">
          {edu.years}
        </div>

        <h3 className="text-lg font-black uppercase leading-[0.96] tracking-tight text-white sm:text-3xl lg:text-4xl">
          {edu.institution}
        </h3>
        <p className="mt-2 text-xs font-medium text-zinc-300 sm:text-sm">
          {edu.degree}
        </p>

        <div className="mt-4 h-px w-10 bg-primary" />

        <div className="mt-4 grid gap-4 md:grid-cols-[8rem_1fr]">
          <div>
            <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] text-primary">
              {edu.metricLabel}
            </p>
            <div className="mt-2 flex items-end gap-2">
              <span className="font-display text-3xl leading-none text-primary sm:text-4xl">
                {edu.metricValue}
              </span>
              <span className="pb-1 font-mono text-[0.68rem] font-bold text-zinc-500">
                {edu.metricScale}
              </span>
            </div>
          </div>

          <div className="border-white/10 md:border-l md:pl-5">
            <p className="mb-3 font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] text-primary">
              Highlights
            </p>
            <div className="flex max-w-lg flex-wrap items-start gap-2">
              {edu.highlights.map((item) => (
                <HighlightPill key={item.label} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.article>
);

const Education = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="education"
      className="about-cosmic-section relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#05050a] px-4 py-20 mb-20 text-white md:px-8 md:py-24"
    >
      <div className="about-cosmic-starfield" aria-hidden="true" />
      <div className="cosmic-noise" aria-hidden="true" />
      <motion.div
        className="cosmic-orb cosmic-orb-left"
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? {}
            : { y: [0, -14, 0], x: [0, 8, 0], scale: [1, 1.04, 1] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="cosmic-orb cosmic-orb-right"
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? {}
            : { y: [0, 16, 0], x: [0, -8, 0], scale: [1, 1.05, 1] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1, delayChildren: 0.08 },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 mx-auto max-w-6xl"
      >
        <motion.div
          variants={fadeUp}
          className="mb-7 grid gap-6 md:grid-cols-[0.98fr_1fr] md:items-center lg:mb-9"
        >
          <div>
            <div className="mb-4 flex items-center gap-4">
              <span className="h-4 w-4 rounded-full bg-primary shadow-[0_0_18px_rgb(var(--color-primary-rgb)/0.7)]" />
              <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.34em] text-zinc-400">
                Academic Journey
              </p>
            </div>
            <h2 className="font-display text-3xl leading-[0.82] tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl">
              Education
            </h2>
          </div>
          <div className="flex items-center gap-7">
            <span className="hidden h-16 w-px bg-primary/80 md:block" />
            <p className="max-w-md text-sm leading-7 text-zinc-400">
              My academic foundation where curiosity turned into capability and
              values into vision.
            </p>
          </div>
        </motion.div>

        <div className="space-y-4">
          {educationData.map((edu, index) => (
            <EducationRecord key={edu.institution} edu={edu} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Education;
