'use client';

import { useEffect } from 'react';

/**
 * 🔒 MediaProtectionGuard
 *
 * [태문 미디어 및 시각 자산 원천 차단 강령]
 * 1. 이미지, 비디오, 캔버스, 미디어 컨테이너의 마우스 우클릭(contextmenu) 원천 차단
 * 2. 마우스 드래그 앤 드롭을 통한 파일 외부 저장(dragstart) 원천 차단
 * 3. 비디오 플레이어 다운로드 메뉴 제거 및 PIP/원격재생 비활성화
 * 4. Ctrl+S / Cmd+S (웹페이지 일괄 저장으로 파일 유출) 차단
 * 5. 동적 렌더링(모달, 비동기 로딩) 미디어에도 MutationObserver로 100% 자동 방어 적용
 */
export default function MediaProtectionGuard() {
  useEffect(() => {
    // 1. 우클릭 컨텍스트 메뉴 차단
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isMedia =
        target.tagName === 'IMG' ||
        target.tagName === 'VIDEO' ||
        target.tagName === 'CANVAS' ||
        target.tagName === 'PICTURE' ||
        target.tagName === 'AUDIO' ||
        target.closest('img') !== null ||
        target.closest('video') !== null ||
        target.closest('picture') !== null ||
        target.closest('[data-protect-media]') !== null;

      if (isMedia) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // 2. 드래그 앤 드롭 파일 다운로드 차단
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isMedia =
        target.tagName === 'IMG' ||
        target.tagName === 'VIDEO' ||
        target.tagName === 'PICTURE' ||
        target.tagName === 'CANVAS' ||
        target.closest('img') !== null ||
        target.closest('video') !== null;

      if (isMedia) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // 3. 비디오 태그 다운로드 방어 속성 일괄 주입
    const secureVideoElement = (video: HTMLVideoElement) => {
      try {
        video.setAttribute('controlsList', 'nodownload noplaybackrate');
        video.setAttribute('disablePictureInPicture', 'true');
        video.setAttribute('disableRemotePlayback', 'true');
        video.oncontextmenu = (ev) => ev.preventDefault();
      } catch {
        // 가상 DOM 언마운트 등 예외 방어
      }
    };

    const secureAllVideos = () => {
      const videos = document.querySelectorAll<HTMLVideoElement>('video');
      videos.forEach(secureVideoElement);
    };

    // 4. Ctrl+S / Cmd+S 웹페이지 저장 단축키 차단
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // 초기 실행
    secureAllVideos();

    // 동적 생성 비디오 감시 (모달, 비동기 데모 등)
    const observer = new MutationObserver(() => {
      secureAllVideos();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('contextmenu', handleContextMenu, { capture: true });
    document.addEventListener('dragstart', handleDragStart, { capture: true });
    document.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      observer.disconnect();
      document.removeEventListener('contextmenu', handleContextMenu, { capture: true });
      document.removeEventListener('dragstart', handleDragStart, { capture: true });
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, []);

  return null;
}
