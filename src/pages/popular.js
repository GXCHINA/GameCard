import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import GameGrid from '../components/GameGrid';
import Link from 'next/link';
import { games } from '../data/games';

export default function Popular() {
  const [topGames, setTopGames] = useState([]);
  const [otherGames, setOtherGames] = useState([]);

  useEffect(() => {
    // 根据浏览量排序
    const sortedGames = [...games].sort((a, b) => b.views - a.views);
    
    // 前3名游戏
    setTopGames(sortedGames.slice(0, 3));
    
    // 其余热门游戏
    setOtherGames(sortedGames.slice(3, 19));
  }, []);

  return (
    <Layout title="热门游戏 - 趣玩游戏站">
      <div className="pt-24 pb-10 bg-gradient-to-br from-orange-500 to-pink-600">
        <div className="container-custom">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl font-bold mb-2">热门游戏排行榜</h1>
            <p className="text-orange-100">
              探索趣玩游戏站上最受欢迎的游戏
            </p>
          </div>
          
          {topGames.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">本月最热门</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topGames.map((game, index) => (
                  <div 
                    key={game._id}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-lg overflow-hidden shadow-xl transform transition-transform hover:scale-105"
                  >
                    <Link href={`/games/${game._id}`}>
                      <div className="relative">
                        <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold shadow-lg">
                          #{index + 1}
                        </div>
                        <img 
                          src={game.thumbnailUrl} 
                          alt={game.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                        <p className="text-orange-100 mb-3 line-clamp-2">{game.description}</p>
                        <div className="flex justify-between items-center">
                          <span className={`category-badge ${game.category === '动作' ? 'category-action' : game.category === '冒险' ? 'category-adventure' : game.category === '解谜' ? 'category-puzzle' : game.category === '模拟' ? 'category-simulation' : game.category === '策略' ? 'category-strategy' : 'category-other'}`}>
                            {game.category}
                          </span>
                          <div className="flex items-center text-orange-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span className="font-medium">{game.views}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container-custom py-12">
        <h2 className="section-title">更多热门游戏</h2>
        <GameGrid games={otherGames} />
      </div>
    </Layout>
  );
} 