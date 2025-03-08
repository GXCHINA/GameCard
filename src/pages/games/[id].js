import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import GameGrid from '../../components/GameGrid';
import Image from 'next/image';
import { games } from '../../data/games';

export default function GameDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const [game, setGame] = useState(null);
  const [relatedGames, setRelatedGames] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!id) return;

    // 根据ID查找游戏
    const foundGame = games.find(g => g._id === id);
    
    if (foundGame) {
      setGame(foundGame);
      
      // 获取相同类别的游戏作为相关游戏
      const sameCategory = games
        .filter(g => g.category === foundGame.category && g._id !== id)
        .slice(0, 4);
      setRelatedGames(sameCategory);
    } else {
      // 如果找不到游戏，重定向到首页
      router.push('/');
    }
  }, [id, router]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // 这是客户端状态，不需要API调用
  };

  if (!game) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen pt-16">
          <div className="loading-spinner"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${game.title} - 趣玩游戏站`}>
      <div className="container-custom pt-24 pb-16">
        {/* 游戏标题和信息 */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">{game.title}</h1>
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${
                  isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isLiked ? 'text-red-600' : 'text-gray-600'}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>喜欢</span>
              </button>
              <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                <span>分享</span>
              </button>
            </div>
          </div>
          <div className="flex items-center text-gray-600 mt-2">
            <span className="mr-4">作者: {game.author}</span>
            <span className="mr-4">分类: {game.category}</span>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {game.views} 次浏览
            </span>
          </div>
        </div>
        
        {/* 游戏主体 */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* 游戏和描述 */}
          <div className="w-full md:w-3/4">
            {/* 游戏窗口 */}
            <div className="bg-black rounded-lg shadow-lg overflow-hidden mb-6">
              <div className="game-container w-full">
                <iframe 
                  src={`https://turbowarp.org/${game.scratchId}/embed`} 
                  className="w-full h-full border-0"
                  allowFullScreen
                  allowTransparency
                  allow="autoplay; fullscreen"
                ></iframe>
              </div>
            </div>
            
            {/* 游戏描述 */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">游戏描述</h2>
              <p className="text-gray-700 mb-4">{game.description}</p>
              
              {game.instructions && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">游戏指南</h3>
                  <div className="bg-indigo-50 text-indigo-800 p-4 rounded-md">
                    {game.instructions}
                  </div>
                </div>
              )}
              
              {game.notes && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">游戏提示</h3>
                  <div className="bg-amber-50 text-amber-800 p-4 rounded-md">
                    {game.notes}
                  </div>
                </div>
              )}
            </div>
            
            {/* 评论区 - 静态展示 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">评论 (3)</h2>
              
              {/* 评论输入框 */}
              <div className="mb-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex-shrink-0"></div>
                  <div className="flex-grow">
                    <textarea 
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                      rows="3"
                      placeholder="分享你的想法和体验..."
                    ></textarea>
                    <div className="mt-2 flex justify-end">
                      <button className="btn-primary px-4 py-2">发表评论</button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 评论列表 - 静态数据 */}
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex-shrink-0"></div>
                  <div>
                    <div className="flex items-center mb-1">
                      <h3 className="font-medium text-gray-900 mr-2">小明</h3>
                      <span className="text-sm text-gray-500">2天前</span>
                    </div>
                    <p className="text-gray-700 mb-2">这个游戏太好玩了！我特别喜欢里面的设计和关卡，很有挑战性。</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <button className="flex items-center hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        <span>12</span>
                      </button>
                      <span className="mx-2">·</span>
                      <button className="hover:text-gray-700">回复</button>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex-shrink-0"></div>
                  <div>
                    <div className="flex items-center mb-1">
                      <h3 className="font-medium text-gray-900 mr-2">阿强</h3>
                      <span className="text-sm text-gray-500">5天前</span>
                    </div>
                    <p className="text-gray-700 mb-2">操作很流畅，但是最后一关太难了，有没有攻略可以参考？</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <button className="flex items-center hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        <span>8</span>
                      </button>
                      <span className="mx-2">·</span>
                      <button className="hover:text-gray-700">回复</button>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex-shrink-0"></div>
                  <div>
                    <div className="flex items-center mb-1">
                      <h3 className="font-medium text-gray-900 mr-2">小兰</h3>
                      <span className="text-sm text-gray-500">1周前</span>
                    </div>
                    <p className="text-gray-700 mb-2">画面很精美，音乐也很好听！希望能增加更多关卡。</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <button className="flex items-center hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        <span>15</span>
                      </button>
                      <span className="mx-2">·</span>
                      <button className="hover:text-gray-700">回复</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 侧边栏 */}
          <div className="w-full md:w-1/4">
            {/* 作者信息 */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">作者信息</h2>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-indigo-800 font-bold text-lg">{game.author?.charAt(0) || '?'}</span>
                </div>
                <div>
                  <h3 className="font-medium">{game.author}</h3>
                  <p className="text-sm text-gray-500">Scratch游戏开发者</p>
                </div>
              </div>
              <button className="w-full btn-outline flex items-center justify-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>关注作者</span>
              </button>
            </div>
            
            {/* 相关游戏 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">类似游戏</h2>
              <div className="space-y-4">
                {relatedGames.map(relatedGame => (
                  <div 
                    key={relatedGame._id} 
                    className="bg-gray-50 p-3 rounded-lg hover:shadow-md transition-shadow duration-300 cursor-pointer"
                    onClick={() => router.push(`/games/${relatedGame._id}`)}
                  >
                    <div className="relative h-24 w-full mb-2 rounded overflow-hidden">
                      <img 
                        src={relatedGame.thumbnailUrl} 
                        alt={relatedGame.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 truncate">{relatedGame.title}</h3>
                    <p className="text-sm text-gray-600 truncate">{relatedGame.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* 更多游戏推荐 */}
        <div className="mt-16">
          <h2 className="section-title">您可能也喜欢</h2>
          <GameGrid games={games.filter(g => g._id !== id).slice(0, 4)} />
        </div>
      </div>
    </Layout>
  );
} 