"use client";
import dynamic from "next/dynamic";
import type { ModalVideoProps } from "react-modal-video";

const VideoModalContent = dynamic(() => import("./VideoModalContent"), {
  ssr: false,
});

export default function VideoModal(props: ModalVideoProps) {
  return <VideoModalContent {...props} />;
}
