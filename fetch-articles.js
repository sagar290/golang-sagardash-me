import { XMLParser } from 'fast-xml-parser';

/**
 * Fetch articles from Medium RSS feed
 * This runs at build time to fetch and process articles
 */
export async function getMediumArticles() {
  const mediumRssUrl = 'https://medium.com/feed/@sagar-dash290';
  
  try {
    const response = await fetch(mediumRssUrl);
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
        // Extract the unique ID from the Medium URL
        const urlMatch = item.link?.match(/\/([^\/]+)-([a-f0-9]+)$/);
        const slug = urlMatch ? urlMatch[1] : '';
        
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
    
    return articles;
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    // Return fallback articles if fetch fails
    return [
      {
        title: 'Make Your Own API Gateway with NGINX',
        url: 'https://sagardash.me/articles/nginx-api-gateway',
        description: 'Learn how to build a custom API gateway using NGINX',
        pubDate: new Date().toISOString(),
      },
      {
        title: 'Database: Human readable values vs. numeric Values',
        url: 'https://sagardash.me/articles/database-values',
        description: 'Choosing between human-readable and numeric values in databases',
        pubDate: new Date().toISOString(),
      },
      {
        title: 'Creating Sequential and Padded Invoice IDs with SQL',
        url: 'https://sagardash.me/articles/sql-invoice-ids',
        description: 'Generate sequential invoice IDs with padding using SQL',
        pubDate: new Date().toISOString(),
      },
      {
        title: 'Check out my Medium profile for more articles',
        url: 'https://medium.com/@sagar-dash290',
        description: 'Read more technical articles on Medium',
        pubDate: new Date().toISOString(),
      },
    ];
  }
}