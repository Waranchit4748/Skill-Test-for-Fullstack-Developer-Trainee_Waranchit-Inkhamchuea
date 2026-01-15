// pages/api/expenses
import { apiHandler } from '@/lib/middleware';
import Expense from '@/models/Expense';

async function handler(req, res) {
  const { startDate, endDate } = req.query;

  // เรียก Expense.find() แทน Aggregation
  let filter = {};
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  const expenses = await Expense.find(filter).lean();

  // ส่งข้อมูลดิบให้ Frontend คำนวณเอง
  return res.status(200).json({
    success: true,
    count: expenses.length,
    data: expenses
  });
}

export default apiHandler(['GET'], handler);