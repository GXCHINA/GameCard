import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import GameGrid from '../components/GameGrid';
import Link from 'next/link';
import { games } from '../data/games';

export default function Home() {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [displayGames, setDisplayGames] = useState([]);
  
  useEffect(() => {
    // 随机选择3个游戏作为特色游戏
    const featured = [...games].sort(() => 0.5 - Math.random()).slice(0, 3);
    setFeaturedGames(featured);
    // 展示前8个游戏
    setDisplayGames(games.slice(0, 8));
  }, []);

  return (
    <Layout>
      {/* Hero Section - 特色游戏轮播 */}
      <div className="hero-section pt-24 pb-12">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-100">
              发现惊人的Scratch游戏
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              趣玩游戏站为您带来精选Scratch游戏，完全免费、无广告、无需下载，即刻畅玩！
            </p>
          </div>

          {featuredGames.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredGames.map((game) => (
                <Link href={`/games/${game._id}`} key={game._id}>
                  <div className="game-card">
                    <div className="relative h-56">
                      <img 
                        src={game.thumbnailUrl} 
                        alt={game.title}
                        className="game-card-img"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                    <div className="game-card-content">
                      <h3 className="game-card-title">{game.title}</h3>
                      <p className="game-card-author">作者: {game.author}</p>
                      <p className="game-card-description">{game.description}</p>
                      <div className="flex justify-between items-center">
                        <span className={`category-badge category-${game.category.toLowerCase()}`}>
                          {game.category}
                        </span>
                        <span className="text-indigo-200 text-sm">
                          {game.views} 次浏览
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 分类浏览 */}
      <div className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">游戏分类</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {['动作', '冒险', '解谜', '模拟', '策略', '其他'].map((category) => (
              <Link href={`/categories?category=${category}`} key={category}>
                <div className="category-card">
                  <div className={`category-icon ${
                    category === '动作' ? 'bg-red-100 text-red-600' :
                    category === '冒险' ? 'bg-blue-100 text-blue-600' :
                    category === '解谜' ? 'bg-purple-100 text-purple-600' :
                    category === '模拟' ? 'bg-green-100 text-green-600' :
                    category === '策略' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {category === '动作' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                      {category === '冒险' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                      {category === '解谜' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />}
                      {category === '模拟' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />}
                      {category === '策略' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
                      {category === '其他' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />}
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 热门游戏 */}
      <div className="py-16">
        <div className="container-custom">
          <h2 className="section-title">热门游戏</h2>
          
          <GameGrid games={displayGames} />
          
          <div className="text-center mt-12">
            <Link href="/popular" className="btn-secondary">
              查看更多游戏
            </Link>
          </div>
        </div>
      </div>

      {/* 如何使用 */}
      <div className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">如何使用趣玩游戏站</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              只需几个简单步骤，即可畅玩所有游戏
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="how-to-card">
              <div className="how-to-number bg-blue-100 text-blue-600">1</div>
              <h3 className="text-2xl font-semibold mb-4 text-center">浏览游戏</h3>
              <p className="text-gray-600 text-center">
                在我们的网站上浏览各种分类的趣味游戏
              </p>
            </div>
            
            <div className="how-to-card">
              <div className="how-to-number bg-green-100 text-green-600">2</div>
              <h3 className="text-2xl font-semibold mb-4 text-center">选择游戏</h3>
              <p className="text-gray-600 text-center">
                点击您感兴趣的游戏，查看详情
              </p>
            </div>
            
            <div className="how-to-card">
              <div className="how-to-number bg-purple-100 text-purple-600">3</div>
              <h3 className="text-2xl font-semibold mb-4 text-center">开始游戏</h3>
              <p className="text-gray-600 text-center">
                直接在浏览器中畅玩游戏，无需下载安装
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 