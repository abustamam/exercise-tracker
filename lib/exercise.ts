import { Schema, model } from 'mongoose';

export const exerciseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date },
});

export let Exercise;
try {
  Exercise = model('Exercise', exerciseSchema);
} catch (e) {
  Exercise = model('Exercise');
}
