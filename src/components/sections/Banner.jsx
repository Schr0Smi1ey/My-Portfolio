import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import DecryptedText from "../DecryptedText";
import profile from "../../assets/Home/Profile/profile-bw.png";
import { OWNER, SOCIAL_LINKS } from "../../constants";
import { useAuth } from "../../context/AuthContext";
import { useSiteContent } from "../../hooks";

const roles = ["Full Stack Developer", "AI/ML Enthusiast", "Problem Solver"];

const socialLinks = [
  { label: "Facebook", href: SOCIAL_LINKS.facebook, icon: <FaFacebookF /> },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: <FiLinkedin /> },
  { label: "GitHub", href: SOCIAL_LINKS.github, icon: <FiGithub /> },
  { label: "Twitter", href: SOCIAL_LINKS.twitter, icon: <FaXTwitter /> },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const CircularTalk = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
    className="absolute -right-4 top-8 z-30 hidden h-24 w-24 lg:block"
    aria-hidden="true"
  >
    <svg viewBox="0 0 120 120" className="h-full w-full">
      <defs>
        <path
          id="heroTalkCircle"
          d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
        />
      </defs>
      <text
        fontSize="10"
        fontWeight="700"
        letterSpacing="4"
        className="fill-zinc-300"
      >
        <textPath href="#heroTalkCircle">COME ON LET&apos;S TALK • </textPath>
      </text>
      <circle cx="60" cy="60" r="5" className="fill-primary" />
    </svg>
  </motion.div>
);

