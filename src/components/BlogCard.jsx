import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiClock } from "react-icons/fi";

const MotionLink = motion(Link);

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const BlogCard = ({ post, index = 0 }) => {
  const image = post.coverImage;

  return (
    <MotionLink
      to={`/blogs/${post.slug}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -2 }}
      transition={{
        duration: 0.4,
        delay: index * 0.055,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group relative overflow-hidden rounded-2xl
        border border-zinc-300/70 dark:border-white/[0.06]
        bg-white/60 dark:bg-white/[0.03]
        transition-all duration-300
        hover:border-primary/30
        hover:bg-white/80 dark:hover:bg-white/[0.05]
        hover:shadow-[0_0_40px_rgb(var(--color-primary-rgb)/0.07)]
        md:grid md:grid-cols-[15rem_minmax(0,1fr)]
      "
    >
      {image ? (
        <div className="relative overflow-hidden bg-zinc-200/70 dark:bg-zinc-900/60">
          <img
            src={image}
            alt={post.title}
            loading="lazy"
            className="h-full min-h-[12rem] w-full object-cover"
          />
        </div>
      ) : (
        <div className="relative hidden min-h-[12rem] items-center justify-center overflow-hidden bg-zinc-100/70 dark:bg-white/[0.02] md:flex">
          <span className="select-none font-mono text-[3rem] font-black leading-none text-zinc-950/[0.05] dark:text-white/[0.04]">
            {post.title?.charAt(0)?.toUpperCase()}
          </span>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent" />
        </div>
      )}

      <div className="relative flex flex-col justify-between gap-6 p-5 md:p-6">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_rgb(var(--color-primary-rgb)/0.9)]"
            />
            <time
              dateTime={post.pubDate}
              className="font-mono text-[0.56rem] font-bold uppercase tracking-[0.2em] text-zinc-500"
            >
              {formatDate(post.pubDate)}
            </time>

            {post.readingTime && (
              <>
                <span className="text-zinc-400 dark:text-zinc-700">·</span>
                <span className="flex items-center gap-1 font-mono text-[0.56rem] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-600">
                  <FiClock className="h-2.5 w-2.5" />
                  {post.readingTime} min read
                </span>
              </>
            )}
          </div>

          <h2 className="text-xl font-black leading-snug tracking-tight text-zinc-950 transition-colors duration-200 group-hover:text-primary dark:text-white md:text-2xl">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="mt-3 line-clamp-2 text-[0.82rem] leading-relaxed text-zinc-600 dark:text-zinc-500">
              {post.excerpt}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {post.categories?.slice(0, 3).map((cat, i) => (
              <span
                key={i}
                className="rounded-full border border-primary/20 bg-primary/[0.08] px-2.5 py-0.5 font-mono text-[0.5rem] font-bold uppercase tracking-[0.14em] text-primary/80"
              >
                {cat}
              </span>
            ))}
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/[0.08] px-3.5 py-1.5 font-mono text-[0.55rem] font-bold uppercase tracking-[0.14em] text-primary transition-all duration-200 group-hover:border-primary/55 group-hover:bg-primary/[0.14]">
            Read
            <FiArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </MotionLink>
  );
};

export default BlogCard;
