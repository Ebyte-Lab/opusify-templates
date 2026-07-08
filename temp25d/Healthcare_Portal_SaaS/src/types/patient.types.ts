export interface Patient {
  id: string
  mrn: string              // Medical Record Number (fictional format: MRN-00001)
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'non-binary' | 'prefer_not_to_say'
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  phone: string
  email: string
  address: string
  primaryDoctorId: string
  status: 'active' | 'inactive' | 'discharged'
  allergies: string[]
  conditions: MedicalCondition[]
  insuranceProvider?: string
  insurancePolicyNumber?: string
  createdAt: string
  lastVisit?: string
}

export interface MedicalCondition {
  name: string
  icdCode: string
  onsetDate: string
  status: 'active' | 'resolved' | 'chronic'
}

export interface VitalSign {
  recordedAt: string
  systolicBP: number
  diastolicBP: number
  heartRate: number
  temperature: number
  weightKg: number
  oxygenSaturation: number
  recordedBy: string
}
