import Image, { StaticImageData } from "next/image";
import React from "react";

interface ImageType {
  imageId: number;
  image: StaticImageData;
  currentImage: number;
  touchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
  touchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
}
const Slider = ({
  currentImage,
  imageId,
  image,
  touchEnd,
  touchStart,
}: ImageType) => {
  return (
    <div
      onTouchStart={touchStart}
      onTouchEnd={touchEnd}
      className={`     active:cursor-grabbing cursor-grab      w-full h-full absolute transition-transform ease-in-out duration-1000 ${
        imageId === currentImage
          ? "translate-x-0 z-0"
          : " -translate-x-[100vw]  -z-10"
      }`}
      key={imageId}>
      <Image
        draggable={true}
        src={image}
        alt="image"
        className=" w-full h-full     "
      />
    </div>
  );
};

export default Slider;
