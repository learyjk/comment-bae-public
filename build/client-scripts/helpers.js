import { DEV_MODE_VARIABLE_NAME, LOCAL_API_URL, PROD_API_URL } from './constants.js';
export function isDevMode() {
    // Get the value from local storage
    const devMode = localStorage.getItem(DEV_MODE_VARIABLE_NAME);
    // Check if the value is 'true' (local storage stores everything as a string)
    // We return a boolean value
    return devMode === 'true';
}
export function getApiUrl() {
    // If we're in dev mode, return the local API url
    if (isDevMode()) {
        return LOCAL_API_URL;
    }
    // Otherwise, return the production API url
    return PROD_API_URL;
}
export function formatDistanceToNow(timestampSeconds) {
    const now = Date.now();
    const date = new Date(timestampSeconds * 1000);
    const seconds = Math.floor((now - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
}
//# sourceMappingURL=helpers.js.map