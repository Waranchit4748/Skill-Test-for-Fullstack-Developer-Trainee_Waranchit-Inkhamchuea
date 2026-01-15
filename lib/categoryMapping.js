// lib/categoryMapping.js

// Mapping: ไทย -> อังกฤษ (สำหรับส่งไป Database)
export const CATEGORY_TH_TO_EN = {
  'อาหาร': 'Food',
  'ท่องเที่ยว': 'Travel',
  'ช้อปปิ้ง': 'Shopping',
  'ค่าเดินทาง': 'Transportation',
  'สุขภาพ': 'Health',
  'การศึกษา': 'Education',
  'อื่นๆ': 'Other'
};

// Mapping: อังกฤษ -> ไทย (สำหรับแสดงหน้าเว็บ)
export const CATEGORY_EN_TO_TH = {
  'Food': 'อาหาร',
  'Travel': 'ท่องเที่ยว',
  'Shopping': 'ช้อปปิ้ง',
  'Transportation': 'ค่าเดินทาง',
  'Health': 'สุขภาพ',
  'Education': 'การศึกษา',
  'Other': 'อื่นๆ'
};

// Array สำหรับ Dropdown (แสดงภาษาไทย)
export const CATEGORIES_TH = Object.keys(CATEGORY_TH_TO_EN);

// Array สำหรับ Database (ภาษาอังกฤษ)
export const CATEGORIES_EN = Object.values(CATEGORY_TH_TO_EN);

// Helper Functions
export const toEnglish = (thaiCategory) => CATEGORY_TH_TO_EN[thaiCategory] || thaiCategory;
export const toThai = (englishCategory) => CATEGORY_EN_TO_TH[englishCategory] || englishCategory;