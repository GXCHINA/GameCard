import Layout from '../components/Layout';
import Image from 'next/image';

export default function About() {
  return (
    <Layout title="关于我们 - 趣玩游戏站">
      <div className="pt-24 pb-10 bg-gradient-to-r from-green-500 to-teal-600">
        <div className="container-custom">
          <div className="text-center text-white mb-4">
            <h1 className="text-4xl font-bold mb-4">关于趣玩游戏站</h1>
            <p className="text-lg text-green-100 max-w-3xl mx-auto">
              我们致力于为玩家提供最好的Scratch游戏体验平台
            </p>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/images/about-illustration.svg"
                  alt="趣玩游戏站"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">我们的使命</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  趣玩游戏站成立于2023年，我们的使命是为Scratch游戏爱好者创建一个便捷、有趣的游戏体验平台。我们相信，每个人都应该能够便捷地访问高质量的Scratch游戏，同时支持创作者获得更多的曝光和认可。
                </p>
                <p className="mb-4">
                  我们的平台收集了来自Scratch社区的精选游戏，经过优化后提供给玩家，确保流畅的游戏体验。我们不仅仅是一个游戏聚合站，更是一个连接玩家和创作者的桥梁。
                </p>
                <p>
                  通过我们的平台，您可以发现各种有趣、创新的Scratch游戏，而不必担心广告或下载问题。所有游戏都可以直接在浏览器中玩，无需额外安装任何软件。
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">安全可靠</h3>
            <p className="text-gray-600 text-center">
              所有游戏都经过筛选和测试，确保内容适合所有年龄段的玩家。我们重视用户隐私，不收集不必要的个人信息。
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">快速体验</h3>
            <p className="text-gray-600 text-center">
              我们的平台经过优化，确保游戏加载迅速，体验流畅。无需等待下载，直接在浏览器中开始游戏。
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">支持创作者</h3>
            <p className="text-gray-600 text-center">
              我们重视原创，每个游戏都会标明原作者信息，帮助Scratch创作者获得应有的认可。
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">联系我们</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">联系方式</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">contact@quiwangames.com</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">微信公众号: 趣玩游戏站</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                  <span className="text-gray-700">QQ群: 123456789</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">反馈与建议</h3>
              <p className="text-gray-700 mb-4">
                我们非常重视您的反馈和建议。如果您有任何问题、建议或合作意向，欢迎随时联系我们。
              </p>
              <button className="btn-primary">
                发送反馈
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 