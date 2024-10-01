"use client";
import React, {
  Children,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import CarouselButton from "@/components/CarouselButton";
import Slider from "./Slider";

interface children {
  children: ReactNode;
}

const Carousel = ({ children }: children) => {
  const [currentSlide, setCurrentSlide] = useState(0); //The current  slide
  const [startTouch, setStartTouch] = useState(0); //Start point when start touch
  const [endTouch, setEndTouch] = useState(0); //Start point when end  touch

  // Select next image
  const nextSlide = useCallback(() => {
    if (currentSlide >= Children.count(children) - 1) return;
    setCurrentSlide((currentSlide) => currentSlide + 1);
  }, [children, currentSlide]);

  // Select previse Image
  const previousSlide = useCallback(() => {
    if (currentSlide <= 0) return;
    setCurrentSlide((currentSlide) => currentSlide - 1);
  }, [currentSlide]);

  // Select with bullets
  const selectImage = (index: number) => {
    setCurrentSlide(index);
  };

  //Calculate  the  Start point
  const touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartTouch(e.touches[0].clientX);
  };

  //Calculate  the  End point
  const touchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setEndTouch(e.changedTouches[0].clientX);
  };

  // Swipe	between	slides	on	touch
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
      className="  flex items-center h-full px-2 lg:px-0  gap-2 sm:gap-10 ">
      {/* Left Arrow */}
      <CarouselButton
        swipFun={previousSlide}
        aria-label="Previous Slide">
        {"<"}
      </CarouselButton>

      <div className=" relative overflow-hidden    w-full h-[300px] sm:h-[500px] flex-grow">
        {Children.map(children, (child, index) => (
          <Slider
            touchStart={touchStart}
            touchEnd={touchEnd}
            key={index}
            slideIndex={index}
            currentSlide={currentSlide}
            aria-hidden={currentSlide !== index}
            aria-label={`Slide ${index + 1} of ${Children.count(children)}`}>
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
              onClick={() => selectImage(index)} // Select Slide from  bullet
              key={index}
              className={`w-3 h-3 rounded-full border ${
                index === currentSlide ? "bg-blue-400" : "bg-gray-300"
              }`}
              aria-label={`Select image ${index + 1}`}
              aria-controls={`slide-${index}`}
              aria-selected={index === currentSlide}
              role="tab"
              tabIndex={index === currentSlide ? 0 : -1}
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
