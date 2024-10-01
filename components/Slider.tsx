import React, { ReactNode } from "react";

interface ImageType {
  slideIndex: number;
  children: ReactNode;
  currentSlide: number;
  touchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
  touchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
}
const Slider = ({
  currentSlide,
  slideIndex,
  children,
  touchEnd,
  touchStart,
}: ImageType) => {
  const isActive = slideIndex === currentSlide;
  return (
    <div
      onTouchStart={touchStart}
      onTouchEnd={touchEnd}
      className={`     active:cursor-grabbing cursor-grab      w-full h-full absolute transition-transform ease-in-out duration-1000 ${
        slideIndex === currentSlide
          ? "translate-x-0 z-0" //Selected Slide
          : " -translate-x-[100vw]  -z-10" //Not Selected Slide
      }`}
      role="tabpanel"
      aria-hidden={!isActive}
      aria-labelledby={`carousel-slide-${slideIndex}`}
      tabIndex={isActive ? 0 : -1}
      key={slideIndex}>
      {children}
    </div>
  );
};

export default Slider;
