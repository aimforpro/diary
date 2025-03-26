'use client';

import Link from 'next/link'
import { useState, useEffect } from 'react';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cards = [
    {
      title: '일기 작성?',
      description: '매일의 감정과 생각을 기록하세요',
      href: '/diary/new',
      buttonText: '시작하기',
      bgClass: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      buttonClass: 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600'
    },
    {
      title: '감정 분석',
      description: 'AI가 당신의 감정을 분석합니다',
      href: '/diary',
      buttonText: '일기 보기',
      bgClass: 'bg-gradient-to-br from-blue-50 to-blue-100',
      buttonClass: 'bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600'
    },
    {
      title: '감정 시각화',
      description: '색상과 이모지로 감정을 표현합니다',
      href: '/stats',
      buttonText: '통계 보기',
      bgClass: 'bg-gradient-to-br from-green-50 to-green-100',
      buttonClass: 'bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600'
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-24">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            MoodDiary
          </h1>
          <p className="text-xl text-gray-600">당신의 감정을 기록하고 분석하세요</p>
        </div>

        <div className="carousel-container">
          <button
            onClick={prevSlide}
            className="carousel-button prev"
            aria-label="이전 슬라이드"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <div className="carousel">
            {cards.map((card, index) => {
              let className = 'carousel-item';
              if (index === activeIndex) className += ' active';
              else if (index === (activeIndex + 1) % cards.length) className += ' next';
              else if (index === (activeIndex - 1 + cards.length) % cards.length) className += ' prev';
              
              return (
                <div key={card.title} className={className}>
                  <div className={`${card.bgClass} w-full h-full rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-lg`}>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">{card.title}</h2>
                    <p className="text-gray-600 mb-8">{card.description}</p>
                    <Link 
                      href={card.href}
                      className={`${card.buttonClass} text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md`}
                    >
                      {card.buttonText}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={nextSlide}
            className="carousel-button next"
            aria-label="다음 슬라이드"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="carousel-dots">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
                aria-label={`슬라이드 ${index + 1}로 이동`}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
} 