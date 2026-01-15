// pages/api/expenses/index.js

import { apiHandler } from '@/lib/middleware';
import Expense from '@/models/Expense';

async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    const { startDate, endDate, category, sort = '-date' } = req.query;

    // สร้าง filter object
    let filter = {};

    // Filter ตามวันที่
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    // Filter ตามหมวดหมู่
    if (category && category !== 'ทั้งหมด') {
      filter.category = category;
    }

    // ดึงข้อมูล
    const expenses = await Expense.find(filter)
      .sort(sort)
      .lean();

    return res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses
    });
  }

  if (method === 'POST') {
    const expense = await Expense.create(req.body);

    return res.status(201).json({
      success: true,
      data: expense
    });
  }
}

// ใช้ Middleware wrapper แทน try-catch
export default apiHandler(['GET', 'POST'], handler);