export interface Doctor {
  id: string
  firstName: string
  lastName: string
  specialty: string
  department: string
  licenseNumber: string
  yearsExperience: number
  phone: string
  email: string
  schedule: WeeklySchedule
  patientCount: number
  avatarUrl?: string
}

export interface WeeklySchedule {
  monday: DaySchedule | null
  tuesday: DaySchedule | null
  wednesday: DaySchedule | null
  thursday: DaySchedule | null
  friday: DaySchedule | null
  saturday: DaySchedule | null
  sunday: DaySchedule | null
}

export interface DaySchedule {
  startTime: string   // "08:00"
  endTime: string     // "17:00"
  slotDurationMinutes: number
}
