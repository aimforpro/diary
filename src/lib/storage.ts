// 일기 타입 정의
export interface DiaryEntry {
  id: string;
  date: string; // ISO 포맷
  content: string;
  emotion: 'happy' | 'sad' | 'angry' | 'anxious' | 'neutral';
}

// 로컬 스토리지 키
const STORAGE_KEY = 'mood-diary-entries';

// 일기 저장
export const saveDiary = (diary: DiaryEntry): void => {
  if (typeof window === 'undefined') return;
  
  const existing = getAllDiaries();
  const existingIndex = existing.findIndex(entry => entry.id === diary.id);
  
  if (existingIndex >= 0) {
    // 기존 일기 업데이트
    existing[existingIndex] = diary;
  } else {
    // 새 일기 추가
    existing.push(diary);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
};

// 모든 일기 가져오기
export const getAllDiaries = (): DiaryEntry[] => {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// ID로 일기 가져오기
export const getDiaryById = (id: string): DiaryEntry | undefined => {
  if (typeof window === 'undefined') return undefined;
  
  const diaries = getAllDiaries();
  return diaries.find(diary => diary.id === id);
};

// 특정 일기 삭제하기
export const deleteDiary = (id: string): void => {
  if (typeof window === 'undefined') return;
  
  const diaries = getAllDiaries();
  const filteredDiaries = diaries.filter(diary => diary.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredDiaries));
};

// 고유 ID 생성 (실제로는 uuid 같은 라이브러리 사용 권장)
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}; 