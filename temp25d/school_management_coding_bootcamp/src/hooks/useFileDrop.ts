import { useState, useCallback } from 'react';
import type { DragEvent, ChangeEvent } from 'react';

interface UseFileDropOptions {
  onFileDrop?: (file: File) => void;
}

export function useFileDrop(options?: UseFileDropOptions) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      if (options?.onFileDrop) {
        options.onFileDrop(droppedFile);
      }
    }
  }, [options]);

  const handleFileInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (options?.onFileDrop) {
        options.onFileDrop(selectedFile);
      }
    }
  }, [options]);

  const reset = useCallback(() => {
    setFile(null);
  }, []);

  const getRootProps = useCallback(() => ({
    onDragEnter: handleDragEnter,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
  }), [handleDragEnter, handleDragOver, handleDragLeave, handleDrop]);

  return {
    isDragActive,
    file,
    getRootProps,
    handleFileInputChange,
    reset,
    setFile,
  };
}
export type UseFileDropReturn = ReturnType<typeof useFileDrop>;
