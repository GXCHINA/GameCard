import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import GameGrid from '../components/GameGrid';
import { useRouter } from 'next/router';
import { games } from '../data/games';

export default function Categories() {
  const router = useRouter();
  const { category: urlCategory } = router.query;
  
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = ['全部', '动作', '冒险', '解谜', '模拟', '策略', '其他'];
  
  // 设置分类的图标和颜色
  const categoryIcons = {
    '全部': {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>,
      color: 'bg-gray-100 text-gray-800'
    },
    '动作': {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>,
      color: 'bg-red-100 text-red-800'
    },
    '冒险': {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
      color: 'bg-blue-100 text-blue-800'
    },
    '解谜': {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>,
      color: 'bg-purple-100 text-purple-800'
    },
    '模拟': {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>,
      color: 'bg-green-100 text-green-800'
    },
    '策略': {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>,
      color: 'bg-amber-100 text-amber-800'
    },
    '其他': {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
      color: 'bg-indigo-100 text-indigo-800'
    }
  };

  useEffect(() => {
    // 如果URL中有分类参数，则设置选中的分类
    if (urlCategory && categories.includes(urlCategory)) {
      setSelectedCategory(urlCategory);
    }
  }, [urlCategory]);

  useEffect(() => {
    filterGames();
  }, [selectedCategory, searchTerm]);

  const filterGames = () => {
    let filtered = [...games];
    
    // 按分类过滤
    if (selectedCategory !== '全部') {
      filtered = filtered.filter(game => game.category === selectedCategory);
    }
    
    // 按搜索词过滤
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(game => 
        game.title.toLowerCase().includes(term) || 
        game.description.toLowerCase().includes(term) ||
        game.author.toLowerCase().includes(term)
      );
    }
    
    setFilteredGames(filtered);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    
    // 更新URL，但不重新加载页面
    const url = `/categories${category !== '全部' ? `?category=${category}` : ''}`;
    router.push(url, undefined, { shallow: true });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filterGames();
  };

  return (
    <Layout title="游戏分类 - 趣玩游戏站">
      <div className="container-custom pt-24 pb-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">游戏分类</h1>
        
        {/* 搜索栏 */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="搜索游戏..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow rounded-l-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button 
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              搜索
            </button>
          </form>
        </div>
        
        {/* 分类选择 */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category 
                    ? 'bg-indigo-600 text-white' 
                    : `${categoryIcons[category].color} hover:bg-opacity-80`
                }`}
              >
                <span className="mr-2">
                  {categoryIcons[category].icon}
                </span>
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* 分类统计 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {selectedCategory === '全部' ? '所有游戏' : `${selectedCategory}游戏`}
            <span className="ml-2 text-lg font-normal text-gray-500">({filteredGames.length})</span>
          </h2>
          
          <div className="flex flex-wrap gap-4">
            {categories.filter(c => c !== '全部').map(category => {
              const count = games.filter(g => g.category === category).length;
              return (
                <div 
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`flex items-center px-3 py-1.5 rounded-lg cursor-pointer ${
                    selectedCategory === category 
                      ? 'bg-indigo-100 text-indigo-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-1.5">
                    {categoryIcons[category].icon}
                  </span>
                  <span>{category}</span>
                  <span className="ml-1.5 px-1.5 py-0.5 bg-white rounded-full text-xs font-medium">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* 游戏列表 */}
        {filteredGames.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">暂无游戏</h3>
            <p className="text-gray-500 mb-6">
              当前分类或搜索条件下没有找到游戏，请尝试其他条件
            </p>
            <button 
              onClick={() => {
                setSelectedCategory('全部');
                setSearchTerm('');
                router.push('/categories', undefined, { shallow: true });
              }} 
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
            >
              查看全部游戏
            </button>
          </div>
        ) : (
          <GameGrid games={filteredGames} />
        )}
      </div>
    </Layout>
  );
}