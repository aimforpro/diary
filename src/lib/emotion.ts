// 감정 타입 정의
export type Emotion = 'happy' | 'sad' | 'angry' | 'anxious' | 'neutral';

// 감정별 아이콘 맵핑
export const emotionIcons = {
  happy: '😊',
  sad: '😢',
  angry: '😡',
  anxious: '😰',
  neutral: '😐',
};

// 감정별 색상 클래스 맵핑
export const emotionColorClasses = {
  happy: 'bg-emotion-happy',
  sad: 'bg-emotion-sad',
  angry: 'bg-emotion-angry',
  anxious: 'bg-emotion-anxious',
  neutral: 'bg-emotion-neutral',
};

// 감정 분석 함수 (실제로는 GPT API 호출 필요)
export const analyzeEmotion = (text: string): Emotion => {
  // 실제 구현에서는 OpenAI API 호출
  // 지금은 간단한 키워드 기반 감정 분석으로 대체
  
  console.log('감정 분석 시작 - 텍스트:', text);
  
  const keywords = {
    happy: [
      '행복', '기쁨', '좋은', '즐거운', '신나는', '웃음', '재미', 
      '최고', '자랑', '성취', '만족', '감사', '사랑', '설렘', '희망',
      '행운', '감동', '응원', '축하', '좋았', '좋다', '기뻐', '즐겁'
    ],
    sad: [
      '슬픔', '우울', '속상', '눈물', '아쉬움', '그리움', '외로움',
      '상실', '후회', '미안', '괴로움', '실망', '좌절', '포기', '울었',
      '서글프', '애도', '비통', '쓸쓸', '아프', '썼쓸', '그립', '허무'
    ],
    angry: [
      '화남', '분노', '짜증', '열받는', '화가', '미움', '증오',
      '불만', '혐오', '질투', '억울', '배신', '분통', '시기', '냉소',
      '싫다', '짜증나', '화나', '열받', '빡쳤', '빡침', '짜증', '분함'
    ],
    anxious: [
      '불안', '걱정', '초조', '스트레스', '두려움', '무서움', '공포',
      '긴장', '압박', '조마조마', '걱정돼', '겁나', '떨림', '당황', '혼란',
      '버거움', '부담', '긴장', '불편', '조심', '경계', '불확실', '주저'
    ],
    neutral: [
      '평범', '무난', '그냥', '보통', '일상', '별일 없', '무감정',
      '담담', '차분', '기록', '관찰', '진행', '일지', '메모', '계획'
    ]
  };
  
  // 각 감정별 키워드 매칭 점수 계산
  const scores: Record<Emotion, number> = {
    happy: 0,
    sad: 0,
    angry: 0,
    anxious: 0,
    neutral: 0.5 // 기본값으로 중립에 약간의 가중치 (1.0에서 0.5로 낮춤)
  };
  
  // 간단한 키워드 기반 점수 계산
  for (const [emotion, words] of Object.entries(keywords)) {
    for (const word of words) {
      if (text.includes(word)) {
        // 가중치 높임: 1.0에서 2.0으로
        scores[emotion as Emotion] += 2.0;
        console.log(`키워드 매칭: '${word}' - ${emotion} 점수 증가 (+2.0)`);
      }
    }
  }
  
  console.log('감정 분석 결과 점수:', scores);
  
  // 가장 높은 점수의 감정 반환
  let maxEmotion: Emotion = 'neutral';
  let maxScore = 0;
  
  for (const [emotion, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      maxEmotion = emotion as Emotion;
      console.log(`최고 점수 갱신: ${emotion} (${score}점)`);
    }
  }
  
  console.log('최종 선택된 감정:', maxEmotion);
  return maxEmotion;
}; 