import React from 'react';
import Link from 'next/link';

export default function GameGrid({ games }) {
  if (!games || games.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-500">暂无游戏可显示</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {games.map(game => (
        <Link href={`/games/${game._id}`} key={game._id}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48">
              <img 
                src={game.thumbnailUrl} 
                alt={game.title}
                className="absolute w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {game.category}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">{game.title}</h3>
              <p className="text-sm text-gray-600 mb-2">作者: {game.author}</p>
              <p className="text-sm text-gray-700 line-clamp-2 h-10 mb-2">{game.description}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{game.views}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{game.likes}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 