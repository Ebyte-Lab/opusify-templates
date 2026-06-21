import React from 'react';
import { Certificate } from '@/types/certificate';
import { useToast } from '@/hooks/useToast';
import { Download, Share2, Award } from 'lucide-react';

interface CertificateRowProps {
  certificate: Certificate;
}

export const CertificateRow: React.FC<CertificateRowProps> = ({ certificate }) => {
  const { addToast } = useToast();

  const handleDownload = () => {
    addToast(`Downloading certificate PDF for "${certificate.title}"...`, 'info');
  };

  const handleShare = () => {
    addToast(`Credential share link copied to clipboard for "${certificate.title}"`, 'success');
  };

  return (
    <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-blue-50 text-primary rounded-sm mt-0.5">
          <Award size={20} />
        </div>
        <div>
          <h4 className="font-bold text-text text-sm sm:text-base leading-tight mb-1">
            {certificate.title}
          </h4>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text/60">
            <span>Issued on: <strong className="text-text/80">{certificate.issuedOn}</strong></span>
            <span>ID: <code className="bg-gray-100 px-1 py-0.5 rounded text-[10px] text-text font-mono">{certificate.credentialId}</code></span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
        <button
          onClick={handleDownload}
          className="flex-1 sm:flex-none px-3 py-1.5 border border-gray-200 text-text/70 hover:text-text hover:bg-gray-50 text-xs font-semibold rounded-sm transition-colors flex items-center justify-center gap-1.5 focus:outline-none"
        >
          <Download size={14} />
          <span>Download</span>
        </button>
        <button
          onClick={handleShare}
          className="flex-1 sm:flex-none px-3 py-1.5 bg-secondary text-primary hover:bg-primary hover:text-white text-xs font-semibold rounded-sm transition-colors flex items-center justify-center gap-1.5 focus:outline-none"
        >
          <Share2 size={14} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};
