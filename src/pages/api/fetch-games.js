import dbConnect from '../../lib/dbConnect';
import Game from '../../models/Game';
import { fetchFeaturedGames } from '../../utils/scratchCrawler';
import { packageGame } from '../../utils/gamePackager';

// 这个API端点用于手动触发游戏爬取和打包流程
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: '只允许POST请求' });
  }

  try {
    await dbConnect();
    
    // 爬取最新的游戏
    const games = await fetchFeaturedGames(10);
    
    const results = [];
    
    // 处理每一个游戏
    for (const gameData of games) {
      // 检查游戏是否已存在
      let existingGame = await Game.findOne({ scratchId: gameData.scratchId });
      
      if (!existingGame) {
        // 如果游戏不存在，创建新游戏
        
        // 打包游戏
        const packageResult = await packageGame(gameData.scratchId);
        
        if (packageResult.success) {
          gameData.htmlUrl = packageResult.htmlUrl;
        }
        
        // 保存到数据库
        const newGame = await Game.create(gameData);
        results.push({ status: 'created', game: newGame });
      } else {
        results.push({ status: 'existing', game: existingGame });
      }
    }
    
    res.status(200).json({ success: true, results });
  } catch (error) {
    console.error('爬取游戏失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
} 