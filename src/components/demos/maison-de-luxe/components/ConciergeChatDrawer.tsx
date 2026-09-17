import React, { useState } from 'react';
import { X, Headphones, Send } from 'lucide-react';

interface ConciergeChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'concierge' | 'user';
  text: string;
  time: string;
}

export const ConciergeChatDrawer: React.FC<ConciergeChatDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'concierge',
      text: '환영합니다, 고객님. 메종 드 럭스 전담 마스터 컨시어지입니다. 찾으시는 아카이브 모델이나 통관·관세 문의, 또는 VIP 방문 피팅 예약을 지원해 드리겠습니다.',
      time: '오후 2:10 · 실시간 응대 중',
    },
  ]);
  const [inputText, setInputText] = useState<string>('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    const userMsg = inputText.trim();
    const now = new Date().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, time: now },
    ]);
    setInputText('');

    // Simulate smart concierge response
    setTimeout(() => {
      let reply =
        '문의 주신 사항을 확인하였습니다. 해당 아카이브 피스는 메종 드 럭스 파리 방돔 본원 및 서울 볼트(Vault) 보안 수장고에 보관 중이며, 3단계 정품 검수 완료 후 특수 보안 핸드캐리로 안전하게 인계됩니다.';
      if (userMsg.includes('버킨') || userMsg.includes('에르메스')) {
        reply =
          '에르메스 버킨 25 토고 골드 은장 피스는 2024년 W 각인 미사용 신품 풀세트이며, 파리 본점 오리지널 인보이스 영수증과 공인 감정원 2중 크로스체크 COA가 동봉됩니다.';
      } else if (userMsg.includes('롤렉스') || userMsg.includes('시계')) {
        reply =
          '롤렉스 서브마리너 데이트 41mm는 스위스 직수입 미사용 신품으로, 스위스 공식 보증서 및 무브먼트 오차율 측정 완결 증서가 함께 전달됩니다.';
      } else if (userMsg.includes('예약') || userMsg.includes('피팅') || userMsg.includes('방문')) {
        reply =
          '강남구 압구정로 메종 드 럭스 타워 12층 VIP 프라이빗 살롱 룸으로 1:1 전담 피팅 및 실물 검수 세션을 예약해 드릴 수 있습니다. 원하시는 일시를 말씀해 주시면 프라이빗 버틀러를 배정해 드립니다.';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'concierge',
          text: reply,
          time: new Date().toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    }, 700);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        id="conciergeDrawer"
        className={`fixed top-[var(--sample-bar-h,0px)] bottom-0 right-0 max-w-md w-full bg-[#0e0e0e] border-l border-[#d4af37]/40 z-50 transform transition-transform duration-300 flex flex-col shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 lg:p-5 border-b border-[#4d4635] flex items-center justify-between bg-[#131313]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f2ca50] animate-pulse"></span>
            <span className="font-serif text-base lg:text-lg text-[#e5e2e1] font-bold">
              VIP 부티크 프라이빗 컨시어지
            </span>
          </div>
          <button
            type="button"
            className="text-[#99907c] hover:text-[#f2ca50] transition-colors cursor-pointer p-1"
            onClick={onClose}
            title="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 p-4 lg:p-5 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'concierge' && (
                <div className="w-8 h-8 rounded-full bg-[#f2ca50] flex items-center justify-center text-[#0e0e0e] font-bold text-xs flex-shrink-0">
                  M
                </div>
              )}
              <div
                className={`p-3 text-xs lg:text-sm max-w-[82%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#d4af37] text-[#0e0e0e] font-medium'
                    : 'bg-[#1c1b1b] border border-[#4d4635] text-[#e5e2e1]'
                }`}
              >
                <p>{m.text}</p>
                <span
                  className={`text-[9px] mt-1.5 block ${
                    m.sender === 'user' ? 'text-[#3c2f00]' : 'text-[#99907c]'
                  }`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-3 lg:p-4 border-t border-[#4d4635] flex gap-2 bg-[#131313]">
          <input
            className="flex-1 bg-[#1c1b1b] border border-[#d4af37]/40 text-[#e5e2e1] text-xs lg:text-sm px-3 py-2.5 focus:outline-none focus:border-[#f2ca50]"
            placeholder="문의 사항을 입력해 주십시오..."
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <button
            type="button"
            className="px-4 bg-[#f2ca50] text-[#0e0e0e] text-[11px] font-bold tracking-wider hover:bg-[#ffe088] transition-colors cursor-pointer flex items-center gap-1"
            onClick={handleSend}
          >
            <Send className="w-3.5 h-3.5" />
            전송
          </button>
        </div>
      </div>
    </>
  );
};
