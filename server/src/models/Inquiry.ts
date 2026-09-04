import { Schema, model, Document } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  email: string;
  service: string;
  budget: string;
  details: string;
  createdAt: Date;
  updatedAt: Date;
}

const inquirySchema = new Schema<IInquiry>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    service: {
      type: String,
      required: true,
      default: 'UI/UX Design',
    },
    budget: {
      type: String,
      required: true,
      default: '$15k - $30k',
    },
    details: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Inquiry = model<IInquiry>('Inquiry', inquirySchema);
