export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'doc' | 'repo' | 'cheatsheet';
  url: string;
  description: string;
  category: string;
}
