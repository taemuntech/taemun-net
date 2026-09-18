import React, { useEffect, useRef, useState } from 'react';
import { X, Send } from 'lucide-react';
import { useDrawerBehavior } from '../use-drawer-behavior';

interface ConciergeChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'concierge' | 'user';
  text: string;
  time: string;
}

/** 브라우저 시간대와 무관하게 한국 시각으로 찍는다(해외에서 열면 엉뚱한 시각이 나온다) */
function nowKST(): string {
  return new Date().toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Seoul',
  });
}

export const ConciergeChatDrawer: React.FC<ConciergeChatDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'concierge',
      text: '환영합니다. 메종 드 럭스 컨시어지입니다. 찾으시는 아카이브 피스나 검수 이력, 방문 피팅 예약을 안내해 드립니다. (샘플 사이트의 자동 응답 예시입니다)',
      time: '오후 2:10 · 자동 응답 예시',
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const streamRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useDrawerBehavior(isOpen, onClose);

  // 새 메시지가 붙으면 아래로 따라간다
  useEffect(() => {
    const el = streamRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    const userMsg = inputText.trim();

    setMessages((prev) => [...prev, { sender: 'user', text: userMsg, time: nowKST() }]);
    setInputText('');

    // 지어낸 메종만 언급한다 — 실존 하우스 이름으로 답하면 그 하우스의 공식 창구처럼 읽힌다
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      let reply =
        '문의 주신 내용 확인했습니다. 해당 피스는 파리·서울 아카이브 수장고에 보관 중이며, 3단계 검수를 마친 뒤 봉인 태그와 검수 이력서를 함께 보내 드립니다. (자동 응답 예시)';
      if (userMsg.includes('코르빌') || userMsg.toUpperCase().includes('CORVILLE') || userMsg.includes('가방')) {
        reply =
          '코르빌 그레인 카프 톱핸들 25 는 미사용 풀세트로, 매입 인보이스 사본과 자체 감정팀 교차 검수 이력서가 동봉됩니다. (자동 응답 예시)';
      } else if (userMsg.includes('발단') || userMsg.toUpperCase().includes('VALDANE') || userMsg.includes('시계')) {
        reply =
          '발단 다이버 41 은 미사용 신품이며 구동 오차 측정표가 함께 전달됩니다. 로트 번호 MDL-2025-08993 으로 검수 이력을 조회하실 수 있습니다. (자동 응답 예시)';
      } else if (userMsg.includes('예약') || userMsg.includes('피팅') || userMsg.includes('방문')) {
        reply =
          '서울 살롱 룸에서 1:1 피팅과 실물 검수 세션을 예약해 드릴 수 있습니다. 원하시는 일시를 알려 주시면 담당 컨시어지를 배정합니다. (자동 응답 예시)';
      } else if (userMsg.includes('반품') || userMsg.includes('환불') || userMsg.includes('교환')) {
        reply =
          '수령 후 7일 이내 검수 반품을 받는다는 설정입니다. 샘플 사이트라 실제 정책은 아닙니다. (자동 응답 예시)';
      }

      setMessages((prev) => [...prev, { sender: 'concierge', text: reply, time: nowKST() }]);
    }, 700);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:bg-black/40 lg:backdrop-blur-none"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        id="conciergeDrawer"
        role="dialog"
        aria-modal="true"
        aria-label="프라이빗 컨시어지 상담"
        inert={!isOpen}
        // 닫힌 서랍이 화면 오른쪽 바깥에 눈에 안 보이는 채로 서 있어 잰 본문 폭을 1920 너머로 늘렸다 — 닫히면 invisible.
        // 까닭·전환 처리(닫을 때만 visibility 전환)는 CartDrawer 와 같다.
        className={`fixed top-[var(--sample-bar-h,0px)] bottom-0 right-0 max-w-md w-full bg-[#0e0e0e] border-l border-[#d4af37]/40 z-50 transform duration-300 flex flex-col shadow-2xl ${
          isOpen ? 'translate-x-0 transition-transform' : 'translate-x-full invisible transition-[transform,translate,visibility]'
        }`}
      >
        <div className="p-4 lg:p-5 border-b border-[#4d4635] flex items-center justify-between bg-[#131313] gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f2ca50] animate-pulse shrink-0"></span>
            <span className="font-serif text-base lg:text-lg text-[#e5e2e1] font-bold truncate">
              프라이빗 컨시어지
            </span>
          </div>
          <button
            type="button"
            className="flex items-center justify-center h-11 w-11 -mr-2 shrink-0 text-[#99907c] hover:text-[#f2ca50] transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="컨시어지 닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Stream */}
        <div ref={streamRef} className="flex-1 p-4 lg:p-5 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.sender === 'concierge' && (
                <div className="w-8 h-8 rounded-full bg-[#f2ca50] flex items-center justify-center text-[#0e0e0e] font-bold text-xs flex-shrink-0">
                  M
                </div>
              )}
              <div
                className={`p-3 text-xs lg:text-sm max-w-[82%] leading-relaxed [word-break:keep-all] ${
                  m.sender === 'user'
                    ? 'bg-[#d4af37] text-[#0e0e0e] font-medium'
                    : 'bg-[#1c1b1b] border border-[#4d4635] text-[#e5e2e1]'
                }`}
              >
                <p>{m.text}</p>
                <span
                  className={`text-[9px] mt-1.5 block ${m.sender === 'user' ? 'text-[#3c2f00]' : 'text-[#99907c]'}`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input — 화면 안에서만 도는 대화라 어디에도 전송되지 않는다 */}
        <form
          data-sample-local
          onSubmit={handleSend}
          className="p-3 lg:p-4 border-t border-[#4d4635] flex gap-2 bg-[#131313]"
        >
          <input
            className="flex-1 min-w-0 min-h-11 bg-[#1c1b1b] border border-[#d4af37]/40 text-[#e5e2e1] text-xs lg:text-sm px-3 py-3 focus:outline-none focus:border-[#f2ca50]"
            placeholder="문의 사항을 입력해 주세요"
            aria-label="컨시어지에게 보낼 메시지"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 min-h-11 bg-[#f2ca50] text-[#0e0e0e] text-[11px] font-bold tracking-wider hover:bg-[#ffe088] transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap"
          >
            <Send className="w-3.5 h-3.5" />
            전송
          </button>
        </form>
      </div>
    </>
  );
};
