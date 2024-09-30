import Image, { StaticImageData } from "next/image";
import React from "react";

interface ImageType {
  imageId: number;
  image: StaticImageData;
  currentImage: number;
  dragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  dragStart: (e: React.DragEvent<HTMLDivElement>) => void;
}
const Slider = ({
  currentImage,
  imageId,
  image,
  dragEnd,
  dragStart,
}: ImageType) => {
  return (
    <div
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      className={`   active:cursor-grabbing cursor-grab  select-all   w-full h-full absolute transition-transform ease-in-out duration-1000 ${
        imageId === currentImage
          ? "translate-x-0 z-0"
          : " -translate-x-[100vw]  -z-10"
      }`}
      key={imageId}>
      <Image
        draggable={true}
        src={image}
        alt="image"
        className=" w-full h-full  select-all   "
      />
    </div>
  );
};

export default Slider;
