import mongoose from 'mongoose';

export interface MailOptions {
  to: string;
  subject: string;
  html?: string;
}

export interface ConfirmationMailOptions extends MailOptions {
  token: mongoose.Types.ObjectId;
}
