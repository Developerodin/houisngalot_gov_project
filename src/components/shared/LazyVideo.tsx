'use client';

import { useEffect, useRef, useState } from 'react';

interface LazyVideoProps {
  src: string;
  className?: string;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

export default function LazyVideo({ 
  src, 
  className = '', 
  loop = true, 
  muted = true, 
  playsInline = true 
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            // Auto-play when in view
            setTimeout(() => {
              const video = videoRef.current;
              if (video && video.paused) {
                video.play().catch(() => {
                  // Ignore autoplay errors
                });
              }
            }, 100);
          } else {
            // Pause when out of view to save resources
            const video = videoRef.current;
            if (video && !video.paused) {
              video.pause();
            }
          }
        });
      },
      {
        threshold: 0.1, // Start loading when 10% visible
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
        <video
          ref={videoRef}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload="metadata"
          autoPlay
          className="w-full h-auto"
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center min-h-[200px]">
          <div className="text-gray-400 text-sm">Loading video...</div>
        </div>
      )}
    </div>
  );
}
