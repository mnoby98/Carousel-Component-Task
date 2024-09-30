import Carousel from "@/components/Carousel";
// Images
import image1 from "@/public/image1.webp";
import image2 from "@/public/image2.webp";
import image3 from "@/public/image4.jpg";

const images = [image1, image2, image3];
export default function Home() {
  return (
    <div className="max-w-5xl  h-screen  overflow-hidden  mx-auto">
      <Carousel images={images} />
    </div>
  );
}
