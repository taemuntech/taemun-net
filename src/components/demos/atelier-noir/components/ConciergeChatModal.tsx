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
      text: '안녕하세요. 아틀리에 누아르 1:1 패션 컨시어지 화면입니다. 미리 적어 둔 예시 답변만 돌려주는 샘플 대화라 상담원이 실제로 읽지 않고, 입력하신 내용은 어디에도 전송되지 않습니다. 실루엣·소재감·실측 사이즈 추천 흐름을 그대로 둘러보세요.',
      time: '14:02',
    },
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const quickPrompts = [
    '180cm / 70kg인데 BRAND A (예시) 블레이저 사이즈 추천해 줘',
    '발마칸 코트와 어울리는 와이드 팬츠 추천',
    '정품 검수 절차와 결제 수단이 궁금해요',
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
      let replyText = '(예시 답변) 체형과 선호하시는 드레이프 핏에 맞춘 큐레이션을 안내하는 자리입니다. 샘플 화면이라 실제 상담으로 이어지지 않습니다.';
      if (text.includes('사이즈') || text.includes('180cm')) {
        replyText = '(예시 답변) 180cm / 70kg 체형이라면 BRAND A (예시) 블레이저는 L(100-105) 사이즈를 권해 드립니다. 과하게 부하지 않으면서 어깨 라인이 자연스럽게 드롭되는 세미 오버핏 실루엣이 나옵니다.';
      } else if (text.includes('팬츠') || text.includes('발마칸')) {
        replyText = '(예시 답변) 발마칸 코트의 A라인 실루엣에는 BRAND C (예시)의 텐셀 울 딥 플리츠 와이드 슬랙스가 무난하게 어울립니다. 걸을 때마다 밑단 드레이프가 떨어지는 조합입니다.';
      } else if (text.includes('정품') || text.includes('결제') || text.includes('검수')) {
        replyText = '(예시 답변) 입고 상품을 판매 전에 검수하고 결과를 상세 페이지에 남기는 절차, 카드·간편결제 수단 안내가 들어가는 자리입니다. 여기 적힌 조건은 실제 운영 규정이 아니라 예시 문안이고, 이 샘플에서는 결제가 이루어지지 않습니다.';
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
                샘플 자동응답 (예시) · 실제 상담원 연결 아님
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
          <p className="mb-2 text-[10px] font-label-sm text-[#8f9378]">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
          </p>
          {/* 화면 안에서만 도는 예시 대화다 — 상담 접수가 아니라 대화 UI 시연이라 data-sample-local 로 표시한다 */}
          <form
            data-sample-local
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
