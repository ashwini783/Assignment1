import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    default: null, // optional: helps track logout/token invalidation
  }
});

export const userModel = mongoose.model('User', userSchema);