// models/Expense.js

import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    amount: {
      type: Number,
      required: [true, 'Please provide an amount'],
      min: [0, 'Amount must be greater than 0']
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: {
        values: ['Food', 'Travel', 'Shopping', 'Transportation', 'Health', 'Education', 'Other'],
        message: 'Invalid category'
      }
    },
    date: {
      type: Date,
      required: [true, 'Please provide a date'],
      default: Date.now
    },
    note: {
      type: String,
      trim: true,
      maxlength: [500, 'Note cannot exceed 500 characters']
    }
  },
  {
    timestamps: true
  }
);

// ป้องกันการสร้าง model ซ้ำซ้อนใน development mode
export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);

