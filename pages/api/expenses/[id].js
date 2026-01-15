// pages/api/expenses/[id].js

import { apiHandler } from "@/lib/middleware";
import Expense from '@/models/Expense';

async function handler(req, res) {
    const { id } = req.query;
    const { method } = req;

    if (method === 'GET') {
        const expense = await Expense.findById(id);

        if (!expense) {
            return res.status(404).json({
                success: false,
                error: 'not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: expense
        });
    }

    if (method === 'PUT') {
        const expense = await Expense.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!expense) {
            return res.status(404).json({
                success: false,
                error: 'ไม่พบรายการนี้'
            });
        }

        return res.status(200).json({
            success: true,
            data: expense
        });
    }

    if (method === 'DELETE') {
        const deletedExpense = await Expense.deleteOne({_id: id});

        if (!deletedExpense.deletedCount) {
            return res.status(404).json({
                success: false,
                error: 'not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: {}
        });
    }
}

export default apiHandler(['GET', 'PUT', 'DELETE'], handler);