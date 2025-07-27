"use client";
import { IKVideo } from "imagekitio-next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
type VideoTypes = {
  path: string;
  className?: string;
};

const Video = ({ path, className }: VideoTypes) => {
  return (
    <IKVideo
      urlEndpoint={urlEndpoint}
      path={path}
      className={className}
      transformation={[
        { raw: "w-1920,h-1080,q-90" }, // ✅ combine width, height, quality here
        { raw: "l-text,i-LamaDev,fs-100,co-white,l-end" }, // watermark or label
      ]}
      controls
    />
  );
};

export default Video;
