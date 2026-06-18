import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Download, Award, AlertCircle } from 'lucide-react';
import { GradeRecord } from '../../../types/grades';

interface ReportCardPanelProps {
  records: GradeRecord[];
  termName: string;
}

export const ReportCardPanel: React.FC<ReportCardPanelProps> = ({ records, termName }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Calculate overall percentage average
  const averagePercentage = records.length
    ? Math.round(records.reduce((acc, r) => acc + r.percentage, 0) / records.length)
    : 0;

  const getOverallLetter = (avg: number) => {
    if (avg >= 97) return 'A+';
    if (avg >= 93) return 'A';
    if (avg >= 90) return 'A-';
    if (avg >= 87) return 'B+';
    if (avg >= 83) return 'B';
    if (avg >= 80) return 'B-';
    return 'C';
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1200);
  };

  return (
    <Card className="bg-gradient-to-br from-purple-900 to-purple-800 text-white border-0 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Decorative backing stars */}
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
        <Award size={200} />
      </div>

      <div className="relative z-10">
        <span className="font-heading font-bold text-xs uppercase tracking-wider text-purple-200 bg-white/10 px-3.5 py-1.5 rounded-full inline-block border border-white/15 mb-6">
          Academic Overview
        </span>

        <h3 className="font-heading text-2xl text-purple-100 mb-1">
          {termName} Summary
        </h3>
        <p className="text-sm text-purple-200/80 mb-6 font-semibold">
          Aggregated performance across {records.length} courses
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col justify-center">
            <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider mb-1">Average</span>
            <span className="font-heading font-bold text-3xl text-white">{averagePercentage}%</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col justify-center">
            <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider mb-1">GPA Grade</span>
            <span className="font-heading font-bold text-3xl text-primary">{getOverallLetter(averagePercentage)}</span>
          </div>
        </div>

        <div className="flex gap-2 items-center text-xs text-purple-200/90 font-semibold mb-6 bg-white/5 border border-white/5 rounded-xl p-3">
          <AlertCircle size={16} className="text-primary shrink-0" />
          <p>This report includes class work, midterms, and project grades.</p>
        </div>
      </div>

      <div className="relative z-10 pt-4 border-t border-white/10">
        <Button
          variant="chunky"
          onClick={handleDownload}
          disabled={downloading}
          className="w-full text-sm bg-primary hover:bg-yellow-400 text-text py-3"
        >
          <Download size={16} strokeWidth={2.5} />
          {downloading ? 'Preparing PDF...' : 'Download Report Card'}
        </Button>

        {downloadSuccess && (
          <div className="text-center text-xs font-bold text-green-300 mt-3 animate-pulse">
            ✓ Report Card PDF downloaded successfully (Demo)
          </div>
        )}
      </div>
    </Card>
  );
};
export default ReportCardPanel;
