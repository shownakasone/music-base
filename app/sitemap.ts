import type { MetadataRoute } from 'next';
import { TOOLS } from '@/lib/tools-data';

// デプロイ後、実際のドメインに書き換えてください
const BASE_URL = 'https://example-music-base.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/tools', '/ai'].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));
  const toolPages = TOOLS.map((t) => ({
    url: `${BASE_URL}/tools/${t.slug}`,
    lastModified: new Date(),
  }));
  return [...staticPages, ...toolPages];
}
