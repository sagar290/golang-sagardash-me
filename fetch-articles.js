import { XMLParser } from 'fast-xml-parser';
import content from './src/data/content.json';

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
  const mediumRssUrl = 'https://medium.com/feed/@sagar-dash290';
  
  try {
    const response = await fetch(mediumRssUrl, {
      signal: AbortSignal.timeout(3000),
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
          // Take first 150 characters
          description = description.substring(0, 150) + '...';
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
      // Take top 4
      .slice(0, 4);
    
    return articles.length > 0 ? articles : getFallbackArticles();
  } catch {
    console.warn('Medium RSS unavailable; using fallback articles.');
    return getFallbackArticles();
  }
}
