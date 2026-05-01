import { useQuery } from "@tanstack/react-query";
import { publicApi } from "../api";
import { siteContentDefaults } from "../data/siteDefaults";

export const getDefaultSiteContent = (key) => siteContentDefaults[key] || {};

export const fetchSiteContent = async (key) => {
  const res = await publicApi.get(`/content/${key}`);
  return {
    ...getDefaultSiteContent(key),
    ...(res.data?.value || {}),
  };
};

export const useSiteContent = (key) => {
  const fallback = getDefaultSiteContent(key);

  const query = useQuery({
    queryKey: ["site-content", key],
    queryFn: () => fetchSiteContent(key),
    enabled: Boolean(key),
    staleTime: 1000 * 60 * 10,
    retry: false,
  });

  return {
    ...query,
    content: query.data || fallback,
    fallback,
  };
};
