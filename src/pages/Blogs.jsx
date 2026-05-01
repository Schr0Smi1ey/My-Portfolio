import { Helmet } from "react-helmet";
import { motion, useReducedMotion } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";

import { PageWrapper, Spinner, EmptyState } from "../components/ui";
import BlogCard from "../components/BlogCard";
import AnimatedNumber from "../components/ui/AnimatedNumber";
import { useBlogs } from "../hooks/useBlogs";
import { MEDIUM_RSS_URL } from "../constants";

const Blogs = () => {
  const shouldReduceMotion = useReducedMotion();
  const { data: posts = [], isLoading, isError } = useBlogs(MEDIUM_RSS_URL);

  return (
    <PageWrapper className="!px-0 !pt-0 !pb-0">
      <Helmet>
        <title>Blogs — Sarafat Karim</title>
        <meta
          name="description"
          content="Technical articles, tutorials, and engineering notes."
        />
      </Helmet>

      <section className="about-cosmic-section relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#05050a] px-4 !mt-0 !pt-28 !pb-20 text-zinc-950 dark:text-white md:px-8 md:!pt-32 md:!pb-24">
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
              : { y: [0, 18, 0], x: [0, -8, 0], scale: [1, 1.05, 1] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="relative z-10 mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-14 max-w-2xl">
            <div className="mb-6 flex items-center gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <FiBookOpen className="h-4 w-4" />
              </span>
              <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.28em] text-zinc-500">
                Writing / Medium Archive
              </p>
            </div>

            <h1 className="font-display text-5xl font-black leading-[0.9] tracking-tight text-zinc-950 dark:text-white sm:text-6xl lg:text-7xl">
              Technical{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                Writing
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-[0.88rem] leading-7 text-zinc-600 dark:text-zinc-500">
              Engineering notes, deep dives, and tutorials from continuous
              learning. Original content hosted on Medium.
            </p>

            {!isLoading && posts.length > 0 && (
              <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-700">
                <AnimatedNumber value={posts.length} /> article
                {posts.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="py-24">
              <Spinner />
            </div>
          ) : isError || posts.length === 0 ? (
            <div className="rounded-2xl border border-zinc-300/70 bg-white/60 dark:border-white/[0.06] dark:bg-white/[0.03]">
              <EmptyState message="No blog posts found. Check back soon." />
            </div>
          ) : (
            <div className="grid gap-4">
              {posts.map((post, index) => (
                <BlogCard
                  key={post.guid || post.link}
                  post={post}
                  index={index}
                />
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </PageWrapper>
  );
};

export default Blogs;
