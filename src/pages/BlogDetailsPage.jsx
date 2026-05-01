import { useMemo, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import DOMPurify from "dompurify";
import {
  FiArrowLeft,
  FiExternalLink,
  FiClock,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import {
  useBlogs,
  normalizeLists,
  removeFirstImage,
  injectHeadingIds,
} from "../hooks/useBlogs";
import { MEDIUM_RSS_URL } from "../constants";
import { PageWrapper, Spinner, EmptyState } from "../components/ui";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const ReadingProgress = () => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? Math.min(100, (el.scrollTop / total) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{ width: `${pct}%` }}
      className="fixed top-0 left-0 z-[9999] h-[2px] bg-gradient-to-r from-primary to-primary/40 shadow-[0_0_12px_rgb(var(--color-primary-rgb)/0.9)] transition-[width] duration-100 ease-linear pointer-events-none"
    />
  );
};

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const shouldReduceMotion = useReducedMotion();

  const { data: posts = [], isLoading, isError } = useBlogs(MEDIUM_RSS_URL);

  const postIndex = posts.findIndex((p) => p.slug === slug);
  const post = posts[postIndex] ?? null;
  const prevPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const nextPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  const cleanHtml = useMemo(() => {
    if (!post?.content) return "";
    const processed = injectHeadingIds(
      normalizeLists(removeFirstImage(post.content)),
    );
    return DOMPurify.sanitize(processed, {
      ADD_ATTR: ["id", "data-lang"],
      ALLOW_DATA_ATTR: true,
    });
  }, [post?.content]);

  if (isLoading) {
    return (
      <PageWrapper>
        <section className="bg-white py-32 dark:bg-[#05050a]">
          <Spinner />
        </section>
      </PageWrapper>
    );
  }

  if (isError || !post) {
    return (
      <PageWrapper className="!px-0 !pt-0 !pb-0">
        <section className="bg-white py-32 dark:bg-[#05050a]">
          <EmptyState message="Blog post not found." />
        </section>
      </PageWrapper>
    );
  }

  const cover = post.coverImage;

  return (
    <PageWrapper className="!px-0 !pt-32 !pb-0">
      <ReadingProgress />

      <Helmet>
        <title>{post.title} — Sarafat Karim</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {cover && <meta property="og:image" content={cover} />}
        <meta property="article:published_time" content={post.pubDate} />
        {post.categories?.map((c, i) => (
          <meta key={i} property="article:tag" content={c} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        {cover && <meta name="twitter:image" content={cover} />}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: cover,
            datePublished: post.pubDate,
            author: { "@type": "Person", name: "Sarafat Karim" },
          })}
        </script>
      </Helmet>

      <section className="about-cosmic-section relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#05050a] px-4 pt-20 pb-20 text-zinc-950 dark:text-white md:px-8 md:pt-24 md:pb-24">
        <div className="about-cosmic-starfield" aria-hidden="true" />
        <div className="cosmic-noise" aria-hidden="true" />

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

        <motion.article
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto max-w-5xl"
        >
          <div className="mb-10">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.16em] text-primary transition-colors hover:border-primary/50"
            >
              <FiArrowLeft className="h-3.5 w-3.5" />
              All Articles
            </Link>
          </div>

          <header className="mb-12">
            <div className="mb-5 flex flex-wrap items-center gap-4">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_rgb(var(--color-primary-rgb)/0.8)]"
              />
              <time
                dateTime={post.pubDate}
                className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.22em] text-zinc-500"
              >
                {formatDate(post.pubDate)}
              </time>

              {post.readingTime && (
                <>
                  <span className="text-zinc-400 dark:text-zinc-700">·</span>
                  <span className="flex items-center gap-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-600">
                    <FiClock className="h-3 w-3" />
                    {post.readingTime} min read
                  </span>
                </>
              )}
            </div>

            <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight text-zinc-950 dark:text-white sm:text-5xl lg:text-[3.25rem]">
              {post.title}
            </h1>

            {post.categories?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.categories.map((cat, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[0.52rem] font-bold uppercase tracking-[0.14em] text-primary"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </header>

          {cover && (
            <div className="mb-12 overflow-hidden rounded-3xl border border-zinc-300/70 bg-white/70 p-1.5 shadow-[0_0_50px_rgb(var(--color-primary-rgb)/0.07)] dark:border-white/[0.07] dark:bg-white/[0.03]">
              <img
                src={cover}
                alt={post.title}
                className="max-h-[28rem] w-full rounded-2xl object-cover opacity-90"
              />
            </div>
          )}

          <div
            className="
              rounded-3xl border border-zinc-300/70 bg-white/75
              dark:border-white/[0.07] dark:bg-white/[0.03]
              px-5 py-8 md:px-10 md:py-12
              prose prose-zinc prose-lg max-w-none dark:prose-invert
            "
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />

          <div className="mt-10 border-t border-zinc-300/70 pt-8 dark:border-white/[0.07]">
            <a
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2.5 font-mono text-[0.58rem] font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:border-primary/55"
            >
              View on Medium
              <FiExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {(prevPost || nextPost) && (
            <nav
              aria-label="Article navigation"
              className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {prevPost ? (
                <Link
                  to={`/blogs/${prevPost.slug}`}
                  className="group flex flex-col gap-2 rounded-2xl border border-zinc-300/70 bg-white/65 p-5 transition hover:border-primary/25 hover:bg-white/85 dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
                >
                  <span className="flex items-center gap-1.5 font-mono text-[0.56rem] font-bold uppercase tracking-[0.18em] text-zinc-600 transition-colors group-hover:text-primary">
                    <FiChevronLeft className="h-3 w-3" />
                    Previous
                  </span>
                  <p className="line-clamp-2 text-sm font-bold leading-snug text-zinc-700 transition-colors group-hover:text-zinc-950 dark:text-zinc-300 dark:group-hover:text-white">
                    {prevPost.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}

              {nextPost ? (
                <Link
                  to={`/blogs/${nextPost.slug}`}
                  className="group flex flex-col items-end gap-2 rounded-2xl border border-zinc-300/70 bg-white/65 p-5 text-right transition hover:border-primary/25 hover:bg-white/85 dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
                >
                  <span className="flex items-center gap-1.5 font-mono text-[0.56rem] font-bold uppercase tracking-[0.18em] text-zinc-600 transition-colors group-hover:text-primary">
                    Next
                    <FiChevronRight className="h-3 w-3" />
                  </span>
                  <p className="line-clamp-2 text-sm font-bold leading-snug text-zinc-700 transition-colors group-hover:text-zinc-950 dark:text-zinc-300 dark:group-hover:text-white">
                    {nextPost.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          )}
        </motion.article>
      </section>
    </PageWrapper>
  );
};

export default BlogDetailsPage;
