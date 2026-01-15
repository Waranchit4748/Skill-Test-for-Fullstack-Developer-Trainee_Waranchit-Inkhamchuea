// components/FilterBar.js

import { format, subDays } from 'date-fns';
import { CATEGORIES_TH, toEnglish } from '@/lib/categoryMapping';
import { FunnelIcon } from '@heroicons/react/24/outline'; // 1. นำเข้าไอคอน

export default function FilterBar({ filters, onFilterChange }) {
  const quickFilters = [
    { label: 'วันนี้', days: 0 },
    { label: '7 วัน', days: 7 },
    { label: '30 วัน', days: 30 },
    { label: 'ทั้งหมด', days: null }
  ];

  const handleQuickFilter = (days) => {
    if (days === null) {
        onFilterChange({ startDate: '', endDate: '' });
    } else {
        const endDate = format(new Date(), 'yyyy-MM-dd');
        const startDate = format(subDays(new Date(), days), 'yyyy-MM-dd');
        onFilterChange({ startDate, endDate });        
    }
  };

  return (
    <div className="card mb-6">
      {/* 2. เปลี่ยน Emoji เป็น Icon และจัด Flex ให้ตรงกัน */}
      <div className="flex items-center mb-4">
        <FunnelIcon className="h-6 w-6 text-gray-600 mr-2" />
        <h3 className="text-lg font-semibold">กรองข้อมูล</h3>
      </div>
      
      <div className="space-y-4">
        {/* Quick Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ช่วงเวลา</label>
          <div className="flex flex-wrap gap-2">
            {quickFilters.map((item) => (
              <button
                key={item.label}
                onClick={() => handleQuickFilter(item.days)}
                className="btn-secondary text-sm"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">วันที่เริ่มต้น</label>
            <input
              type="date"
              className="input"
              value={filters.startDate}
              onChange={(e) => onFilterChange({ startDate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">วันที่สิ้นสุด</label>
            <input
              type="date"
              className="input"
              value={filters.endDate}
              onChange={(e) => onFilterChange({ endDate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">หมวดหมู่</label>
            <select
              className="input"
              value={filters.categoryTh}
              onChange={(e) => onFilterChange({ 
                categoryTh: e.target.value,
                category: e.target.value === 'ทั้งหมด' ? 'ทั้งหมด' : toEnglish(e.target.value)
              })}
            >
              <option value="ทั้งหมด">ทั้งหมด</option>
              {CATEGORIES_TH.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">เรียงตาม</label>
          <select
            className="input max-w-xs"
            value={filters.sort}
            onChange={(e) => onFilterChange({ sort: e.target.value })}
          >
            <option value="-date">วันที่ล่าสุด</option>
            <option value="date">วันที่เก่าสุด</option>
            <option value="-amount">จำนวนเงินมาก → น้อย</option>
            <option value="amount">จำนวนเงินน้อย → มาก</option>
          </select>
        </div>
      </div>
    </div>    
  );
}