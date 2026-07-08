export interface Prescription {
  id: string
  patientId: string
  prescribedByDoctorId: string
  drugName: string
  dosage: string
  frequency: string
  durationDays: number
  refillsRemaining: number
  instructions?: string
  status: 'active' | 'expired' | 'cancelled'
  prescribedAt: string
  expiresAt: string
}
