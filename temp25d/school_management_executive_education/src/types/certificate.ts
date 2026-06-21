export interface Certificate {
  id: string;
  title: string;
  issuedOn: string;
  credentialId: string;
}

export interface CertificationTrack {
  id: string;
  title: string;
  moduleProgressLabel: string;
  percentComplete: number;
}
