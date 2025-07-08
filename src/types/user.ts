export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}
export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole.CUSTOMER;
  phone: string;
  gender: GENDER;
  firstname: string;
  lastname: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}
