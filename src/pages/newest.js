import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import GameGrid from '../components/GameGrid';
import Link from 'next/link';
import { games } from '../data/games';

export default function Newest() {
  const [newestGames, setNewestGames] = useState([]);

  useEffect(() => {
    // 根据创建时间排序，新的在前
    const sorted = [...games].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    setNewestGames(sorted);
  }, []);

  return (
    <Layout title="最新游戏 - 趣玩游戏站">
      <div className="pt-24 pb-10 bg-gradient-to-r from-cyan-500 to-blue-600">
        <div className="container-custom">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl font-bold mb-2">最新游戏</h1>
            <p className="text-blue-100">
              探索最新加入趣玩游戏站的精彩游戏
            </p>
          </div>
          
          {newestGames.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="relative h-96 rounded-lg overflow-hidden">
                    <img 
                      src={newestGames[0].thumbnailUrl} 
                      alt={newestGames[0].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="inline-block px-2 py-1 bg-cyan-600 text-white text-xs rounded mb-2">最新上线</div>
                      <h2 className="text-2xl font-bold text-white mb-2">{newestGames[0].title}</h2>
                      <p className="text-blue-100 mb-4 line-clamp-2">{newestGames[0].description}</p>
                      <Link href={`/games/${newestGames[0]._id}`} className="btn-primary">
                        立即体验
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-2">其他新游戏</h3>
                  
                  {newestGames.slice(1, 4).map(game => (
                    <Link href={`/games/${game._id}`} key={game._id}>
                      <div className="flex items-center bg-white/20 rounded-lg p-2 transition-colors hover:bg-white/30">
                        <div className="flex-shrink-0 w-16 h-16 mr-4">
                          <img 
                            src={game.thumbnailUrl} 
                            alt={game.title}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-white">{game.title}</h4>
                          <p className="text-blue-100 text-sm">{game.category} · {game.author}</p>
                        </div>
                        <div className="flex-shrink-0 text-white/80">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="container-custom py-12">
        <h2 className="section-title">所有最新游戏</h2>
        <GameGrid games={newestGames} />
      </div>
    </Layout>
  );
} 