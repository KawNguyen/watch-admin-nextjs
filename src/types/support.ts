export interface Support {
  id: string;
  email: string;
  subject: string;
  message: string;
  response: string | null;
  status: StatusSupport;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
export enum StatusSupport {
  UN_CHECKED,
  CHECKED,
}
