import mongoose from 'mongoose';

export interface MailOptions {
  to: string;
  token: mongoose.Types.ObjectId;
}
