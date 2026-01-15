// components/ExpenseTable.js

import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { toThai } from '@/lib/categoryMapping';
import { TrashIcon, ListBulletIcon } from '@heroicons/react/24/outline'; // 1. นำเข้าไอคอน

const CATEGORY_COLORS = {
  'Food': 'bg-green-100 text-green-800',
  'Travel': 'bg-blue-100 text-blue-800',
  'Shopping': 'bg-pink-100 text-pink-800',
  'Transportation': 'bg-yellow-100 text-yellow-800',
  'Health': 'bg-red-100 text-red-800',
  'Education': 'bg-purple-100 text-purple-800',
  'Other': 'bg-gray-100 text-gray-800'
};

export default function ExpenseTable({ expenses, onDelete, loading }) {
  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

    if (expenses.length === 0) {
    return (
      <div className="card text-center py-16 flex flex-col items-center"> {/* เพิ่ม py-16 และจัดกลาง */}
        {/* 2. ใช้ไอคอน ListBullet สีเทาอ่อนๆ */}
        <div className="mb-4 p-6 bg-gray-50 rounded-full">
             <ListBulletIcon className="h-16 w-16 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">ยังไม่มีรายการค่าใช้จ่าย</h3>
        <p className="text-gray-500 text-sm">เริ่มบันทึกรายจ่ายแรกของคุณได้เลย!</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">รายการ</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">หมวดหมู่</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">จำนวนเงิน</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expenses.map((expense) => (
              <tr key={expense._id} className="hover:bg-gray-50 transition-colors group"> {/* เพิ่ม group เพื่อทำ hover effect ที่ปุ่มลบ */}
                <td className="px-4 py-4 text-sm text-gray-600">
                  {format(new Date(expense.date), 'd MMM yyyy', { locale: th })}
                </td>
                <td className="px-4 py-4">
                  <div className="font-medium text-gray-900">{expense.title}</div>
                  {expense.note && (
                    <div className="text-sm text-gray-500 mt-1">{expense.note}</div>
                  )}
                </td>
                <td className="px-4 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${CATEGORY_COLORS[expense.category]}`}>
                    {toThai(expense.category)}
                  </span>
                </td>
                <td className="px-4 py-4 text-right font-semibold text-gray-900">
                  {expense.amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })} ฿
                </td>
                <td className="px-4 py-4 text-center">
                  {/* 3. เปลี่ยนปุ่มลบเป็นไอคอนถังขยะ */}
                  <button
                    onClick={() => onDelete(expense._id)}
                    className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all opacity-50 group-hover:opacity-100"
                    title="ลบรายการ"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>    
  );
}