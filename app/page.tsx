import Carousel from "@/components/Carousel";
// Images
import image1 from "@/public/image1.webp";
import image2 from "@/public/image2.webp";
import image3 from "@/public/image4.jpg";
import Image from "next/image";

const images = [image1, image2, image3];
export default function Home() {
  return (
    <div className="max-w-5xl  h-screen  overflow-hidden  mx-auto">
      <Carousel>
        <Image
          src={image1}
          alt="Image 1"
          layout="fill"
          objectFit="cover"
        />
        <div className="h-full flex items-center justify-center text-xl">
          This is some text content for slide 2.
        </div>
        <Image
          src={image2}
          alt="Image 2"
          layout="fill"
          objectFit="cover"
        />
        <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Card Content</h2>
          <p>This is a card displayed in the carousel.</p>
        </div>
        <Image
          src={image3}
          alt="Image 3"
          layout="fill"
          objectFit="cover"
        />
      </Carousel>
    </div>
  );
}
