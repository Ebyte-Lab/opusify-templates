import { useState, useEffect, useCallback } from 'react';
import type { GalleryImage } from '../types';

export const useLightbox = (images: GalleryImage[]) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(false);

  const open = useCallback((src: string, _alt: string) => {
    const index = images.findIndex((img) => img.src === src);
    setCurrentIndex(index);
    setIsLoading(true);
    setIsOpen(true);
  }, [images]);

  const close = useCallback(() => {
    setIsOpen(false);
    setCurrentIndex(-1);
    setIsLoading(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const next = useCallback(() => {
    if (images.length === 0) return;
    setIsLoading(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    if (images.length === 0) return;
    setIsLoading(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const currentSrc = currentIndex >= 0 && currentIndex < images.length ? images[currentIndex].src : null;
  const currentAlt = currentIndex >= 0 && currentIndex < images.length ? images[currentIndex].alt : null;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      } else if (e.key === 'ArrowRight') {
        next();
      } else if (e.key === 'ArrowLeft') {
        prev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close, next, prev]);

  return {
    isOpen,
    currentSrc,
    currentAlt,
    isLoading,
    open,
    close,
    handleImageLoad,
    next,
    prev
  };
};
export type UseLightboxReturn = ReturnType<typeof useLightbox>;
