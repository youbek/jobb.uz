import { Document, model, Model, Schema, Types } from "mongoose";

export interface IJobAddress {
  name: string;
  lat: number;
  long: number;
  district: string;
}

export interface IJobSchema {
  _id: Types.ObjectId;
  hashId: Types.ObjectId;
  title: string;
  category: string;
  address: IJobAddress;
  companyName: string;
  description: string;
  date: number;
  link: string;
  contactPhone: string;
  state?: string;
  noExperiene?: boolean;
  salaryFrom?: number;
  salaryTo?: number;
  salaryCurrency?: string;
  partTime?: boolean;
}

export const JobSchema = new Schema({
  hashId: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  address: { type: String, required: true },
  companyName: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Number, required: true },
  link: { type: String, required: true },
  contactPhone: { type: String, required: false },
  state: { type: String, required: false },
  noExperiene: { type: Boolean, required: false },
  salaryFrom: { type: Boolean, required: false },
  salaryTo: { type: Boolean, required: false },
  salaryCurrency: { type: Boolean, required: false },
  partTime: { type: Boolean, required: false },
});

export interface IJobDocument extends IJobSchema, Document {
  _id: Types.ObjectId;
}

type IJobModel = Model<IJobDocument>;

export const JobModel: IJobModel = model<IJobDocument>("job", JobSchema);
