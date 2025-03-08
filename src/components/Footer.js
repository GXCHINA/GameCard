import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">趣玩游戏站</h2>
            <p className="text-gray-300">
              发现并体验最有趣的Scratch游戏，免费在线玩，无需下载。
            </p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">快速链接</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-300 hover:text-white">
                  游戏分类
                </Link>
              </li>
              <li>
                <Link href="/popular" className="text-gray-300 hover:text-white">
                  热门游戏
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  关于我们
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">联系我们</h2>
            <p className="text-gray-300">
              有问题或建议？请与我们联系！
            </p>
            <p className="text-gray-300 mt-2">
              邮箱: contact@quiwangames.com
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>© {new Date().getFullYear()} 趣玩游戏站. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
} 