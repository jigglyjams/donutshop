import Image from "next/image";
import { useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";

const angles = ["front", "right-front", "right-side", "back", "left-side", "left-front"] as const;
const variantNames = {
  navy: "navy",
  gray: "dark-grey",
  stone: "stone",
} as const;

export type VariantName = keyof typeof variantNames;

export const getImageName = (variant: VariantName, angle: typeof angles[number]) => {
  return `/images/mockups/${variant}/classic-dad-hat-${variantNames[variant]}-${angle}.jpg`;
}

const getImages = (variant: VariantName) => {
  return angles.map((angle) => 
    getImageName(variant, angle)
  );
}

export default function ProductImages({ variant }: { variant: VariantName }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = getImages(variant);
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-md mx-auto flex items-center">
      <button
        onClick={prevImage}
        className="mr-4 bg-white hover:bg-gray-100 rounded-full p-2"
        aria-label="Previous image"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <div className="flex-grow">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            width={400}
            height={400}
            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-gray-500' : 'bg-white'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <button
        onClick={nextImage}
        className="ml-4 bg-white hover:bg-gray-100 rounded-full p-2"
        aria-label="Next image"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}