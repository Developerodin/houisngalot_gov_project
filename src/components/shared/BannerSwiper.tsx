'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const banners = [
  {
    id: 1,
    src: '/assest/banner1.jpeg',
    alt: 'Rajasthan Government Banner 1',
  },
  {
    id: 2,
    src: '/assest/banner2.jpeg',
    alt: 'Rajasthan Government Banner 2',
  },
];

export default function BannerSwiper() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0])); // Preload first image

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % banners.length;
        // Preload next image
        setLoadedImages((prev) => new Set([...prev, nextIndex]));
        return nextIndex;
      });
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    // Preload adjacent images
    setLoadedImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(index);
      newSet.add((index + 1) % banners.length);
      newSet.add((index - 1 + banners.length) % banners.length);
      return newSet;
    });
  };

  return (
    <section className="w-full relative mb-6 overflow-hidden">
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {loadedImages.has(index) ? (
              <Image
                src={banner.src}
                alt={banner.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
            {/* Optional overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Optional: Navigation Arrows */}
      <button
        onClick={() => goToSlide((currentIndex - 1 + banners.length) % banners.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => goToSlide((currentIndex + 1) % banners.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
