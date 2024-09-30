"use client";
import React, { useEffect, useState } from "react";
import CarouselButton from "@/components/CarouselButton";
import Slider from "./Slider";
import { StaticImageData } from "next/image";

interface images {
  images: StaticImageData[];
}
const Carousel = ({ images }: images) => {
  // Current Image
  const [currentImage, setCurrentImage] = useState(0);
  const [startDrag, setStartDrag] = useState(0);
  const [endDrag, setEndDrag] = useState(0);

  // Select next image
  const nextSlide = () => {
    if (currentImage >= images.length - 1) return;
    setCurrentImage((currentImage) => currentImage + 1);
  };

  // Select previse Image
  const previousSlide = () => {
    if (currentImage <= 0) return;
    setCurrentImage((currentImage) => currentImage - 1);
  };

  // Select with bullets
  const selectImage = (index: number) => {
    setCurrentImage(index);
  };

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setStartDrag(e.clientX);
  };
  const dragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setEndDrag(e.clientX);
  };

  useEffect(() => {
    if (startDrag && endDrag) {
      if (startDrag > endDrag) {
        // Swiped left
        nextSlide();
      } else if (startDrag < endDrag) {
        // Swiped right
        previousSlide();
      }
      // Reset drag states
      setStartDrag(0);
      setEndDrag(0);
    }
  }, [startDrag, endDrag, nextSlide, previousSlide]);

  return (
    <div className="  select-all flex items-center h-full px-2 lg:px-0  gap-2 sm:gap-10 ">
      {/* Left Arrow */}
      <CarouselButton swipFun={previousSlide}>{"<"}</CarouselButton>

      <div className=" relative overflow-hidden    w-full h-[300px] sm:h-[500px] flex-grow">
        {images.map((image, index) => (
          <Slider
            dragStart={dragStart}
            dragEnd={dragEnd}
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
