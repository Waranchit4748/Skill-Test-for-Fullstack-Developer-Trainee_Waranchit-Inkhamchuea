// lib/middleware/dbMiddleware.js

import dbConnect from "../dbConnect"

/**
 * 
 */

export function withDB(handler) {
    return async (req, res) => {
        try {
            await dbConnect();
            return handler(req, res);
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Database connection failed',
                message: error.message
            });
        }
    };
}