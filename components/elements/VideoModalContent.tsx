"use client";
import ModalVideo, { ModalVideoProps } from "react-modal-video";
import "@/node_modules/react-modal-video/css/modal-video.css";

export default function VideoModalContent(props: ModalVideoProps) {
  return <ModalVideo {...props} />;
}
