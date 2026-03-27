import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

const extractImage = (html) => {
  const match = html?.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

const BlogCard = ({ post, index = 0 }) => {
  const image = extractImage(post.content) || post.thumbnail || post.enclosure?.link;

  return (
    <motion.a
      href={post.link}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      className="group grid grid-cols-1 md:grid-cols-[260px_1fr] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/8 rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
    >
      {/* Thumbnail */}
      {image && (
        <div className="relative overflow-hidden aspect-[16/9] md:aspect-auto bg-gray-50 dark:bg-zinc-800">
          <img
            src={image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs text-gray-400 font-medium">{formatDate(post.pubDate)}</p>
          <h2 className="text-base font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>
        </div>

        <div className="flex items-center justify-between">
          {post.categories?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.categories.slice(0, 3).map((cat, i) => (
                <span
                  key={i}
                  className="text-xs bg-primary/8 text-primary border border-primary/15 px-2 py-0.5 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
          <FiExternalLink className="text-gray-300 group-hover:text-primary transition-colors w-4 h-4 shrink-0 ml-auto" />
        </div>
      </div>
    </motion.a>
  );
};

export default BlogCard;
