import React from 'react';
import { ProgressTrack } from '../common/ProgressTrack';
import { certificationTracksMockData } from '@/data/certificates';

export const CertificationTrackList: React.FC = () => {
  return (
    <div className="space-y-8">
      {certificationTracksMockData.map((track) => (
        <ProgressTrack
          key={track.id}
          title={track.title}
          subtitle={track.moduleProgressLabel}
          percentComplete={track.percentComplete}
        />
      ))}
    </div>
  );
};
