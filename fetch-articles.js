import { XMLParser } from 'fast-xml-parser';
import content from './src/data/content.json';

const MEDIUM_FETCH_TIMEOUT_MS = 3000;
const DESCRIPTION_LENGTH = 150;
const ARTICLE_LIMIT = content.articles.length;

const getMediumRssUrl = () => {
  const blogUrl = new URL(content.socials.blog);
  const username = blogUrl.pathname.split('/').find((part) => part.startsWith('@'));

  if (username) {
    return new URL(`/feed/${username}`, blogUrl.origin).toString();
  }

  return new URL('/feed', blogUrl.origin).toString();
};

const getFallbackArticles = () => content.articles.map((article) => ({
  title: article.title,
  url: new URL(article.url, content.site_url).toString(),
  description: article.description || '',
  pubDate: new Date().toISOString(),
}));

/**
 * Fetch articles from Medium RSS feed
 * This runs at build time to fetch and process articles
 */
export async function getMediumArticles() {
  const mediumRssUrl = getMediumRssUrl();
  
  try {
    const response = await fetch(mediumRssUrl, {
      signal: AbortSignal.timeout(MEDIUM_FETCH_TIMEOUT_MS),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS: ${response.statusText}`);
    }
    
    const xmlData = await response.text();
    
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });
    
    const parsedData = parser.parse(xmlData);
    const items = parsedData.rss?.channel?.item || [];
    
    // Process and sort articles
    const articles = items
      .map((item) => {
        // Extract description (first paragraph)
        let description = '';
        if (item.description) {
          // Remove HTML tags
          description = item.description
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .trim();
          description = description.substring(0, DESCRIPTION_LENGTH) + '...';
        }
        
        return {
          title: item.title || '',
          url: item.link || '',
          description: description,
          pubDate: item.pubDate || '',
        };
      })
      // Sort by publication date (newest first)
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
      .slice(0, ARTICLE_LIMIT);
    
    return articles.length > 0 ? articles : getFallbackArticles();
  } catch {
    console.warn('Medium RSS unavailable; using fallback articles.');
    return getFallbackArticles();
  }
}
