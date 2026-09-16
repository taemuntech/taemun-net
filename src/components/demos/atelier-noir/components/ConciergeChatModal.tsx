import React, { useState } from 'react';

interface ConciergeChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  time: string;
}

export const ConciergeChatModal: React.FC<ConciergeChatModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'concierge',
      text: '안녕하세요. 아틀리에 누아르 1:1 VIP 패션 컨시어지 큐레이터 김민서입니다. 실루엣, 소재감, 실측 사이즈 추천이나 스타일링에 대해 무엇이든 편하게 문의해주세요.',
      time: '14:02',
    },
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const quickPrompts = [
    '180cm / 70kg인데 RECTO 블레이저 사이즈 추천해 줘',
    '발마칸 코트와 어울리는 와이드 팬츠 추천',
    '200% 정품 보증 및 토스페이먼츠 에스크로 결제 문의',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Generate responsive concierge reply
    setTimeout(() => {
      let replyText = '문의 감사드립니다. 고객님의 체형과 선호하시는 드레이프 핏에 최적화된 큐레이션을 안내해 드리겠습니다.';
      if (text.includes('사이즈') || text.includes('180cm')) {
        replyText = '180cm / 70kg 체형이시라면 RECTO 블레이저는 L(100-105) 사이즈를 가장 권장드립니다. 과하게 부하지 않으면서 어깨 라인이 자연스럽게 드롭되는 컨템포러리 세미 오버핏 실루엣이 완성됩니다.';
      } else if (text.includes('팬츠') || text.includes('발마칸')) {
        replyText = '발마칸 코트 특유의 유려한 A라인 실루엣에는 포스트 아카이브 팩션(PAF)의 텐셀 울 플루이드 딥 플리츠 와이드 슬랙스가 가장 완벽한 밸런스를 이룹니다. 걸을 때마다 밑단 드레이프가 우아하게 떨어집니다.';
      } else if (text.includes('정품') || text.includes('에스크로')) {
        replyText = '아틀리에 누아르의 전 상품은 국내외 본사 및 공인 디스트리뷰터와의 직계약을 통해 입고되며, 가품 확인 시 즉시 200% 책임 보상 환불이 보장됩니다. 결제 대금 역시 배송 수령 완료 시까지 토스페이먼츠 에스크로에 안전 예치됩니다.';
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'concierge',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 lg:p-4" onClick={onClose}>
      <div
        className="bg-[#1b1c1d] hairline-all max-w-lg w-full h-[600px] max-h-[90vh] flex flex-col justify-between relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#1f2021] hairline-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0d0e0f] hairline-all border-[#caf300] flex items-center justify-center text-[#caf300]">
              <span className="material-symbols-outlined text-[20px]">support_agent</span>
            </div>
            <div>
              <div className="font-headline-sm text-sm font-bold text-[#ffffff] flex items-center gap-2">
                <span>1:1 VIP 패션 컨시어지</span>
                <span className="w-2 h-2 rounded-full bg-[#caf300] inline-block animate-ping"></span>
              </div>
              <div className="text-[11px] font-label-sm text-[#8f9378]">
                큐레이터 김민서 · 평균 응답시간 1분 내
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#e3e2e3] hover:text-[#caf300] p-1"
            aria-label="닫기"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#0d0e0f]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${ msg.sender === 'user' ? 'items-end' : 'items-start' }`}
            >
              <div
                className={`max-w-[82%] p-3 text-xs leading-relaxed hairline-all ${ msg.sender === 'user' ? 'bg-[#caf300] text-[#171e00] font-medium border-[#caf300]' : 'bg-[#1b1c1d] text-[#e3e2e3]' }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-[#8f9378] font-label-sm mt-1 px-1">
                {msg.time}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Prompts */}
        <div className="px-3 py-2 bg-[#121314] hairline-t flex gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="whitespace-nowrap px-2.5 py-1 text-[11px] font-label-sm text-[#8f9378] hairline-all bg-[#1b1c1d] hover:text-[#caf300] hover:border-[#caf300] shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Footer */}
        <div className="p-3 bg-[#1b1c1d] hairline-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="체형, 실측 치수, 스타일링 질문을 입력하세요..."
              className="flex-1 bg-[#121314] hairline-all px-3 py-2 text-xs text-[#ffffff] focus:outline-none focus:border-[#caf300]"
            />
            <button
              type="submit"
              className="bg-[#caf300] text-[#171e00] px-4 py-2 text-xs font-bold uppercase hover:bg-[#ffffff] transition-colors shrink-0"
            >
              전송
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
