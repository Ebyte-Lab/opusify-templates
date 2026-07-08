export interface LabOrder {
  id: string
  patientId: string
  orderedByDoctorId: string
  testName: string
  testCode: string
  priority: 'routine' | 'urgent' | 'stat'
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  orderedAt: string
  completedAt?: string
  result?: LabResult
}

export interface LabResult {
  value: string
  unit: string
  referenceRange: string
  interpretation: 'normal' | 'abnormal' | 'critical'
  notes?: string
}
