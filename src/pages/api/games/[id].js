import dbConnect from '../../../lib/dbConnect';
import Game from '../../../models/Game';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const game = await Game.findById(id);
        if (!game) {
          return res.status(404).json({ success: false, error: '游戏未找到' });
        }
        
        // 更新游戏浏览量
        game.views += 1;
        await game.save();
        
        res.status(200).json({ success: true, data: game });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
      
    default:
      res.status(400).json({ success: false, error: '不支持该请求方法' });
      break;
  }
} 