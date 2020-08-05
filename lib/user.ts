import { Schema, model } from 'mongoose';

export const userSchema = new Schema({
  exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
  username: { type: String, required: true },
});

export let User;
try {
  User = model('User', userSchema);
} catch (e) {
  User = model('User');
}
