import { Helmet } from "react-helmet";
import { OWNER, SOCIAL_LINKS } from "../constants/index";

const DEFAULT_IMAGE = "/og-image.png"; // place a 1200×630 image in /public

const SEO = ({
  title,
  description = `${OWNER.name} — ${OWNER.title}. Building responsive, full-stack web applications with the MERN stack.`,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
}) => {
  const fullTitle = title
    ? `${title} — ${OWNER.name}`
    : `${OWNER.name} — ${OWNER.title}`;
  const canonical = url
    ? `https://schr0smi1ey.web.app${url}`
    : "https://schr0smi1ey.web.app";

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={OWNER.name} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={OWNER.name} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@sarafat_karim" />

      {/* Extra */}
      <meta name="robots" content="index, follow" />
      <meta
        name="keywords"
        content={`${OWNER.name}, full-stack developer, MERN stack, React developer, Bangladesh, portfolio, web development`}
      />
      <meta name="theme-color" content="#198068" />
    </Helmet>
  );
};

export default SEO;
