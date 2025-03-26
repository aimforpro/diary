'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllDiaries, DiaryEntry } from '@/lib/storage';
import { emotionIcons, Emotion } from '@/lib/emotion';

export default function StatsPage() {
  const [emotionStats, setEmotionStats] = useState<Record<Emotion, number>>({
    happy: 0,
    sad: 0,
    angry: 0,
    anxious: 0,
    neutral: 0
  });
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로컬 스토리지에서 일기 데이터 로드
    const diaries = getAllDiaries();
    const stats: Record<Emotion, number> = {
      happy: 0,
      sad: 0,
      angry: 0,
      anxious: 0,
      neutral: 0
    };

    // 감정별 통계 계산
    diaries.forEach(diary => {
      stats[diary.emotion]++;
    });

    setEmotionStats(stats);
    setTotalEntries(diaries.length);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center">
            <p className="text-gray-600">통계를 불러오는 중...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 헤더 섹션 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Link 
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="홈으로 돌아가기"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">감정 통계</h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-6 sm:p-8">
          {totalEntries === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">아직 작성된 일기가 없습니다.</p>
              <Link 
                href="/diary/new"
                className="inline-flex items-center text-blue-500 hover:text-blue-700 font-medium gap-2"
              >
                <span>첫 일기 작성하기</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8 sm:mb-12">
                <h2 className="text-xl mb-6 text-gray-700">총 {totalEntries}개의 일기</h2>
                
                <div className="h-8 sm:h-10 bg-gray-100 rounded-full overflow-hidden">
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
                    
                    return percentage > 0 ? (
                      <div 
                        key={emotion}
                        className={`${bgColor} h-full float-left transition-all duration-500`} 
                        style={{ width: `${percentage}%` }}
                        title={`${emotion}: ${percentage.toFixed(1)}%`}
                      />
                    ) : null;
                  })}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {Object.entries(emotionStats).map(([emotion, count]) => {
                  const percentage = ((count / totalEntries) * 100).toFixed(1);
                  let bgColor = 'bg-gray-400';
                  const icon = emotionIcons[emotion as Emotion];
                  let emotionName = '';
                  
                  switch(emotion) {
                    case 'happy': 
                      bgColor = 'bg-emotion-happy';
                      emotionName = '행복';
                      break;
                    case 'sad': 
                      bgColor = 'bg-emotion-sad';
                      emotionName = '슬픔';
                      break;
                    case 'angry': 
                      bgColor = 'bg-emotion-angry';
                      emotionName = '화남';
                      break;
                    case 'anxious': 
                      bgColor = 'bg-emotion-anxious';
                      emotionName = '불안';
                      break;
                    case 'neutral': 
                      bgColor = 'bg-emotion-neutral';
                      emotionName = '중립';
                      break;
                  }
                  
                  return (
                    <div key={emotion} className="p-4 sm:p-6 rounded-xl bg-white border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-200">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-700 font-medium">{emotionName}</span>
                        <span className="text-3xl">{icon}</span>
                      </div>
                      <div className="flex items-end">
                        <span className="text-3xl sm:text-4xl font-bold text-gray-900">{percentage}%</span>
                        <span className="text-sm text-gray-500 ml-2 mb-1">({count}개)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
} 