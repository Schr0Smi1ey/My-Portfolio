import { Helmet } from "react-helmet";
import { PageWrapper, SectionHeader, Spinner, EmptyState } from "../components/ui";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { MEDIUM_RSS_URL } from "../constants";

const BlogsPage = () => {
  const { data: posts = [], isLoading, isError } = useBlogs(MEDIUM_RSS_URL);

  return (
    <PageWrapper>
      <Helmet>
        <title>Blogs — Sarafat Karim</title>
      </Helmet>

      <div className="container mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="Writing"
          title="Blogs"
          subtitle="Thoughts, tutorials, and insights from my continuous learning and development journey."
        />

        {isLoading ? (
          <Spinner />
        ) : isError || posts.length === 0 ? (
          <EmptyState message="No blog posts found. Check back soon." />
        ) : (
          <div className="space-y-5">
            {posts.map((post, index) => (
              <BlogCard key={post.link} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default BlogsPage;
