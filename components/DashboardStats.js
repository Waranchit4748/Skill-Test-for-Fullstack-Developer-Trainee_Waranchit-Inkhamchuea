// components/DashboardStats.js

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { BanknotesIcon, DocumentTextIcon, TrophyIcon, ChartPieIcon } from '@heroicons/react/24/solid';
import { toThai } from '@/lib/categoryMapping';

const COLORS = {
  'Food': '#10b981',
  'Travel': '#3b82f6',
  'Shopping': '#ec4899',
  'Transportation': '#f59e0b',
  'Health': '#ef4444',
  'Education': '#8b5cf6',
  'Other': '#6b7280'
};

export default function DashboardStats({ expenses }) {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  const byCategory = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});
  
  const chartData = Object.entries(byCategory).map(([nameEn, value]) => ({
    name: toThai(nameEn),
    nameEn: nameEn,
    value,
    percentage: ((value / total) * 100).toFixed(1)
  })).sort((a, b) => b.value - a.value);
  
  const topCategory = chartData[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Card: ยอดรวม */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-green-600 font-medium mb-1">ยอดรวมทั้งหมด</p>
            <p className="text-3xl font-bold text-green-900">
              {total.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-green-600 mt-1">บาท</p>
          </div>
          <BanknotesIcon className="h-16 w-16 text-green-500" />
        </div>
      </div>

      {/* Card: จำนวนรายการ */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-600 font-medium mb-1">จำนวนรายการ</p>
            <p className="text-3xl font-bold text-blue-900">{expenses.length}</p>
            <p className="text-sm text-blue-600 mt-1">รายการ</p>
          </div>
          <DocumentTextIcon className="h-16 w-16 text-blue-500" />
        </div>
      </div>

      {/* Card: หมวดหมู่ที่ใช้มากสุด */}
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-yellow-600 font-medium mb-1">ใช้มากสุด</p>
            <p className="text-2xl font-bold text-yellow-900">
              {topCategory?.name || '-'}
            </p>
            <p className="text-sm text-yellow-600 mt-1">
              {topCategory ? `${topCategory.value.toLocaleString()} บาท (${topCategory.percentage}%)` : '-'}
            </p>
          </div>
          <TrophyIcon className="h-16 w-16 text-yellow-500" />
        </div>
      </div>

      {/* Chart: สัดส่วนตามหมวดหมู่ */}
      {chartData.length > 0 && (
        <div className="card lg:col-span-3">
          <div className="flex items-center space-x-2 mb-4">
            <ChartPieIcon className="h-6 w-6 text-gray-700" />
            <h3 className="text-lg font-semibold">สัดส่วนค่าใช้จ่ายตามหมวดหมู่</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} (${percentage}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry) => (
                  <Cell key={entry.nameEn} fill={COLORS[entry.nameEn]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toLocaleString()} บาท`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}