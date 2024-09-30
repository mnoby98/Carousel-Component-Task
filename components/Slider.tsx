import Image from "next/image";
import React from "react";

interface ImageType {
  imageId: number;
  image: string;
  currentImage: number;
}
const Slider = ({ currentImage, imageId, image }: ImageType) => {
  return (
    <div
      className={`  w-full h-full absolute transition-transform ease-in-out duration-1000 ${
        imageId === currentImage
          ? "translate-x-0 z-0"
          : " -translate-x-[100vw]  -z-10"
      }`}
      key={imageId}>
      <Image
        src={image}
        alt="image"
        className=" w-full h-full    "
      />
    </div>
  );
};

export default Slider;