const Banner = () => {
  const { preferences } = useAuth();
  const { content: owner } = useSiteContent("owner");
  const ownerName = owner.name || OWNER.name;
  const nameParts = ownerName.toUpperCase().split(" ");
  const ownerSocialLinks = owner.socialLinks || SOCIAL_LINKS;
  const bannerSocialLinks = [
    { label: "Facebook", href: ownerSocialLinks.facebook, icon: <FaFacebookF /> },
    { label: "LinkedIn", href: ownerSocialLinks.linkedin, icon: <FiLinkedin /> },
    { label: "GitHub", href: ownerSocialLinks.github, icon: <FiGithub /> },
    { label: "Twitter", href: ownerSocialLinks.twitter, icon: <FaXTwitter /> },
  ].filter((item) => item.href);
  const hasCustomProfileImage = Boolean(preferences.profileImage);
  const profileImage = preferences.profileImage || profile;
  const mobileProfileClass = hasCustomProfileImage
    ? "h-full w-full object-cover"
    : "absolute inset-x-0 bottom-[-18px] mx-auto w-[78%] object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.75)]";
  const desktopProfileClass = hasCustomProfileImage
    ? "h-full w-full object-cover"
    : "absolute inset-x-0 bottom-[-18px] mx-auto w-[77%] object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.78)] lg:bottom-[-25px] lg:drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]";

  return (
    <section
      id="hero"
      className="cosmic-hero relative pb-8 left-1/2 min-h-screen w-screen -translate-x-1/2 overflow-hidden bg-[#05050a] px-4 text-white sm:px-5"
    >
      <div className="cosmic-starfield" aria-hidden="true" />
      <div className="cosmic-noise" aria-hidden="true" />
      <div className="cosmic-orb cosmic-orb-left" aria-hidden="true" />
      <div className="cosmic-orb cosmic-orb-right" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-center gap-8 py-24 sm:py-28 md:grid-cols-[0.94fr_1.06fr] md:gap-10 md:py-32 lg:grid-cols-[0.92fr_1.08fr] lg:py-0">
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.11, delayChildren: 0.12 },
            },
          }}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-[34rem] text-center md:mx-0 md:max-w-[27rem] md:text-left lg:max-w-[30rem]"
        >
          <motion.div
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 font-mono text-[0.7rem] text-zinc-200 shadow-[0_0_55px_rgba(255,255,255,0.08)] backdrop-blur-2xl"
          >
            <span className="text-base text-primary">&gt;</span>
            <span>$ whoami</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-[4.35rem] leading-[0.82] tracking-[-0.04em] text-zinc-50 sm:text-[5.8rem] md:text-[4.7rem] lg:text-8xl"
            style={{ textShadow: "0 0 75px rgba(255,255,255,0.12)" }}
          >
            <DecryptedText
              text={nameParts[0] || "SARAFAT"}
              animateOn="view"
              sequential
              revealDirection="start"
              speed={100}
              maxIterations={20}
              characters="SARAFATKARIM01<>/{}[]"
              className="text-zinc-50"
              encryptedClassName="text-primary/80"
            />
            <br />
            <DecryptedText
              text={nameParts.slice(1).join(" ") || "KARIM"}
              animateOn="view"
              sequential
              revealDirection="start"
              speed={100}
              maxIterations={20}
              characters="SARAFATKARIM01<>/{}[]"
              className="text-zinc-50"
              encryptedClassName="text-primary/80"
            />
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1.5 font-mono text-[0.72rem] font-semibold text-zinc-200 md:justify-start"
          >
            {roles.map((role, index) => (
              <span key={role} className="inline-flex items-center gap-2.5">
                {role}
                {index < roles.length - 1 && (
                  <span className="h-1 w-1 rounded-full bg-primary shadow-[0_0_16px_rgb(var(--color-primary-rgb)/0.9)]" />
                )}
              </span>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-[30rem] text-balance text-[0.88rem] leading-6 text-zinc-400 sm:mx-auto sm:text-[0.92rem] md:mx-0 md:max-w-[24rem] lg:mx-0 lg:max-w-[27rem] lg:text-[0.9rem]"
          >
            I craft intelligent, scalable web applications and explore the
            frontiers of AI/ML to turn complex ideas into impactful digital
            solutions.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-col justify-center gap-3 sm:flex-row md:justify-start lg:justify-start"
          >
            <a
              href="#projects"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/80 px-5 py-2.5 font-mono text-[0.72rem] font-bold text-white shadow-[0_0_55px_rgb(var(--color-primary-rgb)/0.32)] transition hover:-translate-y-0.5 hover:bg-primary hover:shadow-[0_0_75px_rgb(var(--color-primary-rgb)/0.45)] sm:w-auto"
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href={owner.resumeUrl || OWNER.resumeUrl}
              download
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-5 py-2.5 font-mono text-[0.72rem] font-bold text-zinc-300 backdrop-blur-xl transition hover:border-white/25 hover:text-white sm:w-auto"
            >
              Download Resume
              <Download className="h-4 w-4 text-zinc-500 transition group-hover:text-white" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
            className="mt-10 md:hidden"
          >
            <div className="relative mx-auto h-[17.5rem] w-[17.5rem] max-w-full overflow-hidden rounded-full border border-primary/20 bg-primary/10 shadow-[0_0_90px_rgb(var(--color-primary-rgb)/0.14)] sm:h-[21rem] sm:w-[21rem]">
              <img
                src={profileImage}
                alt={ownerName}
                className={mobileProfileClass}
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {bannerSocialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-primary/20 bg-black/30 text-base text-zinc-200 shadow-[0_0_28px_rgb(var(--color-primary-rgb)/0.16)] backdrop-blur-xl transition hover:border-primary/60 hover:bg-primary/10 hover:text-white"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, x: 26 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative mx-auto hidden w-full max-w-[420px] items-center justify-center md:flex lg:max-w-[560px]"
        >
          <CircularTalk />
          <div className="relative z-20 h-[320px] w-[320px] overflow-hidden rounded-full border border-primary/20 bg-primary/10 shadow-[0_0_90px_rgb(var(--color-primary-rgb)/0.14)] lg:h-[420px] lg:w-[420px] lg:shadow-[0_0_110px_rgb(var(--color-primary-rgb)/0.14)]">
            <img
              src={profileImage}
              alt={ownerName}
              className={desktopProfileClass}
            />
          </div>

          <div className="absolute right-0 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-3 md:right-[-0.5rem] lg:right-2 lg:gap-3.5">
            <span className="hero-social-arc hero-social-arc-top" />
            {bannerSocialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="grid h-8 w-8 place-items-center rounded-full border border-primary/20 bg-black/30 text-sm text-zinc-200 shadow-[0_0_24px_rgb(var(--color-primary-rgb)/0.16)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/10 hover:text-white lg:h-9 lg:w-9 lg:text-base lg:shadow-[0_0_28px_rgb(var(--color-primary-rgb)/0.16)]"
              >
                {item.icon}
              </a>
            ))}
            {/* <span className="hero-social-arc hero-social-arc-bottom" /> */}
          </div>
        </motion.div>
      </div>

      <div
        className="cosmic-planet left-1/2 bottom-0 w-1/2 md:w-[1/3] lg:w-[1/2] h-[8%] md:h-[12%] lg:h-[14%]"
        aria-hidden="true"
      ></div>
    </section>
  );
};

export default Banner;
