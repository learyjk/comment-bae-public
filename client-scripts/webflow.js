var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { formatDistanceToNow, getApiUrl } from './helpers.js';
import { FORM_PREFIX, FORM_SELECTORS, TEMPLATE_PREFIX, TEMPLATE_SELECTORS } from './selectors.js';
document.addEventListener('DOMContentLoaded', function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`fetching comments from ${getApiUrl()}`);
        const hostname = window.location.hostname;
        const pathname = window.location.pathname;
        const response = yield fetch(`${getApiUrl()}/api/comments/list?hostname=${hostname}&pathname=${pathname}`);
        const commentData = yield response.json();
        if (!Array.isArray(commentData)) {
            throw new Error('Data is not an array');
        }
        const comments = commentData;
        console.log('c:');
        console.log({ comments });
        const item = document.querySelector(`[${TEMPLATE_PREFIX}=${TEMPLATE_SELECTORS.ITEM}]`);
        const list = document.querySelector(`[${TEMPLATE_PREFIX}=${TEMPLATE_SELECTORS.LIST}]`);
        if (!item || !list) {
            !item && console.error('No comment item element found');
            !list && console.error('No comment list element found');
            throw new Error('Error getting item and/or list.');
        }
        item.remove();
        comments.forEach((comment) => {
            const clone = item === null || item === void 0 ? void 0 : item.cloneNode(true);
            const commentText = clone.querySelector(`[${TEMPLATE_PREFIX}=${TEMPLATE_SELECTORS.TEXT}]`);
            const commentUsername = clone.querySelector(`[${TEMPLATE_PREFIX}=${TEMPLATE_SELECTORS.USERNAME}]`);
            const commentTimestamp = clone.querySelector(`[${TEMPLATE_PREFIX}=${TEMPLATE_SELECTORS.TIMESTAMP}]`);
            if (!commentText || !commentUsername || !commentTimestamp) {
                console.error('Could not find comment elements. Double check your attributes.');
                throw new Error('Could not find comment elements. Double check your attributes.');
            }
            const formattedTime = formatDistanceToNow(comment.timestamp.seconds);
            commentText.textContent = comment.text;
            commentUsername.textContent = comment.username;
            commentTimestamp.textContent = formattedTime;
            list.appendChild(clone);
        });
        // FORM
        const form = document.querySelector(`[${FORM_PREFIX}=${FORM_SELECTORS.FORM}]`);
        if (!form) {
            console.error('No comment form element found');
            throw new Error('Error getting form.');
        }
        const formUsername = form.querySelector(`[${FORM_PREFIX}=${FORM_SELECTORS.USERNAME}]`);
        const formText = form.querySelector(`[${FORM_PREFIX}=${FORM_SELECTORS.TEXT}]`);
        if (!formUsername || !formText) {
            console.error('Could not find form elements. Double check your attributes.');
            throw new Error('Could not find form elements. Double check your attributes.');
        }
        const formSubmit = (event) => __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const username = formUsername.value;
            const text = formText.value;
            const hostname = window.location.hostname;
            const pathname = window.location.pathname;
            const commentData = {
                username,
                text,
                hostname,
                pathname
            };
            try {
                const response = yield fetch(`${getApiUrl()}/api/comments/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(commentData)
                });
                const result = yield response.json();
                if (result.success) {
                    console.log('Comment added successfully with id: ', result.id);
                }
                else {
                    console.error('Error in adding comment: ', result.message);
                }
            }
            catch (err) {
                console.error('Error in submitting form: ', err);
            }
        });
        form.addEventListener('submit', formSubmit);
    });
});
//# sourceMappingURL=webflow.js.map