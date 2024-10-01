import Carousel from "@/components/Carousel";
// Images
import image1 from "@/public/image1.webp";
import image2 from "@/public/image2.webp";
import image3 from "@/public/image4.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-5xl  h-screen  overflow-hidden  mx-auto">
      <Carousel>
        <Image
          src={image1}
          alt="Image 1"
          layout="fill"
          objectFit="cover"
          role="img"
          aria-label="Image 1: Beautiful landscape with mountains"
        />
        <div
          aria-label="Text slide"
          className="h-full flex items-center justify-center text-xl">
          This is some text content for slide 2.
        </div>
        <Image
          src={image2}
          alt="Image 2"
          layout="fill"
          objectFit="cover"
          role="img"
          aria-label="Image 2: Beautiful landscape with mountains"
        />
        <div
          role="group"
          aria-label="Card with heading and text"
          className="bg-gray-200 p-4 rounded-lg shadow-lg">
          <h2
            aria-label="Card header"
            className="text-lg font-bold">
            Card Content
          </h2>
          <p aria-label="Card content">
            This is a card displayed in the carousel.
          </p>
        </div>
        <Image
          src={image3}
          alt="Image 3"
          layout="fill"
          objectFit="cover"
          role="img"
          aria-label="Image 3: Beautiful landscape with mountains"
        />
      </Carousel>
    </div>
  );
}
