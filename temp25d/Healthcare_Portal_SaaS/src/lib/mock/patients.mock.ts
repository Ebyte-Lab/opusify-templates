import { Patient, VitalSign } from '../../types/patient.types';

export const mockPatients: Patient[] = [
  {
    id: 'PAT-001',
    mrn: 'MRN-20001',
    firstName: 'Leo',
    lastName: 'Kiran',
    dateOfBirth: '1978-04-12',
    gender: 'male',
    bloodType: 'O+',
    phone: '555-014-9922',
    email: 'l.kiran@fictional.com',
    address: '142 Birch Ave, Metropolis, NY 10001',
    primaryDoctorId: 'DOC-002',
    status: 'active',
    allergies: ['Penicillin', 'Peanuts'],
    conditions: [
      { name: 'Hypertension', icdCode: 'I10', onsetDate: '2020-05-15', status: 'chronic' },
      { name: 'Hypercholesterolemia', icdCode: 'E78.0', onsetDate: '2021-08-20', status: 'chronic' }
    ],
    insuranceProvider: 'Blue Cross Blue Shield',
    insurancePolicyNumber: 'POL-9920148',
    createdAt: '2022-01-10T08:00:00Z',
    lastVisit: '2026-06-15'
  },
  {
    id: 'PAT-002',
    mrn: 'MRN-20002',
    firstName: 'Arthur',
    lastName: 'Pendragon',
    dateOfBirth: '1985-08-22',
    gender: 'male',
    bloodType: 'A+',
    phone: '555-014-1188',
    email: 'a.pendragon@fictional.com',
    address: '12 Camelot Lane, Glastonbury, CT 06033',
    primaryDoctorId: 'DOC-003',
    status: 'active',
    allergies: ['Sulfa Drugs'],
    conditions: [
      { name: 'Type 2 Diabetes Mellitus', icdCode: 'E11.9', onsetDate: '2023-11-01', status: 'active' }
    ],
    insuranceProvider: 'Aetna',
    insurancePolicyNumber: 'POL-1192803',
    createdAt: '2023-11-01T10:00:00Z',
    lastVisit: '2026-07-07'
  },
  {
    id: 'PAT-003',
    mrn: 'MRN-20003',
    firstName: 'Guinevere',
    lastName: 'Du Lac',
    dateOfBirth: '1990-11-05',
    gender: 'female',
    bloodType: 'AB-',
    phone: '555-014-2299',
    email: 'g.dulac@fictional.com',
    address: '78 Avalon Blvd, Avalon, CA 90704',
    primaryDoctorId: 'DOC-002',
    status: 'active',
    allergies: [],
    conditions: [
      { name: 'Mitral Valve Prolapse', icdCode: 'I34.1', onsetDate: '2024-03-12', status: 'active' }
    ],
    insuranceProvider: 'UnitedHealthcare',
    insurancePolicyNumber: 'POL-8829102',
    createdAt: '2024-03-12T14:30:00Z',
    lastVisit: '2026-07-08'
  },
  {
    id: 'PAT-004',
    mrn: 'MRN-20004',
    firstName: 'Lancelot',
    lastName: 'Knight',
    dateOfBirth: '1982-01-30',
    gender: 'male',
    bloodType: 'O-',
    phone: '555-014-3344',
    email: 'l.knight@fictional.com',
    address: '89 Shield Road, Toledo, OH 43601',
    primaryDoctorId: 'DOC-007',
    status: 'active',
    allergies: ['Aspirin'],
    conditions: [
      { name: 'Osteoarthritis of Knee', icdCode: 'M17.11', onsetDate: '2025-01-20', status: 'active' }
    ],
    insuranceProvider: 'Cigna',
    insurancePolicyNumber: 'POL-4428190',
    createdAt: '2025-01-20T09:15:00Z',
    lastVisit: '2026-07-08'
  },
  {
    id: 'PAT-005',
    mrn: 'MRN-20005',
    firstName: 'Helena',
    lastName: 'Troy',
    dateOfBirth: '1995-05-18',
    gender: 'female',
    bloodType: 'B+',
    phone: '555-014-5566',
    email: 'h.troy@fictional.com',
    address: '300 Spartan Way, Athens, GA 30601',
    primaryDoctorId: 'DOC-005',
    status: 'active',
    allergies: ['Shellfish'],
    conditions: [
      { name: 'Asthma', icdCode: 'J45.909', onsetDate: '2005-06-10', status: 'chronic' }
    ],
    insuranceProvider: 'Humana',
    insurancePolicyNumber: 'POL-7718290',
    createdAt: '2024-05-10T11:00:00Z',
    lastVisit: '2026-06-28'
  },
  {
    id: 'PAT-006',
    mrn: 'MRN-20006',
    firstName: 'Leo',
    lastName: 'Tolstoy',
    dateOfBirth: '1948-09-09',
    gender: 'male',
    bloodType: 'A-',
    phone: '555-014-7788',
    email: 'l.tolstoy@fictional.com',
    address: '88 Yasnaya Rd, Tula, TX 75001',
    primaryDoctorId: 'DOC-006',
    status: 'inactive',
    allergies: ['Lactose'],
    conditions: [
      { name: 'Chronic Kidney Disease Stage 3', icdCode: 'N18.3', onsetDate: '2019-12-05', status: 'chronic' },
      { name: 'Gout', icdCode: 'M1A.00', onsetDate: '2015-04-12', status: 'chronic' }
    ],
    insuranceProvider: 'Medicare',
    insurancePolicyNumber: 'POL-MED88219',
    createdAt: '2019-12-05T08:30:00Z',
    lastVisit: '2025-11-20'
  },
  {
    id: 'PAT-007',
    mrn: 'MRN-20007',
    firstName: 'Jane',
    lastName: 'Austen',
    dateOfBirth: '1975-12-16',
    gender: 'female',
    bloodType: 'O+',
    phone: '555-014-6622',
    email: 'j.austen@fictional.com',
    address: '44 Steventon lane, Chawton, Hampshire, IL 60101',
    primaryDoctorId: 'DOC-003',
    status: 'active',
    allergies: [],
    conditions: [
      { name: 'Gastroesophageal Reflux Disease', icdCode: 'K21.9', onsetDate: '2022-03-10', status: 'active' }
    ],
    insuranceProvider: 'Blue Cross Blue Shield',
    insurancePolicyNumber: 'POL-3329108',
    createdAt: '2022-03-10T10:00:00Z',
    lastVisit: '2026-07-02'
  },
  {
    id: 'PAT-008',
    mrn: 'MRN-20008',
    firstName: 'Victor',
    lastName: 'Hugo',
    dateOfBirth: '1952-02-26',
    gender: 'male',
    bloodType: 'B-',
    phone: '555-014-4411',
    email: 'v.hugo@fictional.com',
    address: '106 Rue de L\'Empire, Paris, TX 75460',
    primaryDoctorId: 'DOC-006',
    status: 'active',
    allergies: ['NSAIDs'],
    conditions: [
      { name: 'Parkinson\'s Disease', icdCode: 'G20', onsetDate: '2021-04-18', status: 'chronic' }
    ],
    insuranceProvider: 'Medicare',
    insurancePolicyNumber: 'POL-MED19283',
    createdAt: '2021-04-18T15:00:00Z',
    lastVisit: '2026-06-30'
  },
  {
    id: 'PAT-009',
    mrn: 'MRN-20009',
    firstName: 'Virginia',
    lastName: 'Woolf',
    dateOfBirth: '1982-01-25',
    gender: 'female',
    bloodType: 'AB+',
    phone: '555-014-9988',
    email: 'v.woolf@fictional.com',
    address: '22 Hyde Park Gate, London, MD 20814',
    primaryDoctorId: 'DOC-006',
    status: 'active',
    allergies: ['Sulfa'],
    conditions: [
      { name: 'Bipolar II Disorder', icdCode: 'F31.81', onsetDate: '2015-08-14', status: 'chronic' }
    ],
    insuranceProvider: 'Cigna',
    insurancePolicyNumber: 'POL-9920193',
    createdAt: '2016-01-05T09:00:00Z',
    lastVisit: '2026-07-05'
  },
  {
    id: 'PAT-010',
    mrn: 'MRN-20010',
    firstName: 'Franz',
    lastName: 'Kafka',
    dateOfBirth: '1983-07-03',
    gender: 'male',
    bloodType: 'A+',
    phone: '555-014-2244',
    email: 'f.kafka@fictional.com',
    address: '22 Castle Hill, Prague, NE 68001',
    primaryDoctorId: 'DOC-008',
    status: 'active',
    allergies: [],
    conditions: [
      { name: 'Hashimoto\'s Thyroiditis', icdCode: 'E06.3', onsetDate: '2023-02-14', status: 'chronic' }
    ],
    insuranceProvider: 'Aetna',
    insurancePolicyNumber: 'POL-8291038',
    createdAt: '2023-02-14T11:00:00Z',
    lastVisit: '2026-05-18'
  },
  {
    id: 'PAT-011',
    mrn: 'MRN-20011',
    firstName: 'Emily',
    lastName: 'Dickinson',
    dateOfBirth: '1970-12-10',
    gender: 'female',
    bloodType: 'O-',
    phone: '555-014-3311',
    email: 'e.dickinson@fictional.com',
    address: '280 Main St, Amherst, MA 01002',
    primaryDoctorId: 'DOC-003',
    status: 'discharged',
    allergies: ['Contrast Dye'],
    conditions: [
      { name: 'Seasonal Allergies', icdCode: 'J30.9', onsetDate: '1995-04-12', status: 'resolved' }
    ],
    insuranceProvider: 'UnitedHealthcare',
    insurancePolicyNumber: 'POL-8291823',
    createdAt: '2021-09-12T14:00:00Z',
    lastVisit: '2025-06-12'
  },
  {
    id: 'PAT-012',
    mrn: 'MRN-20012',
    firstName: 'Charles',
    lastName: 'Darwin',
    dateOfBirth: '1959-02-12',
    gender: 'male',
    bloodType: 'AB+',
    phone: '555-014-7733',
    email: 'c.darwin@fictional.com',
    address: 'Down House, Kent, OR 97001',
    primaryDoctorId: 'DOC-008',
    status: 'active',
    allergies: [],
    conditions: [
      { name: 'Type 2 Diabetes Mellitus', icdCode: 'E11.9', onsetDate: '2018-03-24', status: 'chronic' },
      { name: 'Hypertension', icdCode: 'I10', onsetDate: '2015-07-11', status: 'chronic' }
    ],
    insuranceProvider: 'Humana',
    insurancePolicyNumber: 'POL-3392810',
    createdAt: '2015-07-11T10:00:00Z',
    lastVisit: '2026-07-06'
  }
];

