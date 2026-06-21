export interface Webinar {
  id: string;
  title: string;
  tag: 'Live Broadcast' | 'Panel Discussion' | string;
  dateTimeLabel: string;
  thumbnailUrl: string;
  speakerName: string;
  speakerTitle: string;
  speakerAvatarUrl: string;
}
