// components/Layout.js
import { WalletIcon } from '@heroicons/react/24/solid'; // ใช้แบบ Solid ให้ดูหนักแน่นเป็น Logo

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Zone */}
            <div className="flex items-center space-x-3">
              {/* สร้างกรอบสีพื้นหลังให้ไอคอน ดูเป็น Logo App */}
              <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
                <WalletIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800 tracking-tight">
                Expense Tracker
              </h1>
            </div>

            {/* Profile / Credit Zone */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <p className="text-xs text-gray-400">Developed by</p>
                <p className="text-sm font-medium text-gray-700">Waranchit Inkhamchuea</p>
              </div>
              {/* Avatar จำลอง (ใส่ไว้ให้ดูสวยๆ) */}
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold border border-gray-300">
                W
              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}