// Fictional vitals history record mapped by patient ID
export const mockVitalsHistory: Record<string, VitalSign[]> = {
  'PAT-001': [
    { recordedAt: '2026-03-10T09:00:00Z', systolicBP: 135, diastolicBP: 85, heartRate: 72, temperature: 98.4, weightKg: 82.5, oxygenSaturation: 98, recordedBy: 'DOC-002' },
    { recordedAt: '2026-04-15T09:30:00Z', systolicBP: 130, diastolicBP: 82, heartRate: 74, temperature: 98.6, weightKg: 81.8, oxygenSaturation: 99, recordedBy: 'DOC-002' },
    { recordedAt: '2026-05-15T09:15:00Z', systolicBP: 132, diastolicBP: 80, heartRate: 70, temperature: 98.2, weightKg: 81.2, oxygenSaturation: 97, recordedBy: 'DOC-002' },
    { recordedAt: '2026-06-15T10:00:00Z', systolicBP: 128, diastolicBP: 78, heartRate: 68, temperature: 98.4, weightKg: 80.5, oxygenSaturation: 98, recordedBy: 'DOC-002' }
  ],
  'PAT-002': [
    { recordedAt: '2026-04-02T10:00:00Z', systolicBP: 140, diastolicBP: 90, heartRate: 85, temperature: 98.8, weightKg: 95.0, oxygenSaturation: 96, recordedBy: 'DOC-003' },
    { recordedAt: '2026-05-04T10:15:00Z', systolicBP: 138, diastolicBP: 88, heartRate: 80, temperature: 98.5, weightKg: 93.5, oxygenSaturation: 97, recordedBy: 'DOC-003' },
    { recordedAt: '2026-06-08T09:45:00Z', systolicBP: 134, diastolicBP: 85, heartRate: 78, temperature: 98.7, weightKg: 92.0, oxygenSaturation: 98, recordedBy: 'DOC-003' },
    { recordedAt: '2026-07-07T11:00:00Z', systolicBP: 132, diastolicBP: 82, heartRate: 76, temperature: 98.6, weightKg: 91.2, oxygenSaturation: 99, recordedBy: 'DOC-003' }
  ],
  'PAT-003': [
    { recordedAt: '2026-04-12T14:00:00Z', systolicBP: 110, diastolicBP: 70, heartRate: 88, temperature: 98.6, weightKg: 62.0, oxygenSaturation: 99, recordedBy: 'DOC-002' },
    { recordedAt: '2026-05-18T14:15:00Z', systolicBP: 112, diastolicBP: 72, heartRate: 84, temperature: 98.4, weightKg: 61.8, oxygenSaturation: 99, recordedBy: 'DOC-002' },
    { recordedAt: '2026-06-10T14:30:00Z', systolicBP: 108, diastolicBP: 68, heartRate: 82, temperature: 98.5, weightKg: 61.2, oxygenSaturation: 98, recordedBy: 'DOC-002' },
    { recordedAt: '2026-07-08T09:12:00Z', systolicBP: 115, diastolicBP: 74, heartRate: 86, temperature: 98.2, weightKg: 60.5, oxygenSaturation: 99, recordedBy: 'DOC-002' }
  ],
  'PAT-004': [
    { recordedAt: '2026-05-02T11:00:00Z', systolicBP: 120, diastolicBP: 80, heartRate: 72, temperature: 98.1, weightKg: 88.0, oxygenSaturation: 98, recordedBy: 'DOC-007' },
    { recordedAt: '2026-06-02T11:30:00Z', systolicBP: 118, diastolicBP: 78, heartRate: 70, temperature: 98.3, weightKg: 87.5, oxygenSaturation: 98, recordedBy: 'DOC-007' },
    { recordedAt: '2026-07-08T14:00:00Z', systolicBP: 122, diastolicBP: 82, heartRate: 74, temperature: 98.4, weightKg: 87.0, oxygenSaturation: 99, recordedBy: 'DOC-007' }
  ],
  'PAT-012': [
    { recordedAt: '2026-03-01T10:00:00Z', systolicBP: 142, diastolicBP: 92, heartRate: 80, temperature: 98.2, weightKg: 78.5, oxygenSaturation: 96, recordedBy: 'DOC-008' },
    { recordedAt: '2026-05-01T10:30:00Z', systolicBP: 138, diastolicBP: 88, heartRate: 78, temperature: 98.4, weightKg: 77.8, oxygenSaturation: 97, recordedBy: 'DOC-008' },
    { recordedAt: '2026-07-06T09:00:00Z', systolicBP: 135, diastolicBP: 85, heartRate: 76, temperature: 98.3, weightKg: 77.0, oxygenSaturation: 97, recordedBy: 'DOC-008' }
  ]
};

// Return fallback values for patients who don't have detailed histories
export const getPatientVitals = (patientId: string): VitalSign[] => {
  if (mockVitalsHistory[patientId]) {
    return mockVitalsHistory[patientId];
  }
  // Fallback default vitals data
  return [
    {
      recordedAt: '2026-07-01T09:00:00Z',
      systolicBP: 120,
      diastolicBP: 80,
      heartRate: 72,
      temperature: 98.6,
      weightKg: 75.0,
      oxygenSaturation: 98,
      recordedBy: 'DOC-002'
    }
  ];
};
