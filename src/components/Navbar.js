import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '首页', href: '/' },
    { name: '分类', href: '/categories' },
    { name: '热门游戏', href: '/popular' },
    { name: '最新游戏', href: '/newest' },
    { name: '关于我们', href: '/about' }
  ];

  const isActive = (path) => router.pathname === path;

  return (
    <nav className={`fixed w-full z-30 transition-all duration-300 ${
      isScrolled ? 'bg-indigo-700 shadow-lg' : 'bg-indigo-600'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-white text-2xl font-bold">趣玩游戏站</span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.href) 
                      ? 'bg-indigo-800 text-white' 
                      : 'text-indigo-100 hover:bg-indigo-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索游戏..."
                  className="bg-indigo-800 text-white placeholder-indigo-300 rounded-full py-1 px-4 focus:outline-none focus:ring-2 focus:ring-white w-64"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <button
              type="button"
              className="md:hidden ml-2 p-2 rounded-md text-indigo-200 hover:text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 移动菜单 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.href) 
                    ? 'bg-indigo-900 text-white' 
                    : 'text-indigo-100 hover:bg-indigo-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 pb-1">
              <input
                type="text"
                placeholder="搜索游戏..."
                className="w-full bg-indigo-900 text-white placeholder-indigo-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 