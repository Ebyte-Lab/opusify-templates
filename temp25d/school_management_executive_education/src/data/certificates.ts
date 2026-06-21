import { Certificate, CertificationTrack } from '../types/certificate';

export const certificatesMockData: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Corporate Governance & Board Strategy',
    issuedOn: 'May 12, 2025',
    credentialId: 'CD-CGBS-90218'
  },
  {
    id: 'cert-2',
    title: 'Digital Transformation Strategy',
    issuedOn: 'Feb 20, 2026',
    credentialId: 'CD-DTS-45601'
  },
  {
    id: 'cert-3',
    title: 'Macroeconomics & Global Finance',
    issuedOn: 'Nov 18, 2024',
    credentialId: 'CD-MGF-10923'
  }
];

export const certificationTracksMockData: CertificationTrack[] = [
  {
    id: 'track-1',
    title: 'Executive Leadership Program',
    moduleProgressLabel: 'Module 4 of 6: Change Management',
    percentComplete: 65
  },
  {
    id: 'track-2',
    title: 'Strategic Financial Analysis',
    moduleProgressLabel: 'Module 2 of 4: M&A Valuation',
    percentComplete: 30
  }
];
