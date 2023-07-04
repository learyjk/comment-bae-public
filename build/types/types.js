import { Timestamp } from 'firebase/firestore';
import { object, optional, string, define } from 'superstruct';
const FirestoreTimestamp = define('FirestoreTimestamp', (value) => value instanceof Timestamp);
export const CommentStruct = object({
    id: optional(string()),
    text: string(),
    username: string(),
    timestamp: optional(FirestoreTimestamp),
    hostname: string(),
    pathname: string()
});
//# sourceMappingURL=types.js.map