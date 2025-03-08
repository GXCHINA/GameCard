import axios from 'axios';
import cheerio from 'cheerio';

export async function fetchFeaturedGames(count = 10) {
  try {
    const response = await axios.get('https://scratch.mit.edu/explore/projects/games/');
    const $ = cheerio.load(response.data);
    
    const games = [];
    
    $('.project').slice(0, count).each((i, el) => {
      const title = $(el).find('.title a').text().trim();
      const scratchId = $(el).find('.title a').attr('href').split('/')[2];
      const thumbnailUrl = $(el).find('.image img').attr('src');
      const author = $(el).find('.owner a').text().trim();
      
      games.push({
        title,
        scratchId,
        thumbnailUrl,
        author,
        description: `${title} - 一个由${author}创建的精彩Scratch游戏。立即体验这款有趣的游戏！`,
        category: '其他', // 默认分类
      });
    });
    
    return games;
  } catch (error) {
    console.error('爬取Scratch游戏失败:', error);
    return [];
  }
}

export async function getGameDetailById(id) {
  try {
    const response = await axios.get(`https://scratch.mit.edu/projects/${id}`);
    const $ = cheerio.load(response.data);
    
    const title = $('.project-title').text().trim();
    const description = $('.project-description').text().trim() || '这是一个有趣的Scratch游戏。';
    const author = $('.username').text().trim();
    const thumbnailUrl = $('.project-image img').attr('src');
    
    return {
      title,
      description,
      author,
      thumbnailUrl
    };
  } catch (error) {
    console.error(`获取游戏 ${id} 详情失败:`, error);
    return null;
  }
} 