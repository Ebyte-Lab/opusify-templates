export interface AttendanceRecord {
  date: string; // ISO format "YYYY-MM-DD"
  status: 'present' | 'absent' | 'tardy' | 'excused';
  note?: string;
}
