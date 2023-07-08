import { Timestamp } from 'firebase/firestore';
import { object, string, define, number } from 'superstruct';
const FirestoreTimestamp = define('FirestoreTimestamp', (value) => value instanceof Timestamp);
export const CheckoutItemStruct = object({
    unit_amount: number(),
    customer: string(),
    siteId: string(),
    hostname: string(),
    siteName: string()
});
export const CommentStruct = object({
    id: string(),
    text: string(),
    username: string(),
    timestamp: FirestoreTimestamp,
    hostname: string(),
    pathname: string()
});
//# sourceMappingURL=types.js.map