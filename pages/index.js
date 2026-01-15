// pages/index.js

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseTable from '@/components/ExpenseTable';
import DashboardStats from '@/components/DashboardStats';
import FilterBar from '@/components/FilterBar';

export default function Home() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        category: 'ทั้งหมด',
        categoryTh: 'ทั้งหมด',
        sort: '-date'
    });

    // Fetch expenses
    const fetchExpenses = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.startDate) params.append('startDate', filters.startDate);
            if (filters.endDate) params.append('endDate', filters.endDate);
            if (filters.category !== 'ทั้งหมด') params.append('category', filters.category);
            if (filters.sort) params.append('sort', filters.sort);

            const res = await fetch(`/api/expenses?${params}`);
            const data = await res.json();
            
            if (data.success) {
                setExpenses(data.data);
            }
        } catch (error) {
            console.error('Error fetching expenses:', error);
        } finally {
            setLoading(false);
        }
    };

    // Delete expense
    const handleDelete = async (id) => {
        if (!confirm('ยืนยันการลบรายการนี้?')) return;

        try {
            const res = await fetch(`/api/expenses/${id}`, {
                method: 'DELETE'
            });
            
            const data = await res.json();

            if (data.success) {
                setExpenses(prevExpenses => prevExpenses.filter(expense => expense._id !== id));
            }
        } catch (error) {
            console.error('Error deleting expense:', error);
            alert('ไม่สามารถลบรายการได้');
        }
    };

    // Handle filter change
    const handleFilterChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters });
    };
    
    // Fetch on mount and filter change
    useEffect(() => {
        fetchExpenses();
    }, [filters.startDate, filters.endDate, filters.category, filters.sort]);

    return (
        <Layout>
            <div className="space-y-6">
                {/* Stats Dashboard */}
                <DashboardStats expenses={expenses} />

                {/* Add Form */}
                <ExpenseForm onSuccess={fetchExpenses} />

                {/* Filters */}
                <FilterBar filters={filters} onFilterChange={handleFilterChange} />

                {/* Table */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">รายการค่าใช้จ่าย</h2>
                    <ExpenseTable
                        expenses={expenses}
                        onDelete={handleDelete}
                        loading={loading}
                    />
                </div>
            </div>
        </Layout>
    );
}