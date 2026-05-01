import { Helmet } from "react-helmet";
import { OWNER, SOCIAL_LINKS } from "../constants/index";
import { useSiteContent } from "../hooks";

const DEFAULT_IMAGE = "/og-image.png";

const SEO = ({
  title,
  description,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
}) => {
  const { content: owner } = useSiteContent("owner");
  const ownerName = owner.name || OWNER.name;
  const ownerTitle = owner.title || OWNER.title;
  const socialLinks = owner.socialLinks || SOCIAL_LINKS;
  const metaDescription =
    description ||
    `${ownerName} — ${ownerTitle}. Building responsive, full-stack web applications with the MERN stack.`;
  const fullTitle = title
    ? `${title} — ${ownerName}`
    : `${ownerName} — ${ownerTitle}`;
  const canonical = url
    ? `https://schr0smi1ey.web.app${url}`
    : "https://schr0smi1ey.web.app";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="author" content={ownerName} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={ownerName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content={socialLinks.twitter || "@sarafat_karim"} />

      <meta name="robots" content="index, follow" />
      <meta
        name="keywords"
        content={`${ownerName}, full-stack developer, MERN stack, React developer, Bangladesh, portfolio, web development`}
      />
      <meta name="theme-color" content="#198068" />
    </Helmet>
  );
};

export default SEO;
