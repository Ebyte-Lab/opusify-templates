export interface StaffUser {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'admin' | 'doctor' | 'nurse' | 'receptionist'
  specialty?: string
  avatarUrl?: string
  status: 'active' | 'inactive'
  lastLogin?: string
}

export interface Clinic {
  id: string
  name: string
  address: string
  phone: string
  email: string
  specialty: string
  licenseNumber: string
  timezone: string
  logoUrl?: string
}

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderRole: string
  senderAvatar?: string
  content: string
  createdAt: string
  isRead: boolean
}

export interface Conversation {
  id: string
  participantId?: string // for DM
  participantName: string
  participantRole: string
  participantAvatar?: string
  isChannel: boolean     // e.g. general, cardiology channel
  channelName?: string
  messages: Message[]
  unreadCount: number
}

export interface SystemNotification {
  id: string
  type: 'critical' | 'lab' | 'appointment' | 'message' | 'system'
  title: string
  content: string
  timestamp: string
  isRead: boolean
  link?: string
}
