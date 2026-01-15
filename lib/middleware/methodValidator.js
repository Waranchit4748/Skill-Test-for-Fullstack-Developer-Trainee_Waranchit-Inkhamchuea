// lib/middleware/methodValidator.js

/**
 * 
 */
export function withMethodCheck(allowedMethods) {
    return (handler) => {
        return async (req, res) => {
            if (!allowedMethods.includes(req.method)) {
                return res.status(405).json ({
                    success: false,
                    error: `Method ${req.method} not allowed`,
                    allowedMethods
                });
            }
            return handler(req, res);
        };
    };
}