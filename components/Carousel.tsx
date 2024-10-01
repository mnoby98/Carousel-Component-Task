"use client";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import CarouselButton from "@/components/CarouselButton";
import Slider from "./Slider";

interface children {
  children: ReactNode;
}
const Carousel = ({ children }: children) => {
  // Current Image
  const [currentImage, setCurrentImage] = useState(0);
  const [startTouch, setStartTouch] = useState(0);
  const [endTouch, setEndTouch] = useState(0);

  console.log("children", React.Children);

  // Select next image
  const nextSlide = useCallback(() => {
    if (currentImage >= React.Children.count(children) - 1) return;
    setCurrentImage((currentImage) => currentImage + 1);
  }, [children, currentImage]);

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
    <div
      // Accessible	to	users	with	disabilities
      aria-label="Carousel"
      role="region"
      aria-live="polite" // Announce slide changes.
      className="  select-all flex items-center h-full px-2 lg:px-0  gap-2 sm:gap-10 ">
      {/* Left Arrow */}
      <CarouselButton
        swipFun={previousSlide}
        aria-label="Previous Slide">
        {"<"}
      </CarouselButton>

      <div className=" relative overflow-hidden    w-full h-[300px] sm:h-[500px] flex-grow">
        {React.Children.map(children, (child, index) => (
          <Slider
            touchStart={touchStart}
            touchEnd={touchEnd}
            key={index}
            imageId={index}
            currentImage={currentImage}
            aria-hidden={currentImage !== index}
            aria-label={`Slide ${index + 1} of ${React.Children.count(
              children
            )}`}>
            {child}
          </Slider>
        ))}

        {/* Bullets */}
        <div
          role="group"
          aria-label="Navigation Dots"
          className=" w-full flex items-center justify-center gap-5  absolute   bottom-5 z-30">
          {React.Children.map(children, (_, index) => (
            <button
              onClick={() => selectImage(index)}
              key={index}
              className={`w-3 h-3 rounded-full border ${
                index === currentImage ? "bg-blue-400" : "bg-gray-300"
              }`}
              aria-label={`Select image ${index + 1}`}
              aria-controls={`slide-${index}`}
              aria-selected={index === currentImage}
              role="tab"
              tabIndex={index === currentImage ? 0 : -1}
            />
          ))}
        </div>
      </div>
      {/* Right Arrows */}
      <CarouselButton
        swipFun={nextSlide}
        aria-label="Next Slide">
        {">"}
      </CarouselButton>
    </div>
  );
};

export default Carousel;
