// lib/middleware/errorHandler.js

/**
 * 
 */

export function withErrorHandler(handler) {
    return async (req, res) => {
        try {
            return await handler(req, res);
        } catch (error) {
            console.error('API Error:', error);

            // จัดการ Error 
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    success: false,
                    error: 'Validation Error',
                    details: Object.values(error.errors).map(e => e.message)
                });
            }

            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    error: 'Duplicate entry'
                });
            }

            return res.status(500).json({
                success: false,
                error: error.message || 'Internal Server Error'
            });
        }
    };
}