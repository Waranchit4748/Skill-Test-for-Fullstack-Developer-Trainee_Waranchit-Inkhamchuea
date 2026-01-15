// components/ExpenseForm.js

import { useState } from 'react';
import { format } from 'date-fns';
import { CATEGORIES_TH, toEnglish} from '@/lib/categoryMapping';

export default function ExpenseForm({ onSuccess }) {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: 'อาหาร',
        date: format(new Date(), 'yyyy-MM-dd'),
        note: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            // แปลงหมวดหมู่จากไทยเป็นอังกฤษก่อนส่ง API
            const dataToSend = {
                ...formData,
                amount: parseFloat(formData.amount),
                category: toEnglish(formData.category) // แปลงเป็นอังกฤษ
            };

            const res = await fetch('/api/expenses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend)
            });

            const data = await res.json();

            if (!data.success) {
                throw new Error(data.error || 'เกิดข้อผิดพลาด');
            }

            // Reset form
            setFormData({
                title: '',
                amount: '',
                category: 'อาหาร',
                date: format(new Date(), 'yyyy-MM-dd'),
                note: ''
            });

            onSuccess?.();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

        return (
            <div className="card">
                <h2 className="text-xl font-semibold mb-4">เพิ่มรายการใหม่</h2>
      
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        รายการ *
                    </label>
                    <input
                        type="text"
                        required
                        className="input"
                        placeholder="เช่น ข้าวมันไก่"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            จำนวนเงิน (บาท) *
                        </label>
                        <input
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            className="input"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        หมวดหมู่ *
                        </label>
                        <select
                            className="input"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            {CATEGORIES_TH.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    วันที่ *
                    </label>
                    <input
                        type="date"
                        required
                        className="input"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        หมายเหตุ
                    </label>
                    <textarea
                        className="input"
                        rows="3"
                        placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)"
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'กำลังบันทึก...' : '+ เพิ่มรายการ'}
                </button>
            </form>
        </div>
    );
}
