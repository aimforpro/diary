import React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

// 감정 타입 정의
type Emotion = 'happy' | 'sad' | 'angry' | 'anxious' | 'neutral';

// 감정별 아이콘 맵핑 (실제로는 react-icons 등을 사용)
const emotionIcons = {
  happy: '😊',
  sad: '😢',
  angry: '😡',
  anxious: '😰',
  neutral: '😐',
};

interface DiaryCardProps {
  id: string;
  date: Date;
  content: string;
  emotion: Emotion;
  onClick?: () => void;
}

export default function DiaryCard({ id, date, content, emotion, onClick }: DiaryCardProps) {
  // 컨텐츠를 100자로 제한
  const truncatedContent = content.length > 100 
    ? `${content.slice(0, 100)}...` 
    : content;

  return (
    <div 
      className={`p-4 rounded-lg shadow-md cursor-pointer bg-emotion-${emotion} bg-opacity-10 hover:bg-opacity-20 transition-all`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">
          {format(date, 'yyyy년 MM월 dd일 EEEE', { locale: ko })}
        </span>
        <span className="text-2xl">{emotionIcons[emotion]}</span>
      </div>
      <p className="text-gray-700">{truncatedContent}</p>
    </div>
  );
} 