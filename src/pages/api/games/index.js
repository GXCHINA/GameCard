import dbConnect from '../../../lib/dbConnect';
import Game from '../../../models/Game';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const games = await Game.find({})
          .sort({ createdAt: -1 })
          .limit(20);
        res.status(200).json({ success: true, data: games });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
      
    case 'POST':
      try {
        const game = await Game.create(req.body);
        res.status(201).json({ success: true, data: game });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
      
    default:
      res.status(400).json({ success: false, error: '不支持该请求方法' });
      break;
  }
} 