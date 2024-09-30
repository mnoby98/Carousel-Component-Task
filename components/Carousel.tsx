"use client";
import React, { useState } from "react";
import CarouselButton from "@/components/CarouselButton";
import Slider from "./Slider";

interface images {
  images: string[];
}
const Carousel = ({ images }: images) => {
  // Current Image
  const [currentImage, setCurrentImage] = useState(0);

  // Select next image
  const nextImage = () => {
    if (currentImage >= images.length - 1) return;
    setCurrentImage((currentImage) => currentImage + 1);
  };

  // Select previse Image
  const prevImage = () => {
    if (currentImage <= 0) return;
    setCurrentImage((currentImage) => currentImage - 1);
  };

  // Select with bullets
  const selectImage = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <div className="  flex items-center h-full px-2 lg:px-0  gap-2 sm:gap-10 ">
      {/* Left Arrow */}
      <CarouselButton swipFun={prevImage}>{"<"}</CarouselButton>

      <div className=" relative overflow-hidden    w-full h-[300px] sm:h-[500px] flex-grow">
        {images.map((image, index) => (
          <Slider
            key={index}
            imageId={index}
            image={image}
            currentImage={currentImage}
          />
        ))}

        {/* Bullets */}
        <div className=" w-full flex items-center justify-center gap-5  absolute   bottom-5 z-30">
          {images.map((image, index) => (
            <button
              onClick={() => selectImage(index)}
              key={index}
              className={` w-3 h-3 rounded-full  border  ${
                index === currentImage ? " bg-blue-400 " : "   bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      {/* Right Arrows */}
      <CarouselButton swipFun={nextImage}>{">"}</CarouselButton>
    </div>
  );
};

export default Carousel;
