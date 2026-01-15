// lib/dbConnect.js

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error ('Please setting MONGODB_URI .env.local');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null};
}

async function dbConnect() {

    // ถ้า connection อยู่แล้วให้ใช้ต่อ
    if (cached.conn) {
        return cached.conn
    }

    // ถ้ายังไม่มี promise ให้สร้างใหม่
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn
}

export default dbConnect;