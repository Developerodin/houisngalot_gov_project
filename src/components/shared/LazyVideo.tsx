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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setShouldLoad(true);
            // Auto-play when in view
            if (video.paused) {
              video.play().catch(() => {
                // Ignore autoplay errors
              });
            }
          } else {
            setIsInView(false);
            // Pause when out of view to save resources
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      {
        threshold: 0.25, // Start loading when 25% visible
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={className}>
      {shouldLoad ? (
        <video
          ref={videoRef}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload="metadata"
          className="w-full h-auto"
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading video...</div>
        </div>
      )}
    </div>
  );
}
