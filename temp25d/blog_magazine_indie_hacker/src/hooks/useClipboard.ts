import { useCallback } from 'react';
import { useToast } from '../context/ToastContext';

export const useClipboard = () => {
  const { addToast } = useToast();

  const copy = useCallback((text: string, successMessage: string = "Code block copied to clipboard.") => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          addToast(successMessage);
        })
        .catch((err) => {
          console.error("Clipboard API failed, using fallback: ", err);
          fallbackCopy(text, successMessage);
        });
    } else {
      fallbackCopy(text, successMessage);
    }
  }, [addToast]);

  const fallbackCopy = (text: string, successMessage: string) => {
    try {
      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = text;
      tempTextArea.style.position = 'fixed';
      tempTextArea.style.left = '-9999px';
      tempTextArea.style.top = '0px';
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(tempTextArea);
      
      if (successful) {
        addToast(successMessage);
      } else {
        addToast("Failed to copy code.");
      }
    } catch (err) {
      console.error("Fallback copy failed: ", err);
      addToast("Failed to copy code.");
    }
  };

  return copy;
};
