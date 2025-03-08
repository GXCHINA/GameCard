import Link from 'next/link';
import Image from 'next/image';

export default function GameCard({ game }) {
  // 映射类别到相应的CSS类
  const getCategoryClass = (category) => {
    const mapping = {
      '动作': 'category-action',
      '冒险': 'category-adventure',
      '解谜': 'category-puzzle',
      '模拟': 'category-simulation',
      '策略': 'category-strategy',
      '其他': 'category-other'
    };
    return mapping[category] || 'category-other';
  };

  return (
    <div className="game-card card group">
      <Link href={`/games/${game._id}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <div className="absolute inset-0 game-card-img">
            <Image 
              src={game.thumbnailUrl} 
              alt={game.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute top-0 right-0 m-2">
            <span className={`category-badge ${getCategoryClass(game.category)}`}>
              {game.category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate group-hover:text-indigo-600 transition-colors">
            {game.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">作者: {game.author}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{game.views} 次浏览</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{game.likes || 0}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
} 