import mongoose from 'mongoose'
const itemSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        default: '',
      },
      status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
      },
      dueDate: {
        type: Date,
      },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // references your userModel
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  export const createItemSchema = mongoose.model('Item', itemSchema);