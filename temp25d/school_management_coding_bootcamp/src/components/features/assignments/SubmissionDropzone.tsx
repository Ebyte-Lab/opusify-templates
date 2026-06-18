import React, { useState, useRef } from 'react';
import { useFileDrop } from '../../../hooks/useFileDrop';
import { Upload, Check, Loader2, RefreshCw } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Button } from '../../ui/Button';

export const SubmissionDropzone: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<'idle' | 'ready' | 'uploading' | 'submitted'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [isGitHub, setIsGitHub] = useState(false);

  const { isDragActive, file, getRootProps, handleFileInputChange, reset } = useFileDrop({
    onFileDrop: (droppedFile) => {
      setFileName(droppedFile.name);
      setIsGitHub(false);
      setStatus('ready');
    },
  });

  const handleContainerClick = () => {
    if (status === 'idle') {
      fileInputRef.current?.click();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (status === 'idle' && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  const startSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStatus('uploading');
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('submitted');
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    reset();
    setFileName('');
    setIsGitHub(false);
    setStatus('idle');
    setUploadProgress(0);
  };

  const handleConnectGitHub = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStatus('uploading');
    setUploadProgress(0);
    setIsGitHub(true);
    setFileName('github:opus-camp/e-commerce-api-alex');

    // Simulate GitHub fetch/auth sequence
    let prog = 0;
    const interval = setInterval(() => {
      prog += 20;
      setUploadProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        setStatus('ready');
      }
    }, 150);
  };

  return (
    <div>
      <h2 className="font-heading text-lg font-bold text-white mb-3">Submit Project</h2>
      <div
        {...getRootProps()}
        onClick={handleContainerClick}
        onKeyDown={handleKeyDown}
        tabIndex={status === 'idle' ? 0 : -1}
        role="button"
        aria-label="Upload project submission. Press space or enter to browse files."
        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary ${
          isDragActive
            ? 'border-primary bg-primary/10'
            : 'border-secondary bg-secondary/10 hover:bg-secondary/20 hover:border-primary/50'
        } ${status === 'idle' ? 'cursor-pointer' : 'cursor-default'}`}
      >
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            handleFileInputChange(e);
            if (e.target.files && e.target.files.length > 0) {
              setFileName(e.target.files[0].name);
              setIsGitHub(false);
              setStatus('ready');
            }
          }}
          className="sr-only"
          accept=".zip,.rar,.tar.gz"
        />

        {/* State 1: Idle */}
        {status === 'idle' && (
          <>
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4 text-text/50">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-white font-bold mb-1 font-heading">Upload Repository .zip</h3>
            <p className="text-xs text-text/50 mb-4 max-w-xs">
              Drag and drop your compressed project folder here, or click to browse files.
            </p>
            <div className="flex items-center gap-4 w-full max-w-xs select-none">
              <div className="h-px bg-secondary flex-1" />
              <span className="text-[10px] uppercase tracking-widest text-text/40 font-bold">OR</span>
              <div className="h-px bg-secondary flex-1" />
            </div>
            <Button
              variant="github"
              className="mt-4 flex items-center gap-2"
              onClick={handleConnectGitHub}
            >
              <FaGithub className="w-4 h-4" />
              Connect GitHub Repo
            </Button>
          </>
        )}

        {/* State 2: Ready */}
        {status === 'ready' && fileName && (
          <>
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-500 border border-green-500/50">
              {isGitHub ? <FaGithub className="w-6 h-6" /> : <Check className="w-6 h-6" />}
            </div>
            <h3 className="text-white font-bold mb-1 font-heading truncate max-w-xs">{fileName}</h3>
            <p className="text-xs text-green-400 font-bold mb-4">
              {isGitHub ? 'GitHub repository connected' : 'File ready for upload'}
            </p>
            <div className="flex gap-3 mt-2">
              <Button variant="secondary" onClick={handleReset}>
                Cancel
              </Button>
              <Button variant="primary" onClick={startSubmit}>
                Submit Project
              </Button>
            </div>
          </>
        )}

        {/* State 3: Uploading */}
        {status === 'uploading' && (
          <div className="w-full max-w-xs py-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2 font-heading">
              {isGitHub && fileName.startsWith('github') ? 'Fetching Repository...' : 'Uploading Submission...'}
            </h3>
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden mb-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-150"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-text/60 font-mono">
              <span className="truncate max-w-[200px]">{fileName || (file ? file.name : 'processing')}</span>
              <span>{uploadProgress}%</span>
            </div>
          </div>
        )}

        {/* State 4: Submitted */}
        {status === 'submitted' && fileName && (
          <>
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]">
              <Check className="w-6 h-6" strokeWidth={3} />
            </div>
            <h3 className="text-white font-bold mb-1 font-heading truncate max-w-xs">{fileName}</h3>
            <p className="text-xs text-green-400 font-bold mb-1">Project Submitted Successfully!</p>
            <p className="text-[10px] text-text/40 mb-4 font-mono select-none">
              Submitted on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <Button
              variant="secondary"
              className="mt-2 flex items-center gap-1.5"
              onClick={handleReset}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Re-submit Project
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
