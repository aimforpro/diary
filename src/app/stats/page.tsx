import Link from 'next/link';

export default function StatsPage() {
  // 나중에 로컬스토리지나 API에서 데이터를 가져올 예정
  const emotionStats = {
    happy: 45,
    sad: 20,
    angry: 10,
    anxious: 15,
    neutral: 10
  };

  const totalEntries = Object.values(emotionStats).reduce((a, b) => a + b, 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            홈으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">감정 통계</h1>
          
          <div className="mb-12">
            <h2 className="text-xl mb-6 text-gray-700">총 {totalEntries}개의 일기</h2>
            
            <div className="h-10 bg-gray-100 rounded-full overflow-hidden">
              {Object.entries(emotionStats).map(([emotion, count], index) => {
                const percentage = (count / totalEntries) * 100;
                let bgColor = 'bg-gray-400';
                
                switch(emotion) {
                  case 'happy': bgColor = 'bg-emotion-happy'; break;
                  case 'sad': bgColor = 'bg-emotion-sad'; break;
                  case 'angry': bgColor = 'bg-emotion-angry'; break;
                  case 'anxious': bgColor = 'bg-emotion-anxious'; break;
                  case 'neutral': bgColor = 'bg-emotion-neutral'; break;
                }
                
                return (
                  <div 
                    key={emotion}
                    className={`${bgColor} h-full float-left transition-all duration-500`} 
                    style={{ width: `${percentage}%` }}
                    title={`${emotion}: ${percentage.toFixed(1)}%`}
                  />
                );
              })}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(emotionStats).map(([emotion, count]) => {
              const percentage = ((count / totalEntries) * 100).toFixed(1);
              let bgColor = 'bg-gray-400';
              let icon = '😐';
              
              switch(emotion) {
                case 'happy': 
                  bgColor = 'bg-emotion-happy'; 
                  icon = '😊';
                  break;
                case 'sad': 
                  bgColor = 'bg-emotion-sad'; 
                  icon = '😢';
                  break;
                case 'angry': 
                  bgColor = 'bg-emotion-angry'; 
                  icon = '😡';
                  break;
                case 'anxious': 
                  bgColor = 'bg-emotion-anxious'; 
                  icon = '😰';
                  break;
                case 'neutral': 
                  bgColor = 'bg-emotion-neutral'; 
                  icon = '😐';
                  break;
              }
              
              return (
                <div key={emotion} className="p-6 rounded-xl bg-white border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-700 font-medium capitalize">{emotion}</span>
                    <span className="text-3xl">{icon}</span>
                  </div>
                  <div className="flex items-end">
                    <span className="text-4xl font-bold text-gray-900">{percentage}%</span>
                    <span className="text-sm text-gray-500 ml-2 mb-1">({count}개)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
} 