import { Document } from "mongoose";

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  mobile: string;
  gender: Gender;
  isAdmin: boolean;
  createdAt: Date;
  softDelete: boolean;
}
