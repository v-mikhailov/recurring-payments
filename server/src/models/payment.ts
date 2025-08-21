import mongoose, { Schema, Document } from 'mongoose';

// пока делаем без userID

interface IPayment extends Document {
  title: string;
  amount: {
    value: number;
    currency: 'USD' | 'EUR' | 'RUB' | 'GBP' | 'ILS';
    frequency: 'day' | 'week' | 'month' | 'year';
  };
  paymentDate: Date;
  notes?: string;
}

const PaymentSchema = new Schema<IPayment>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    value: {type: Number, required: true},
    currency: {
      type: String,
      required: true,
      enum: ['USD', 'EUR', 'RUB', 'GBP', 'ILS'],
    },
    frequency: {
      type: String,
      required: true,
      enum: ['day', 'week', 'month', 'year'],
    },
  },
    paymentDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  notes: {
    type: String,
    trim: true,
  }
}, {
  toJSON: {
    transform(_doc: mongoose.Document, ret: any) {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  },
  toObject: {
    transform(_doc: mongoose.Document, ret: any) {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  }
})

export const PaymentModel = mongoose.model<IPayment>('Payment', PaymentSchema);
