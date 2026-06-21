import React from 'react';
import { Certificate } from '@/types/certificate';
import { CertificateRow } from './CertificateRow';

interface CertificateTableProps {
  certificates: Certificate[];
}

export const CertificateTable: React.FC<CertificateTableProps> = ({ certificates }) => {
  return (
    <div className="divide-y divide-gray-100 bg-white border border-gray-200 rounded-sm shadow-sm">
      {certificates.map((cert) => (
        <CertificateRow key={cert.id} certificate={cert} />
      ))}
    </div>
  );
};
