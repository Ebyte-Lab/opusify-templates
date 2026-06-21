import React from 'react';
import { ReportItem } from '../../types/report';
import { Download, Clock, FileText, Loader2 } from 'lucide-react';
import clsx from 'clsx';

interface ReportListItemProps {
  report: ReportItem;
  onDownload: (id: string) => void;
}

export const ReportListItem: React.FC<ReportListItemProps> = ({ report, onDownload }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-gray-900/30 border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-gray-800 shrink-0 text-text/60">
          <FileText className="w-5 h-5" />
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-white">{report.title}</h4>
          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10px] font-mono">
            <span className="px-2 py-0.5 rounded bg-gray-800 text-text/50 uppercase tracking-wide">
              {report.type}
            </span>
            <span className="text-text/45">•</span>
            <span className="text-text/45">{report.periodLabel}</span>
            {report.generatedOn && (
              <>
                <span className="text-text/45">•</span>
                <span className="text-text/40">Gen: {report.generatedOn}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
        {/* Status indicator */}
        <span className={clsx(
          "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border font-mono uppercase",
          report.status === 'ready' && 'bg-primary/10 text-primary border-primary/20',
          report.status === 'processing' && 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          report.status === 'scheduled' && 'bg-gray-800 text-text/45 border-gray-700'
        )}>
          <span className={clsx(
            "w-1 h-1 rounded-full",
            report.status === 'ready' && 'bg-primary',
            report.status === 'processing' && 'bg-blue-400 animate-pulse',
            report.status === 'scheduled' && 'bg-text/40'
          )}></span>
          {report.status}
        </span>

        {/* Action Button */}
        {report.status === 'ready' ? (
          <button
            onClick={() => onDownload(report.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-black font-semibold text-xs rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
        ) : report.status === 'processing' ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 text-text/40 text-xs rounded-lg cursor-not-allowed">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Clearing
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/40 text-text/30 text-xs rounded-lg cursor-not-allowed">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </div>
        )}
      </div>
    </div>
  );
};
