export enum Status {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}
export interface Blog {
  id: string;
  title: string;
  content: string;
  slug: string;
  tag: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}
