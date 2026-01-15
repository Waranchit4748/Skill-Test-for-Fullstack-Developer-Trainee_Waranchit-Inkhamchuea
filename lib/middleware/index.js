// lib/middleware/index.js

import { withDB } from './dbMiddleware';
import { withErrorHandler } from './errorHandler';
import { withMethodCheck } from './methodValidator';

/**
 * 
 */
export function apiHandler(allowedMethods, handler) {
    return withDB(
        withErrorHandler(
            withMethodCheck(allowedMethods)(handler)
        )
    );
}

export { withDB } from './dbMiddleware';
export { withErrorHandler } from './errorHandler';
export { withMethodCheck } from './methodValidator';