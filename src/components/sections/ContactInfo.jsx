import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiCheck, FiCopy, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useSiteContent } from "../../hooks";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const copyToClipboard = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const el = document.createElement("textarea");
    el.value = value;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
};

const ContactCard = ({ icon: Icon, label, value, action, copyValue }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(copyValue || value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <motion.button
      type="button"
      variants={fadeUp}
      onClick={handleCopy}
      className="group relative min-h-[13.5rem] overflow-hidden rounded-2xl border border-zinc-300/70 bg-white/60 p-5 text-left backdrop-blur-xl transition hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/5 dark:border-white/10 dark:bg-white/[0.035]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6 grid h-11 w-11 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary shadow-[0_0_30px_rgb(var(--color-primary-rgb)/0.16)]">
          <Icon className="h-5 w-5" />
        </div>

        <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.24em] text-primary">
          {label}
        </p>

        <h3 className="mt-3 break-all text-[0.8rem] font-black leading-6 text-zinc-950 dark:text-white">
          {value}
        </h3>

        <div className="mt-auto flex items-center justify-between border-t border-zinc-300/70 pt-4 dark:border-white/10">
          <span className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            {copied ? "Copied" : action}
          </span>

          <span className="grid h-9 w-9 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
            {copied ? (
              <FiCheck className="h-4 w-4" />
            ) : (
              <FiCopy className="h-4 w-4" />
            )}
          </span>
        </div>
      </div>
    </motion.button>
  );
};

const ContactSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const { content: owner } = useSiteContent("owner");
  const phoneCopy = String(owner.phone || "").replace(/[^\d+]/g, "");

  return (
    <section
      id="contact"
      className="about-cosmic-section relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#05050a] px-4 !py-24 text-zinc-950 dark:text-white md:px-8"
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

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.76fr_auto_1.24fr] lg:items-stretch">
          <motion.div
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08 },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col justify-center lg:min-h-[29rem]"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 flex items-center gap-4"
            >
              <span className="h-4 w-4 rounded-full bg-primary shadow-[0_0_20px_rgb(var(--color-primary-rgb)/0.7)]" />
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.3em] text-zinc-600 dark:text-zinc-400">
                Contact Channel
              </p>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl leading-[0.82] tracking-tight text-zinc-950 dark:text-white sm:text-5xl lg:text-6xl"
            >
              Let’s Build <br />
              <span className="text-primary">Something Great</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-md text-base leading-8 text-zinc-600 dark:text-zinc-400"
            >
              Have a project in mind or just want to say hi? Copy a contact
              channel and reach me directly.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-5 space-y-4">
              {[
                "Collaborations",
                "Product Ideas",
                "Internship Discussions",
                "Full-stack Project Work",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full border border-primary/40 text-primary">
                    ✓
                  </span>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-center justify-center lg:min-h-[29rem]"
          >
            <div className="flex w-full items-center gap-4 lg:h-full lg:w-auto lg:flex-col">
              <span className="h-px flex-1 bg-primary/70 lg:h-full lg:w-px" />
              <div className="inline-flex shrink-0 items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-5 py-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-primary shadow-[0_0_28px_rgb(var(--color-primary-rgb)/0.12)]">
                <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_rgb(var(--color-primary-rgb)/0.8)]" />
                Open to offers
              </div>
              <span className="h-px flex-1 bg-primary/70 lg:h-full lg:w-px" />
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.1 },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-4 lg:min-h-[29rem]"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <ContactCard
                icon={FiMail}
                label="Email"
                value={owner.email || "Sarafatkarim555@gmail.com"}
                action="Copy Email"
              />

              <ContactCard
                icon={FiPhone}
                label="Phone"
                value={owner.phone || "+880 1719-430433"}
                action="Copy Number"
                copyValue={phoneCopy || "+8801719430433"}
              />

              <ContactCard
                icon={FaWhatsapp}
                label="WhatsApp"
                value={owner.phone || "+880 1719-430433"}
                action="Copy Link"
                copyValue={owner.whatsapp || "https://wa.me/8801719430433"}
              />

              <ContactCard
                icon={FiMapPin}
                label="Location"
                value={owner.location || "Dhaka, Bangladesh"}
                action="Copy Location"
                copyValue={owner.location || "Dhaka, Bangladesh"}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
