'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAllDiaries, deleteDiary, DiaryEntry } from '@/lib/storage';
import { emotionIcons } from '@/lib/emotion';

// 실제 프로젝트에서는 컴포넌트를 임포트하여 사용
// import DiaryCard from '@/components/DiaryCard';

export default function DiaryListPage() {
  const router = useRouter();
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  
  // 일기 목록 불러오기
  useEffect(() => {
    const loadedDiaries = getAllDiaries();
    setDiaries(loadedDiaries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);
  
  // 일기 삭제 처리
  const handleDelete = (e: React.MouseEvent, id: string) => {
    // 이벤트 전파 중지 (상위 요소 클릭 이벤트 방지)
    e.stopPropagation();
    
    if (confirm('정말 이 일기를 삭제하시겠습니까?')) {
      try {
        deleteDiary(id);
        router.refresh(); // 목록 다시 불러오기
        alert('일기가 삭제되었습니다.');
      } catch (error) {
        console.error('일기 삭제 오류:', error);
        alert('일기 삭제 중 오류가 발생했습니다.');
      }
    }
  };
  
  // 일기 항목 클릭 시 수정 페이지로 이동
  const handleDiaryClick = (id: string) => {
    router.push(`/diary/${id}`);
  };

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
            <h1 className="text-2xl font-bold text-gray-900">내 일기 목록</h1>
          </div>
          
          <Link 
            href="/diary/new"
            className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            일기 작성
          </Link>
        </div>

        {/* 일기 목록 */}
        <div className="space-y-6">
          {diaries.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-8 text-center">
              <p className="text-gray-500 text-lg mb-2">작성된 일기가 없습니다.</p>
              <p className="text-gray-400">새 일기를 작성해보세요.</p>
            </div>
          ) : (
            diaries.map(diary => (
              <div 
                key={diary.id}
                className="bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-6 cursor-pointer hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-200"
                onClick={() => handleDiaryClick(diary.id)}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">
                    {new Date(diary.date).toLocaleDateString('ko-KR', { 
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="text-3xl">
                    {emotionIcons[diary.emotion]}
                  </span>
                </div>
                <p className="text-gray-700 text-lg mb-4 line-clamp-3">{diary.content}</p>
                <div className="flex justify-end">
                  <button 
                    onClick={(e) => handleDelete(e, diary.id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    삭제
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
} 