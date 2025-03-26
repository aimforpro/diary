'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getDiaryById, saveDiary, DiaryEntry } from '@/lib/storage';
import { analyzeEmotion, emotionIcons } from '@/lib/emotion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale';

// 동적 라우팅으로 URL에서 id 파라미터를 받습니다
export default function EditDiaryPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [diary, setDiary] = useState<DiaryEntry | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 컴포넌트 마운트 시 일기 데이터 불러오기
  useEffect(() => {
    setIsLoading(true);
    
    const diaryData = getDiaryById(params.id);
    if (diaryData) {
      setDiary(diaryData);
      setSelectedDate(new Date(diaryData.date));
      setContent(diaryData.content);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
    
    setIsLoading(false);
  }, [params.id]);

  // 폼 제출 핸들러
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !content.trim()) {
      alert('날짜와 내용을 모두 입력해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 원래 일기가 없는 경우 예외 처리
      if (!diary) {
        throw new Error('수정할 일기를 찾을 수 없습니다.');
      }
      
      console.log('일기 내용 업데이트:', content);
      
      // 감정 분석
      const emotion = analyzeEmotion(content);
      console.log('감정 분석 완료 - 결과:', emotion);
      
      // 일기 객체 업데이트
      const updatedDiary: DiaryEntry = {
        ...diary,
        date: selectedDate.toISOString(),
        content,
        emotion
      };
      
      console.log('업데이트된 일기 객체:', updatedDiary);
      
      // 로컬 스토리지에 저장
      saveDiary(updatedDiary);
      
      alert('일기가 수정되었습니다.');
      
      // 목록 페이지로 이동
      router.push('/diary');
    } catch (error) {
      console.error('일기 수정 중 오류:', error);
      alert('일기 수정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 일기를 찾을 수 없는 경우
  if (notFound) {
    return (
      <main className="container mx-auto p-4 max-w-4xl">
        <div className="mb-6">
          <Link 
            href="/diary"
            className="text-blue-500 hover:text-blue-700 flex items-center group"
            aria-label="목록으로 돌아가기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 transition-transform duration-200 group-hover:-translate-x-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold mb-6 text-red-500">일기를 찾을 수 없습니다</h1>
          <p className="mb-4">요청하신 ID의 일기가 존재하지 않습니다.</p>
          <Link 
            href="/diary/new"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            새 일기 작성하기
          </Link>
        </div>
      </main>
    );
  }
  
  // 로딩 중인 경우
  if (isLoading) {
    return (
      <main className="container mx-auto p-4 max-w-4xl">
        <div className="mb-6">
          <Link 
            href="/diary"
            className="text-blue-500 hover:text-blue-700 flex items-center group"
            aria-label="목록으로 돌아가기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 transition-transform duration-200 group-hover:-translate-x-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold mb-6">일기 불러오는 중...</h1>
          <div className="flex justify-center">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <Link 
          href="/diary"
          className="text-blue-500 hover:text-blue-700 flex items-center group"
          aria-label="목록으로 돌아가기"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 transition-transform duration-200 group-hover:-translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">일기 수정</h1>
        
        {diary && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <span className="text-lg mr-2">현재 감정:</span>
              <span className="text-2xl">{emotionIcons[diary.emotion]}</span>
              <span className="ml-2 text-gray-600">
                ({diary.emotion === 'happy' ? '행복' : 
                 diary.emotion === 'sad' ? '슬픔' : 
                 diary.emotion === 'angry' ? '화남' : 
                 diary.emotion === 'anxious' ? '불안' : '중립'})
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">내용을 수정하면 감정이 다시 분석됩니다.</p>
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              날짜
            </label>
            <div className="relative">
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => date && setSelectedDate(date)}
                dateFormat="yyyy년 MM월 dd일"
                locale={ko}
                className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                popperClassName="react-datepicker-popper"
                popperPlacement="bottom-end"
                popperModifiers={[
                  {
                    name: 'offset',
                    options: {
                      offset: [0, 4],
                    },
                    fn: () => ({ x: 0, y: 4 }),
                  },
                ]}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="diaryContent" className="block text-sm font-medium text-gray-700 mb-1">
              내용
            </label>
            <textarea
              id="diaryContent"
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-40"
              placeholder="오늘 하루 어떠셨나요? 감정, 생각 등을 자유롭게 적어보세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Link href="/diary">
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
              >
                취소
              </button>
            </Link>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
} 