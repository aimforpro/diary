'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

export default function EditDiaryPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                날짜
              </label>
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
                wrapperClassName="react-datepicker-wrapper"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 