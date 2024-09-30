"use client";
import React, { useCallback, useEffect, useState } from "react";
import CarouselButton from "@/components/CarouselButton";
import Slider from "./Slider";
import { StaticImageData } from "next/image";

interface images {
  images: StaticImageData[];
}
const Carousel = ({ images }: images) => {
  // Current Image
  const [currentImage, setCurrentImage] = useState(0);
  const [startTouch, setStartTouch] = useState(0);
  const [endTouch, setEndTouch] = useState(0);

  // Select next image
  const nextSlide = useCallback(() => {
    if (currentImage >= images.length - 1) return;
    setCurrentImage((currentImage) => currentImage + 1);
  }, [currentImage, images.length]);

  // Select previse Image
  const previousSlide = useCallback(() => {
    if (currentImage <= 0) return;
    setCurrentImage((currentImage) => currentImage - 1);
  }, [currentImage]);

  // Select with bullets
  const selectImage = (index: number) => {
    setCurrentImage(index);
  };

  const touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartTouch(e.touches[0].clientX);
  };
  const touchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setEndTouch(e.changedTouches[0].clientX);
  };

  useEffect(() => {
    if (startTouch && endTouch) {
      if (startTouch > endTouch) {
        // Swiped left
        nextSlide();
      } else if (startTouch < endTouch) {
        // Swiped right
        previousSlide();
      }
      // Reset drag states
      setStartTouch(0);
      setEndTouch(0);
    }
  }, [startTouch, endTouch, nextSlide, previousSlide]);

  return (
    <div className="  select-all flex items-center h-full px-2 lg:px-0  gap-2 sm:gap-10 ">
      {/* Left Arrow */}
      <CarouselButton swipFun={previousSlide}>{"<"}</CarouselButton>

      <div className=" relative overflow-hidden    w-full h-[300px] sm:h-[500px] flex-grow">
        {images.map((image, index) => (
          <Slider
            touchStart={touchStart}
            touchEnd={touchEnd}
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
      <CarouselButton swipFun={nextSlide}>{">"}</CarouselButton>
    </div>
  );
};

export default Carousel;
