export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  type: 'new_patient' | 'follow_up' | 'urgent' | 'procedure' | 'telehealth'
  status: 'scheduled' | 'confirmed' | 'checked_in' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'
  scheduledAt: string
  durationMinutes: number
  notes?: string
  consultationNotes?: SOAPNote
  createdAt: string
}

export interface SOAPNote {
  subjective: string
  objective: string
  assessment: string
  plan: string
  authorId: string
  createdAt: string
}
