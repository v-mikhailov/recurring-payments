import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  login: string;
  password: string;
  email?: string;
  createdAt: Date;
}

const userShema = new Schema<IUser>({
  login: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minLength: 4
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  email:{
    type: String,
    trim: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

userShema.index({ email: 1 }, { 
  unique: true, 
  partialFilterExpression: { email: { $exists: true, $ne: null } }
});

export const UserModel = mongoose.model<IUser>('User', userShema);