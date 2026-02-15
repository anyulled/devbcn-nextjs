"use client";
import dynamic from "next/dynamic";
import type { ModalVideoProps } from "react-modal-video";

interface ModalVideoBaseProps {
  channel: "youtube" | "vimeo" | "custom";
  isOpen: boolean;
  videoId: string;
  onClose: () => void;
  aria?: {
    openMessage: string;
    dismissBtnMessage: string;
  };
  allowFullScreen?: boolean;
  ratio?: string;
  animationSpeed?: number;
  classNames?: {
    modalVideo: string;
    modalVideoClose: string;
    modalVideoBody: string;
    modalVideoInner: string;
    modalVideoIframeWrap: string;
    modalVideoCloseBtn: string;
    modalVideoEffect: string;
  };
}

const VideoModalContent = dynamic(() => import("./VideoModalContent"), {
  ssr: false,
});

export default function VideoModal(props: Partial<ModalVideoProps>) {
  const defaultProps: ModalVideoBaseProps = {
    channel: "youtube",
    isOpen: false,
    videoId: "",
    onClose: () => {},
    aria: { openMessage: "Video modal opened", dismissBtnMessage: "Close video modal" },
    allowFullScreen: true,
    ratio: "16:9",
    animationSpeed: 300,
    classNames: {
      modalVideo: "modal-video",
      modalVideoClose: "modal-video-close",
      modalVideoBody: "modal-video-body",
      modalVideoInner: "modal-video-inner",
      modalVideoIframeWrap: "modal-video-movie-wrap",
      modalVideoCloseBtn: "modal-video-close-btn",
      modalVideoEffect: "modal-video-effect",
    },
  };

  const finalProps = { ...defaultProps, ...props } as ModalVideoProps;

  return <VideoModalContent {...finalProps} />;
}
