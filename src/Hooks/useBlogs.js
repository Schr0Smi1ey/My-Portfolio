import { useQuery } from "@tanstack/react-query";

const createSlug = (title = "", guid = "") => {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const suffix = guid
    ? btoa(guid)
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(-6)
        .toLowerCase()
    : "";

  return suffix ? `${base}-${suffix}` : base;
};

const calcReadingTime = (html = "") => {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = text.split(" ").filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const extractExcerpt = (html = "", maxLen = 160) => {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLen ? text.slice(0, maxLen).trimEnd() + "…" : text;
};

export const extractHeadings = (html = "") => {
  const matches = [
    ...html.matchAll(/<h([2-4])[^>]*?(?:id="([^"]*)")?[^>]*>(.*?)<\/h\1>/gi),
  ];
  return matches.map((m) => ({
    level: parseInt(m[1], 10),
    id: m[2] || slugifyHeading(m[3]),
    text: m[3].replace(/<[^>]*>/g, ""),
  }));
};

const slugifyHeading = (text = "") =>
  text
    .replace(/<[^>]*>/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const injectHeadingIds = (html = "") =>
  html.replace(/<h([2-4])([^>]*)>(.*?)<\/h\1>/gi, (_m, level, attrs, inner) => {
    if (/id=/.test(attrs)) return _m;
    const id = slugifyHeading(inner);
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });

export const normalizeLists = (html = "") => {
  let content = html;

  content = content.replace(
    /<p>\s*[•·]\s*([\s\S]*?)<\/p>/g,
    "<ul><li>$1</li></ul>",
  );

  content = content.replace(
    /<p>\s*\d+[.)]\s+([\s\S]*?)<\/p>/g,
    "<ol><li>$1</li></ol>",
  );

  content = content.replace(/<\/ul>\s*<ul>/g, "");
  content = content.replace(/<\/ol>\s*<ol>/g, "");

  return content;
};

export const removeFirstImage = (html = "") => {
  let cleaned = html.replace(/<figure[\s\S]*?<\/figure>/i, "");
  cleaned = cleaned.replace(/<img[^>]*>/i, "");
  return cleaned;
};

export const extractImage = (html = "") => {
  const m = html?.match(/<img[^>]+src="([^">]+)"/);
  return m ? m[1] : null;
};

export const useBlogs = (rssUrl) =>
  useQuery({
    queryKey: ["blogs", rssUrl],
    queryFn: async () => {
      const res = await fetch(rssUrl);
      if (!res.ok) throw new Error("Failed to load blogs");
      const data = await res.json();

      return (data.items ?? []).map((post) => {
        const rawContent = post.content || post.description || "";
        const readingTime = calcReadingTime(rawContent);
        const excerpt = extractExcerpt(rawContent);
        const coverImage =
          extractImage(rawContent) ||
          post.thumbnail ||
          post.enclosure?.link ||
          null;

        return {
          ...post,
          slug: createSlug(post.title, post.guid || post.link),
          content: rawContent,
          readingTime,
          excerpt,
          coverImage,
        };
      });
    },
    staleTime: 1000 * 60 * 10,
  });
