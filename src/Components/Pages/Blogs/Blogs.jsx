import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";
import { PuffLoader } from "react-spinners";

const MEDIUM_USERNAME = import.meta.env.VITE_MEDIUM_USERNAME;
console.log(MEDIUM_USERNAME);
const extractImage = (html) => {
  const match = html?.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};


const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 500 });

    fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  console.log(posts);
  return (
    <div className="min-h-screen py-12 px-6 md:px-8 lg:px-12 background overflow-hidden dark:bg-black dark:bg-none dark:text-white">
      <div className="shadow-lg flex flex-col items-center justify-center text-gray-900 dark:text-white">
        <Helmet>
          <title>Schr0Smi1ey | Blogs</title>
        </Helmet>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 70 }}
          transition={{ duration: 0.8 }}
          className="text-center container pt-3 pb-5 mx-auto w-full"
        >
          <h1 className="text-3xl font-bold mb-2" data-aos="fade-up">
  Blogs
</h1>

<p
  className="text-gray-500 dark:text-gray-400 text-base mb-8"
  data-aos="fade-up"
>
  Thoughts, tutorials, and insights from my continous learning and developing journey
</p>


          {/* Loader */}
          {loading && (
            <div className="container mx-auto p-4">
              <div className="flex items-center justify-center min-h-screen">
                <PuffLoader color="#198068" size={40} />
              </div>
            </div>
          )}

          {/* No Posts */}
          {!loading && posts.length === 0 && (
            <p className="text-gray-400" data-aos="fade-up">
              No blog posts found.
            </p>
          )}

          {/* Blog Cards */}
          {!loading && posts.length > 0 && (
            <div className="flex flex-col items-center gap-8 text-left">
              {posts.map((post, index) => (
                <motion.a
                  key={index}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 dark:bg-white/5 rounded-xl p-4 w-full max-w-4xl hover:scale-[1.02] transition shadow-lg"
                  data-aos="fade-up"
                  whileHover={{ scale: 1.03 }}
                >
                  <img
                    src={
                      extractImage(post.content) ||
                      post.thumbnail ||
                      post.enclosure?.link ||
                      "/default-blog.png"
                    }
                    alt={post.title}
                    className="w-full mx-auto h-64 object-cover rounded-lg mb-4"
                  />


                  <h2 className="text-xl font-semibold mb-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-400 text-sm">
                    {new Date(post.pubDate).toDateString()}
                  </p>

                  {/* Categories */}
                  {post.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.categories.map((cat, i) => (
                        <span
                          key={i}
                          className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.a>
              ))}
            </div>
          )}

          {/* Back Button */}
          <div className="mt-16 mb-16">
            <Link
              to="/"
              className="inline-block bg-primary text-white px-5 py-2 rounded-md text-lg font-medium hover:bg-primary/90 transition"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blogs;
